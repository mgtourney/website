import Information from "./server";
import { decrypt, encrypt } from "@sescomp";
import { User } from "@lib/types/users";

export async function createSession(user_id: string, refresh_token: string) {
  const result = await Information.query(
    `SELECT * FROM sessions WHERE "user_id" = $1`,
    [user_id]
  );

  if (result.rows.length) {
    const token = decrypt(result.rows[0].refresh_token);
    const differenceInDays =
      (new Date().getTime() - new Date(result.rows[0].created_at).getTime()) /
      (1000 * 3600 * 24);
    if (differenceInDays > 30 || token !== refresh_token) {
      await Information.query(`DELETE FROM sessions WHERE "user_id" = $1`, [
        user_id,
      ]);
    }
  } else {
    await Information.query(
      `INSERT INTO sessions ("user_id", "refresh_token") VALUES ($1, $2)`,
      [user_id, encrypt(refresh_token)]
    );
  }
}

export async function deleteSession(cookie: string) {
  const data: any = JSON.parse(decrypt(cookie));
  const result = await Information.query(
    `DELETE FROM sessions WHERE "user_id" = $1`,
    [data.id]
  );
  return result.rowCount;
}

export async function getSession(cookie: any) {
  const data: any = JSON.parse(decrypt(cookie));
  const result = await Information.query(
    `SELECT * FROM sessions WHERE "user_id" = $1`,
    [data.id]
  );
  if (!result.rows.length) {
    return false;
  }
  const token = decrypt(result.rows[0].refresh_token);
  const dbTime = new Date(result.rows[0].created_at).getTime();
  const cookieTime = new Date(data.created_at).getTime();
  const differenceInDays = (cookieTime - dbTime) / (1000 * 3600 * 24);
  if (differenceInDays > 30 || token !== data.refresh_token) {
    return false;
  }

  if (token === data.refresh_token) {
    const user = await Information.query(
      `SELECT * FROM users WHERE "id" = $1`,
      [data.id]
    );
    if (!user.rows.length) {
      return false;
    }
    const session: User = {
      id: user.rows[0].id,
      name: user.rows[0].name,
      image: `/assets/images/users/${user.rows[0].image}`,
      permissions: user.rows[0].permissions,
      roles: JSON.parse(user.rows[0].roles),
      scoresaberdata: JSON.parse(user.rows[0].scoresaberdata),
      twitter: user.rows[0].twitter,
      twitch: user.rows[0].twitch,
      discord: user.rows[0].id,
      previous_tourneys: JSON.parse(user.rows[0].previous_tourneys),
      rating: user.rows[0].rating,
      pronouns: user.rows[0].pronouns,
      banned: user.rows[0].banned,
    };
    return session;
  }
}
