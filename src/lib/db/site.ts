import Information from "./server";

export async function updateAlert(req: any) {
  const data = {
    id: req.id,
    headline: req.headline,
    message: req.message,
    link: encodeURI(req.link),
    linktext: req.linktext,
    visible: req.visible,
  };
  const alert = await Information.query(
    "UPDATE sitealert SET headline = $2, message = $3, link = $4, linktext = $5, visible = $6 WHERE id = $1",
    [
      data.id,
      data.headline,
      data.message,
      data.link,
      data.linktext,
      data.visible,
    ]
  );
  return !!alert.rowCount;
}

export async function getAlert() {
  const result = await Information.query("SELECT * FROM sitealert");
  if (!result.rows.length) {
    return false;
  }
  return result.rows[0];
}
