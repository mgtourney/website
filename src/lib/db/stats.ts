import Information from "./server";

export async function getAllStats() {
  const result = await Information.query("SELECT * FROM websitestats");
  if (!result.rows.length) {
    return false;
  }
  return result.rows;
}
