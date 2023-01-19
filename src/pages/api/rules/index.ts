import getRules from "@lib/db/rules";
import { NextApiRequest, NextApiResponse } from "next";

export default async function returnRules(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const rules = await getRules();
  res.status(200).json(rules);
}
