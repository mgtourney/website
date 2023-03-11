import Information from "./server";
import { User } from "@lib/types/users";

export async function saveUser(user_id: string, name: string, image: string) {
  const result = await Information.query<User>(
    "SELECT * FROM users WHERE id = $1",
    [user_id]
  );

  if (result.rows.length) {
    await Information.query("UPDATE users SET name = $1 WHERE id = $2", [
      name,
      user_id,
    ]);
  } else {
    await Information.query(
      "INSERT INTO users (id, name, image) VALUES ($1, $2, $3)",
      [user_id, name, image]
    );
  }
}

export async function updateUser(req: any) {
  if (req.banned == true) {
    req.banned = 1;
  } else {
    req.banned = 0;
  }
  const data = {
    id: req.userId,
    scoresaberdata: req.scoresaberdata,
    permission: req.permissions,
    pronouns: req.pronouns,
    roles: req.roles,
    twitter: req.twitter,
    twitch: req.twitch,
    banned: req.banned,
  };
  const result = await Information.query<User>(
    "SELECT * FROM users WHERE id = $1",
    [req.userId]
  );
  if (result.rows.length) {
    const user = await Information.query<User>(
      "UPDATE users SET scoresaberdata = $1, permissions = $2, pronouns = $3, roles = $4, twitter = $5, twitch = $6, banned = $7 WHERE id = $8",
      [
        data.scoresaberdata,
        data.permission,
        data.pronouns,
        data.roles,
        data.twitter,
        data.twitch,
        data.banned,
        data.id,
      ]
    );
    return !!user.rowCount;
  } else {
    return false;
  }
}

export async function updateSettings(req: any) {
  if (req.banned == true) {
    req.banned = 1;
  } else {
    req.banned = 0;
  }
  const data = {
    id: req.userId,
    scoresaberdata: req.scoresaberdata,
    pronouns: req.pronouns,
    twitter: req.twitter,
    twitch: req.twitch,
  };
  const result = await Information.query<User>(
    "SELECT * FROM users WHERE id = $1",
    [req.userId]
  );
  if (result.rows.length) {
    const user = await Information.query<User>(
      "UPDATE users SET scoresaberdata = $1, pronouns = $2, twitter = $3, twitch = $4 WHERE id = $5",
      [data.scoresaberdata, data.pronouns, data.twitter, data.twitch, data.id]
    );
    return !!user.rowCount;
  } else {
    return false;
  }
}

export async function getUser(user_id: any) {
  const result = await Information.query<User>(
    "SELECT * FROM users WHERE id = $1",
    [user_id]
  );
  if (!result.rows.length) {
    return false;
  }
  const user: User = {
    id: result.rows[0].id,
    name: result.rows[0].name,
    permissions: result.rows[0].permissions,
    image: result.rows[0].image,
    roles: result.rows[0].roles,
    scoresaberdata: result.rows[0].scoresaberdata,
    twitter: result.rows[0].twitter,
    twitch: result.rows[0].twitch,
    discord: result.rows[0].discord,
    previous_tourneys: result.rows[0].previous_tourneys,
    pronouns: result.rows[0].pronouns,
    banned: result.rows[0].banned,
  };
  return user;
}

export async function getAllSSIds() {
  const result = await Information.query(
    "SELECT scoresaberdata FROM users WHERE scoresaberdata IS NOT NULL"
  );
  if (!result.rows.length) {
    return false;
  }
  const ssids = result.rows.map((row) => JSON.parse(row.scoresaberdata)[0]);
  return ssids;
}

export async function userList(type: any, val: any) {
  if (type == "name") {
    type = "lower(name)";
  } else {
    type = "id";
  }
  const result = await Information.query(
    `SELECT * FROM usersearch WHERE ${type} LIKE '%${val}%'`
  );

  if (!result.rows.length) {
    return false;
  }
  return result.rows;
}
