import { NextApiRequest, NextApiResponse } from "next";
import { deleteSession } from "@lib/db/sessions";
import rateLimit from "@lib/api/ratelimit";

const ratelimit: number =
  (parseInt(process.env.TOURNAMENT_RATELIMIT!) as number) || 10;
const limiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500,
});

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await limiter.check(res, ratelimit, "CACHE_TOKEN");
    if (req.method == "GET") {
      if (!req.cookies.session) {
        return res.redirect(`${process.env.PUBLIC_URL}`);
      }
      await deleteSession(req.cookies.session);
      res.setHeader(
        "Set-Cookie",
        `session=; path=/; SameSite=Strict; HttpOnly; expires=${new Date(
          Date.now() + 1
        ).toUTCString()}`
      );
      res.redirect(`${process.env.PUBLIC_URL}/`);
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch {
    return res.status(429).json({ error: { message: "Too many requests" } });
  }
}
