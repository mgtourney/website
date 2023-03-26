import sqlite3 from "sqlite3";
import { open } from "sqlite";

const diffName = ["Easy", "Normal", "Hard", "Expert", "ExpertPlus"];

export async function getQualifiers(id: string) {
  const db = await open({
    filename: "./public/assets/qualifiers/BotDatabase.db",
    driver: sqlite3.Database,
  });
  const data = await db.all("SELECT * FROM Songs WHERE EventID = ?", [id]);

  db.close();

  const songs = data.map((song) => {
    let levelDiff = song.BeatmapDifficulty;
    switch (levelDiff) {
      case 0:
        levelDiff = "Easy";
        break;
      case 1:
        levelDiff = "Normal";
        break;
      case 2:
        levelDiff = "Hard";
        break;
      case 3:
        levelDiff = "Expert";
        break;
      case 4:
        levelDiff = "ExpertPlus";
        break;
      default:
        levelDiff = "";
    }
    const levelId = song.LevelId.slice("custom_level_".length);
    return {
      eventId: song.EventId,
      songId: song.ID,
      songName: song.Name,
      songHash: levelId,
      songDiff: diffName[song.BeatmapDifficulty],
      songDiffClean: song.BeatmapDifficulty,
    };
  });

  return songs;
}

export async function getQualifiersEvents() {
  const db = await open({
    filename: "./public/assets/qualifiers/BotDatabase.db",
    driver: sqlite3.Database,
  });
  const data = await db.all("SELECT * FROM Events");

  db.close();

  const events = data.map((event) => {
    return {
      eventId: event.EventId,
      eventHost: event.GuildName,
      eventName: event.Name,
      qualifierEnded: event.Old,
    };
  });

  return events;
}

export async function getUser(id: string) {
  const db = await open({
    filename: "./public/assets/qualifiers/BotDatabase.db",
    driver: sqlite3.Database,
  });
  const data = await db.all(
    "SELECT * FROM Scores WHERE `UserId` = ? AND Old = 0",
    [id]
  );

  db.close();

  return data;
}

export async function getHighestScoreForMap(
  eventId: string,
  mapHash: string,
  mapDiff: number
) {
  const db = await open({
    filename: "./public/assets/qualifiers/BotDatabase.db",
    driver: sqlite3.Database,
  });

  const data = await db.get(
    `SELECT
	Songs.Name,
	Scores.Username,
	Scores.LevelId AS LevelId,
	Scores.Score,
	Scores.FullCombo,
	Scores.UserId AS UserID,
	Songs.EventId AS EventId,
	Songs.BeatmapDifficulty AS BeatmapDifficulty 
FROM
	Scores
	INNER JOIN Songs ON Scores.LevelId = Songs.LevelId
WHERE
    Songs.EventId = ? AND
    Songs.LevelId = ? AND
    Songs.BeatmapDifficulty = ?
ORDER BY
    Scores.Score DESC LIMIT 1
`,
    [eventId, "custom_level_" + mapHash, mapDiff]
  );

  db.close();

  const response = await fetch(
    "https://api.beatsaver.com/maps/hash/" + mapHash
  );
  const json = await response.json();

  const diffs = json.versions[0].diffs;
  const diff = diffs.find((diff: any) => diff.difficulty === diffName[mapDiff]);
  const notes = diff.notes;

  const accCalculation = (notes - 13) * 920 + 4715;
  const unweighted = (data.Score / accCalculation) * 100;

  const score = {
    eventId: data.EventId,
    songName: data.Name,
    songId: data.LevelId,
    songDiff: data.BeatmapDifficulty,
    songDiffName: diff.difficulty,
    songScore: data.Score,
    songMaxNotes: notes,
    songAcc: unweighted,
    songFC: data.FullCombo,
    songUser: data.Username,
    songUserId: data.UserID,
  };

  return score;
}

export async function getScores(
  eventId: string,
  mapHash: string,
  mapDiff: number,
  maxnotes: number,
  equalizer: number,
  highestScore: number
) {
  const db = await open({
    filename: "./public/assets/qualifiers/BotDatabase.db",
    driver: sqlite3.Database,
  });

  const data = await db.all(
    `
      SELECT *
      FROM Scores
      WHERE
        Scores.EventId = ? AND
        Scores.LevelId = ? AND
        Scores.Old = 0 AND
        Scores.BeatmapDifficulty = ?
      ORDER BY Scores.Score DESC`,
    [eventId, mapHash, mapDiff]
  );

  db.close();

  const accCalculation = (maxnotes - 13) * 920 + 4715;

  const scores = data.map((score) => {
    const weightedScore = score.Score * equalizer;
    const acc = (score.Score / accCalculation) * 100;
    const WeightedAcc = (score.Score / highestScore) * 100;
    return {
      eventId: score.EventId,
      LevelId: score.LevelId,
      BeatmapDifficulty: score.BeatmapDifficulty,
      Score: score.Score,
      WeightedScore: weightedScore,
      UnweightedAcc: acc,
      WeightedAcc: WeightedAcc,
      FullCombo: score.FullCombo,
      Username: score.Username,
      UserId: score.UserId,
    };
  });

  return scores;
}

export async function iHateDuplicateUsernames() {
  const db = await open({
    filename: "./public/assets/qualifiers/BotDatabase.db",
    driver: sqlite3.Database,
  });

  try {
    await db.run(`
        UPDATE Scores
        SET Username = temp.MostSeenUsername
        FROM (
          SELECT UserId, MAX(cnt) as MaxCount, MAX(Username) as MostSeenUsername
          FROM (
            SELECT UserId, Username, COUNT(*) as cnt
            FROM Scores
            GROUP BY UserId, Username
          ) as T
          GROUP BY UserId
        ) as temp
        WHERE Scores.UserId = temp.UserId AND Scores.Username <> temp.MostSeenUsername;
              
        `);
    return true;
  } catch (error) {
    return false;
  } finally {
    db.close();
  }
}

export async function getSongs(eventId: string) {
  const db = await open({
    filename: "./public/assets/qualifiers/BotDatabase.db",
    driver: sqlite3.Database,
  });

  const data = await db.all("SELECT * FROM Songs WHERE `EventId` = ?", [
    eventId,
  ]);

  db.close();

  return data;
}

export async function convertIDs() {
  const db = await open({
    filename: "./public/assets/qualifiers/BotDatabase.db",
    driver: sqlite3.Database,
  });

  try {
    await db.run("ALTER TABLE Scores ADD COLUMN UserIdStr TEXT");
    await db.run("UPDATE Scores SET UserIdStr = CAST(UserId AS TEXT)");
    await db.run("ALTER TABLE Scores DROP COLUMN UserId");
    await db.run("ALTER TABLE Scores RENAME COLUMN UserIdStr TO UserId");
    return true;
  } catch (error) {
    return false;
  } finally {
    db.close();
  }
}
