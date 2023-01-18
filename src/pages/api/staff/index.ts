import { getStaffMembers } from "@lib/db/staff";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const staff = await getStaffMembers();
  res.status(200).json(staff);
}
