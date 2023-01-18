import Information from "./server";
import { decrypt, encrypt } from "@sescomp";
import { User } from "@lib/types/users";

export async function saveUser(user_id: string, refresh_token: string) {
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
