import type { NextApiRequest, NextApiResponse } from "next";
import { TeamList } from "@lib/db/tournaments";
import rateLimit from "@lib/api/ratelimit";

const ratelimit: any = process.env.USER_RATELIMIT || 10;
const limiter = rateLimit({
  interval: 60000,
  uniqueTokenPerInterval: 500,
});

export default async function getFullUserdata(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const { tid } = req.query as unknown as { tid: number };
  const { val } = req.query;
  const lowerVal = val?.toString().toLowerCase();

  try {
    await limiter.check(res, ratelimit, "CACHE_TOKEN");

    try {
      const teamList = await TeamList(tid, lowerVal);

      res.status(200).json({ list: teamList });
    } catch (err: any) {
      res.status(500).json({ error: { message: err } });
    }
  } catch (err: any) {
    res.status(500).json({ error: { message: err } });
  }
}
