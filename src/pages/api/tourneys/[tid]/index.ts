import type { NextApiRequest, NextApiResponse } from "next";
import { getTournament } from "@lib/db/tournaments";
import rateLimit from "@lib/api/ratelimit";

const ratelimit: any = process.env.USER_RATELIMIT || 10;
const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

export default async function getTeamData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    await limiter.check(res, ratelimit, "CACHE_TOKEN");
    try {
      const { tid } = req.query as unknown as { tid: number };
      if (req.method !== "GET") {
        return res
          .status(405)
          .json({ error: { message: "Method not allowed." } });
      }

      if (isNaN(tid)) {
        res.status(400).json({ error: { message: "ID should be a number" } });
        return;
      }

      if (req.method == "GET") {
        const result = await getTournament(tid);
        if (!result) {
          res.status(404).json({ error: { message: "No teams found" } });
          return;
        } else {
          res.status(200).json({ tournament: result });
        }
      }
    } catch (err: any) {
      res.status(500).json({ error: { message: err } });
    }
  } catch {
    res.status(429).json({ error: { message: "Too many requests" } });
  }
}
