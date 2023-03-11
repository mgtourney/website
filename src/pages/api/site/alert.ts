import type { NextApiRequest, NextApiResponse } from "next";
import { getAlert, updateAlert } from "@lib/db/site";
import { getUser } from "@lib/db/users";
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
      if (req.method !== "GET" && req.method !== "PATCH") {
        return res
          .status(405)
          .json({ error: { message: "Method not allowed." } });
      }

      if (req.method == "GET") {
        const result = await getAlert();
        res.status(200).json({ alert: result });
      }
      if (req.method == "PATCH") {
        if (!req.cookies.session) {
          res.status(401).json({ error: { message: "Unauthorized" } });
          return;
        }
        const session = JSON.parse(decrypt(req.cookies.session));
        const id = session.id;
        const result = await getUser(id);
        if (!result || result.id !== id || result.permissions < 9) {
          res.status(401).json({ error: { message: "Unauthorized" } });
          return;
        } else {
          const result = await updateAlert(req.body);
          if (!result) {
            res
              .status(404)
              .json({ error: { message: "Something went wrong, try again" } });
            return;
          }
          res.status(200).json({ alert: result });
          return;
        }
      }
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ error: { message: err } });
    }
  } catch {
    res.status(429).json({ error: { message: "Too many requests" } });
  }
}
