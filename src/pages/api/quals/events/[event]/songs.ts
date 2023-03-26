//42150f85-1d01-4c77-b83c-25ab3a4f6e38

import type { NextApiRequest, NextApiResponse } from "next";
import rateLimit from "@lib/api/ratelimit";
import { getQualifiers } from "@lib/db/qualifiers";

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

export default async function getSongsIndex(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await limiter.check(res, 5, "CACHE_TOKEN");

    const id = req.query.event as string;

    try {
      const songs = await getQualifiers(id);
      res.status(200).json({ songs });
    } catch (err) {
      return res.status(500).json({ error: { message: err } });
    }
  } catch (err) {
    console.error(err);
    return res.status(429).json({ error: { message: "Too many requests" } });
  }
}
