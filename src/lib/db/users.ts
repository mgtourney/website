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
