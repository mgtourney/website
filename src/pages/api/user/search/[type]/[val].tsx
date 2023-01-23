import type { NextApiRequest, NextApiResponse } from "next";
import { userList } from "@lib/db/users";
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

  const { type } = req.query;
  const { val } = req.query;
  const lowerVal = val?.toString().toLowerCase();

  try {
    await limiter.check(res, ratelimit, "CACHE_TOKEN");

    if (type !== "id" && type !== "name") {
      return res.status(400).json({ error: { message: "Invalid search type" } });
    }

    res.status(200).json({ list: await userList(type, lowerVal) });
  } catch (err: any) {
    res.status(500).json({ error: { message: err } });
  }
}
