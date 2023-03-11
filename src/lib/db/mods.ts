import Information from "./server";

export async function getMods() {
  const result = await Information.query(
    `SELECT * FROM banned_mods ORDER BY id ASC`
  );
  if (!result.rows.length) {
    return false;
  }
  return result.rows;
}
