import type { NextApiRequest, NextApiResponse } from "next";
import { getHighestScoreForMap } from "@lib/db/qualifiers";

export default async function getScore(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { info } = req.query;
  let infoArray: any = [];

  if (info && info.length == 3) {
    infoArray = [info[0], info[1], info[2]];
  } else {
    infoArray = [];
  }

  if (infoArray.length == 0) {
    return res.status(404).json({ error: { message: "No data found" } });
  }

  try {
    const score = await getHighestScoreForMap(
      infoArray[0],
      infoArray[1],
      infoArray[2]
    );
    return res.status(200).json({ score });
  } catch (err) {
    return res.status(500).json({ error: { message: err } });
  }
}
