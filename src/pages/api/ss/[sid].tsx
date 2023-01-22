import type { NextApiRequest, NextApiResponse } from "next";
import cors from "cors";
import rateLimit from "@lib/api/ratelimit";

const corsOptions = {
  origin: "*",
  methods: "GET",
};

const ratelimit: any = process.env.USER_RATELIMIT || 10;
const limiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500,
});

export default async function getPlayerData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await limiter.check(res, 5, "CACHE_TOKEN");

    if (req.method !== "GET") {
      return res.status(405).json({ error: { message: "Method not allowed." } });
    }

    cors(corsOptions)(req, res, async () => {
      const sid = req.query.sid;
      const url = `https://scoresaber.com/api/player/${sid}/basic`;

      let data;
      try {
        const response = await fetch(url);
        return res.status(200).json(await response.json());
      } catch (err) {
        return res.status(500).json({ message: "Error fetching player data" });
      }
    });
  } catch {
    return res.status(429).json({ error: { message: "Too many requests" } });
  }
}
