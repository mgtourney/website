import Information from "./server";

export async function getDBTeam(dbid: number) {
  const result = await Information.query("SELECT * FROM teams WHERE id = $1", [
    dbid,
  ]);
  if (!result.rows.length) {
    return false;
  }

  const team = result.rows.map((team) => {
    return {
      dbid: team.id,
      tournamentid: team.tournamentid,
      teamid: team.teamid,
      name: team.teamname,
      image: team.teamimage,
      players: [team.p1, team.p2],
    };
  });

  return team;
}

export async function saveTeam(tid: number, req: any) {
  const data = {
    tourneyid: tid,
    teamname: req.teamname,
    teamimage: req.teamimage,
    p1: req.p1,
    p2: req.p2,
  };
  const result = await Information.query(
    "SELECT id FROM tournaments WHERE id = $1",
    [data.tourneyid]
  );
  if (!result.rows.length) {
    return "Tournament not found.";
  }
  const teamid = await Information.query(
    "SELECT MAX(teamid) FROM teams WHERE tournamentid = $1",
    [data.tourneyid]
  );
  const teamids = teamid.rows[0].max + 1;

  try {
    const result = await Information.query(
      "INSERT INTO teams (teamid, tournamentid, teamname, teamimage, p1, p2) VALUES ($1, $2, $3, $4, $5, $6)",
      [teamids, data.tourneyid, data.teamname, data.teamimage, data.p1, data.p2]
    );
    if (result.rowCount > 0) {
      const returnData = {
        result: "Team registered successfully.",
        teamid: teamids,
        tournamentid: data.tourneyid,
      };
      return returnData;
    } else {
      return "Team registration failed.";
    }
  } catch (error) {
    return "An error occured.";
  }
}

export async function updateTeam(tid: number, teamid: number, req: any) {
  const data = req;

  const TeamDBId = await getTournamentTeam(tid, teamid);
  try {
    if (TeamDBId) {
      try {
        await Information.query(
          "UPDATE teams SET teamname = $1, teamimage = $2, p1 = $3, p2 = $4 WHERE id = $5",
          [data.teamname, data.teamimage, data.p1, data.p2, TeamDBId.dbid]
        );
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

export async function deleteTeam(tid: number, teamid: number) {
  const TeamDBId = await getTournamentTeam(tid, teamid);
  try {
    if (TeamDBId) {
      const team = await Information.query("DELETE FROM teams WHERE id = $1", [
        TeamDBId.dbid,
      ]);
      return !!team.rowCount;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

export async function getTournamentTeam(tourneyid: number, teamid: number) {
  const result = await Information.query(
    "SELECT * FROM teams WHERE teamid = $1 AND tournamentid = $2",
    [teamid, tourneyid]
  );
  if (!result.rows.length) {
    return false;
  }

  const team = {
    dbid: result.rows[0].id,
    tournamentid: result.rows[0].tournamentid,
    teamid: result.rows[0].teamid,
    name: result.rows[0].teamname,
    image: result.rows[0].teamimage,
    players: [result.rows[0].p1, result.rows[0].p2],
  };
  return team;
}

export async function getTournamentTeams(tourneyid: number) {
  const result = await Information.query(
    "SELECT * FROM gettteams WHERE tournamentid = $1",
    [tourneyid]
  );
  if (!result.rows.length) {
    return false;
  }

  const teams = result.rows.map((team) => {
    return {
      dbid: team.id,
      tournamentid: team.tournamentid,
      teamid: team.teamid,
      name: team.teamname,
      image: team.teamimage,
      players: [team.p1, team.p2],
    };
  });

  return teams;
}

export async function getTournament(tourneyid: number) {
  const result = await Information.query(
    "SELECT * FROM tournaments WHERE id = $1",
    [tourneyid]
  );

  if (!result.rows.length) {
    return false;
  }
  const tourney = {
    id: result.rows[0].id,
    name: result.rows[0].tournamentname,
    state: result.rows[0].state,
    image: result.rows[0].image,
    startdate: result.rows[0].startdate,
    enddate: result.rows[0].enddate,
  };

  return tourney;
}

export async function getAllTourneys() {
  const result = await Information.query(
    "SELECT * FROM tournaments WHERE public = true ORDER BY id DESC"
  );
  if (!result.rows.length) {
    return false;
  }

  const tourneys = result.rows.map((tourney) => {
    return {
      id: tourney.id,
      name: tourney.tournamentname,
      state: tourney.state,
      image: tourney.image,
      startdate: tourney.startdate,
      enddate: tourney.enddate,
    };
  });

  return tourneys;
}

export async function TourneyList(val: any) {
  const result = await Information.query(
    `SELECT id,name FROM tournamentsearch WHERE name ILIKE '%${val}%'`
  );

  if (!result.rows.length) {
    return false;
  }
  return result.rows;
}

export async function TeamList(id: number, val: any) {
  const result = await Information.query(
    `SELECT * FROM teamsearch WHERE tournamentid = ${id} AND name ILIKE '%${val}%'`
  );

  if (!result.rows.length) {
    return false;
  }
  return result.rows;
}
