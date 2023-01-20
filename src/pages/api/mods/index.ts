import { NextApiRequest, NextApiResponse } from "next";
import rateLimit from "@lib/api/ratelimit";
import { getMods } from "@lib/db/mods";
import { createBatFile, createModsFile } from "@lib/mods/bannedmods";
import { Mods } from "@lib/types/mods";

const ratelimit: number =
  (parseInt(process.env.TOURNAMENT_RATELIMIT!) as number) || 10;
const limiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500,
});

export default async function ModsListMaker(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await limiter.check(res, ratelimit, "CACHE_TOKEN");
    if (req.method === "GET") {
      createBatFile();
      const mods: Mods[] | any = await getMods();
      createModsFile(mods);
      if (!mods) {
        res.status(404).json({ message: "No mods found" });
        return;
      }
      res.status(200).json({ mods });
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch {
    return res.status(429).json({ error: { message: "Too many requests" } });
  }
}
