import { NextApiRequest, NextApiResponse } from "next";
import { deleteSession } from "@lib/db/sessions";

export default async function checkSession(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method == "GET") {
      if (!req.cookies.session) {
        return res.redirect(`${process.env.NEXT_PUBLIC_URL}`);
      }
      const delCookie = await deleteSession(req.cookies.session);
      if (!delCookie) {
        return res.redirect(`${process.env.NEXT_PUBLIC_URL}`);
      }
      res.setHeader(
        "Set-Cookie",
        `session=; path=/; SameSite=Strict; HttpOnly; expires=${new Date(
          Date.now() + 1
        ).toUTCString()}`
      );
      res.redirect(`${process.env.NEXT_PUBLIC_URL}/auth/logout`);
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch {
    return res.status(429).json({ error: { message: "Too many requests" } });
  }
}
