export default async function handler(req: any, res: any) {
  if (req.method === "GET") {
    if (!req.cookies.session) {
      res.redirect(`./auth/login`);
    } else {
      res.redirect(`../`);
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
