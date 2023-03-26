import type { NextApiRequest, NextApiResponse } from "next";
import rateLimit from "@lib/api/ratelimit";
import {
  iHateDuplicateUsernames,
  getQualifiers,
  getHighestScoreForMap,
  getScores,
} from "@lib/db/qualifiers";

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

export default async function getSongsIndex(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await limiter.check(res, 5, "CACHE_TOKEN");

    // const run = await iHateDuplicateUsernames();
    const eventId = req.query.event as string;
    const songs = await getQualifiers(eventId);

    const scores = await Promise.all(
      songs.map(
        async (song) =>
          await getHighestScoreForMap(
            eventId,
            song.songHash,
            song.songDiffClean
          )
      )
    );

    const totalSongs = scores.length;
    const totalScore = scores.reduce((acc, score) => acc + score.songScore, 0);
    const maxScores = scores.map((score) => score.songScore);

    const equalizedScores = maxScores.map(
      (maxScore) => ((1 / totalSongs) * totalScore) / maxScore
    );
    const uniqueSongs = maxScores.map((maxScore, i) => ({
      highestScore: scores[i].songScore,
      equalized: equalizedScores[i],
      maxPossibleEqualized: scores[i].songScore * equalizedScores[i],
    }));

    const songScores = await Promise.all(
      scores
        .slice(0, totalSongs)
        .map(
          async (score, i) =>
            await getScores(
              score.eventId,
              score.songId,
              score.songDiff,
              score.songMaxNotes,
              equalizedScores[i],
              uniqueSongs[i].highestScore
            )
        )
    );

    const QualScores = songScores.map((score, i) => {
      const songInfo = {
        songName: scores[i].songName,
        songHash: scores[i].songId,
        songDiff: songs[i].songDiff,
      };
      return { songInfo, scores: score };
    });

    res.status(200).json({ QualScores });
  } catch (err) {
    return res.status(500).json({ error: { message: err } });
  }
}
