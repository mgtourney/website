export default async function handler(req: any, res: any) {
  if (req.method === "GET") {
    res.redirect(
      `https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&redirect_uri=${process.env.DISCORD_REDIRECT_URI}&response_type=code&scope=identify`
    );
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
