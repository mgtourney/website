import rateLimit from "@lib/api/ratelimit";
import getRules from "@lib/db/rules";
import { NextApiRequest, NextApiResponse } from "next";

const ratelimit: number =
  (parseInt(process.env.TOURNAMENT_RATELIMIT!) as number) || 10;
const limiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500,
});

export default async function returnRules(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await limiter.check(res, ratelimit, "CACHE_TOKEN");
    const rules = await getRules();
    res.status(200).json(rules);
  } catch {
    return res.status(429).json({ error: { message: "Too many requests" } });
  }
}
