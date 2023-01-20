import { getStaffMembers } from "@lib/db/staff";
import { NextApiRequest, NextApiResponse } from "next";
import rateLimit from "@lib/api/ratelimit";

const ratelimit: number =
  (parseInt(process.env.TOURNAMENT_RATELIMIT!) as number) || 10;
const limiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500,
});

export default async function getStaff(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await limiter.check(res, ratelimit, "CACHE_TOKEN");
    const staff = await getStaffMembers();
    res.status(200).json(staff);
  } catch {
    return res.status(429).json({ error: { message: "Too many requests" } });
  }
}
