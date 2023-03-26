import type { NextApiRequest, NextApiResponse } from "next";
import { getUser } from "@lib/db/users";
import { saveTeam } from "@lib/db/tournaments";
import rateLimit from "@lib/api/ratelimit";
import { decrypt } from "@lib/api/sessioncomp";

const ratelimit: any = process.env.USER_RATELIMIT || 10;
const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

export default async function getTeamDatas(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    await limiter.check(res, ratelimit, "CACHE_TOKEN");
    try {
      const { tid } = req.query as unknown as { tid: number };

      if (isNaN(tid)) {
        res.status(400).json({ error: { message: "ID should be a number" } });
        return;
      }

      if (req.method !== "PUT") {
        return res
          .status(405)
          .json({ error: { message: "Method not allowed." } });
      }

      if (!req.cookies.session) {
        res.status(401).json({ error: { message: "Unauthorized" } });
        return;
      }
      if (req.method == "PUT") {
        try {
          const session = JSON.parse(decrypt(req.cookies.session));
          const pid = session.id;
          const result = await getUser(pid);
          if (!result || result.permissions < 9) {
            res.status(401).json({ error: { message: "Unauthorized" } });
            return;
          } else {
            const result = await saveTeam(tid, req.body);
            if (!result) {
              res.status(404).json({
                error: { message: "Something went wrong, try again" },
              });
              return;
            }
            res.status(200).json({ success: { message: result } });
            return;
          }
        } catch {
          res.status(401).json({ error: { message: "Unauthorized" } });
          return;
        }
      }
    } catch (err: any) {
      res.status(500).json({ error: { message: err } });
    }
  } catch {
    res.status(429).json({ error: { message: "Too many requests" } });
  }
}
