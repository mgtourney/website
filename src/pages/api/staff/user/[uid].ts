import type { NextApiRequest, NextApiResponse } from "next";
import { getUser, updateUser } from "@lib/db/users";
import rateLimit from "@lib/api/ratelimit";
import { decrypt } from "@lib/api/sessioncomp";

const ratelimit: any = process.env.USER_RATELIMIT || 10;
const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

export default async function getFullUserdata(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    await limiter.check(res, ratelimit, "CACHE_TOKEN");
    try {
      const { uid } = req.query as unknown as { uid: number };

      if (isNaN(uid)) {
        res.status(400).json({ error: { message: "ID should be a number" } });
        return;
      }

      if (req.method !== "GET" && req.method !== "PATCH") {
        return res
          .status(405)
          .json({ error: { message: "Method not allowed." } });
      }

      if (!req.cookies.session) {
        res.status(401).json({ error: { message: "Unauthorized" } });
        return;
      }

      if (req.method == "GET") {
        const result = await getUser(uid);
        if (!result) {
          res.status(404).json({ error: { message: "User not found" } });
          return;
        } else {
          res.status(200).json({ user: result });
        }
      }
      if (req.method == "PATCH") {
        try {
          const session = JSON.parse(decrypt(req.cookies.session));
          const pid = session.id;
          const result = await getUser(pid);
          if (!result || result.permissions < 9) {
            res.status(401).json({ error: { message: "Unauthorized" } });
            return;
          } else {
            const result = await updateUser(req.body);
            if (!result) {
              res.status(404).json({
                error: { message: "Something went wrong, try again" },
              });
              return;
            }
            res.status(200).json({ success: { message: "User updated!" } });
            return;
          }
        } catch {
          res.status(401).json({ error: { message: "Unauthorized" } });
          return;
        }
      }
    } catch (err: any) {
      res.status(500).json({ error: { message: err } });
      return;
    }
  } catch {
    res.status(429).json({ error: { message: "Too many requests" } });
    return;
  }
}
