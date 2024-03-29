import type { NextApiRequest, NextApiResponse } from "next";
import { getAllTourneys } from "@lib/db/tournaments";
import rateLimit from "@lib/api/ratelimit";

const ratelimit: any = process.env.USER_RATELIMIT || 10;
const limiter = rateLimit({
  interval: 60000,
  uniqueTokenPerInterval: 500,
});

export default async function getTournamentList(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    await limiter.check(res, ratelimit, "CACHE_TOKEN");

    res.status(200).json({ list: await getAllTourneys() });
  } catch (err: any) {
    res.status(500).json({ error: { message: "Too many requests" } });
  }
}
