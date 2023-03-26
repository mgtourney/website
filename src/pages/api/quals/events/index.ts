import type { NextApiRequest, NextApiResponse } from "next";
import rateLimit from "@lib/api/ratelimit";
import { getQualifiersEvents } from "@lib/db/qualifiers";

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

export default async function getAPIIndex(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await limiter.check(res, 5, "CACHE_TOKEN");

    try {
      const events = await getQualifiersEvents();
      res.status(200).json({ events });
    } catch (err) {
      return res.status(500).json({ error: { message: err } });
    }
  } catch (err) {
    console.error(err);
    return res.status(429).json({ error: { message: "Too many requests" } });
  }
}
