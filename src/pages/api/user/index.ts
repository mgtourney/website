import type { NextApiRequest, NextApiResponse } from "next";
import { getUser } from "@lib/db/users";
import rateLimit from "@lib/api/ratelimit";
import { decrypt } from "@lib/api/sessioncomp";

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
  try {
    await limiter.check(res, ratelimit, "CACHE_TOKEN");
    try {
      if (!req.cookies.session) {
        res.status(401).json({ error: { message: "Unauthorized" } });
        return;
      }
      const session = JSON.parse(decrypt(req.cookies.session));
      const id = session.id;
      if (req.method !== "GET") {
        return res
          .status(405)
          .json({ error: { message: "Method not allowed." } });
      }

      if (isNaN(id)) {
        res.status(400).json({ error: { message: "ID should be a number" } });
        return;
      }

      if (req.method == "GET") {
        const result = await getUser(id);
        if (!result) {
          res.status(404).json({ error: { message: result } });
          return;
        } else {
          res.status(200).json({ user: result });
        }
      }
    } catch (err: any) {
      res.status(500).json({ error: { message: err } });
    }
  } catch (err: any) {
    res.status(500).json({ error: { message: "Too many requests" } });
  }
}
