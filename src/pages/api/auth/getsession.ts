import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "@lib/db/sessions";
import rateLimit from "@lib/api/ratelimit";

const ratelimit: number =
  (parseInt(process.env.TOURNAMENT_RATELIMIT!) as number) || 10;
const limiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500,
});

export default async function checkSession(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await limiter.check(res, ratelimit, "CACHE_TOKEN");
  try {
    if (req.method !== "GET") {
      res.status(405).json("Method not allowed");
      return false;
    }
    if (!req.cookies.session) {
      res.json("Session doesn't exist");
      return false;
    }
    const session = await getSession(req.cookies.session);
    if (!session) {
      res.json("Session doesn't exist");
      return false;
    }
    return res.status(200).json({ session });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
