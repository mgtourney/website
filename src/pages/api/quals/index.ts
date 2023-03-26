import type { NextApiRequest, NextApiResponse } from "next";
import rateLimit from "@lib/api/ratelimit";
import { convertIDs } from "@lib/db/qualifiers";

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

export default async function qualsIndex(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await limiter.check(res, 5, "CACHE_TOKEN");
    if (req.method !== "GET" && req.method !== "POST") {
      res.status(405).json({ message: "Method not allowed" });
      return;
    }

    if (req.method === "POST") {
      const converted = await convertIDs();
      return res.status(200).json({ message: converted });
    }
    if (req.method === "GET") {
      return res.status(200).json({
        message: `To use the Quals-API, head over to ${process.env.PUBLIC_URL}/docs`,
      });
    }
  } catch {
    return res.status(429).json({ error: { message: "Too many requests" } });
  }
}
