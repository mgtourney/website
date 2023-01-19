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
