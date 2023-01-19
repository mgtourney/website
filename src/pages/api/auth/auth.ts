import DiscordOAuth2 from "discord-oauth2";
import * as fs from "fs";
import * as https from "https";
import { createData } from "@sescomp";
import { createSession } from "@lib/db/sessions";
const oauth = new DiscordOAuth2();

const clientId = process.env.DISCORD_CLIENT_ID || "";
const clientSecret = process.env.DISCORD_CLIENT_SECRET || "";
const redirectUri = process.env.DISCORD_REDIRECT_URI || "";
let userImage: string = "";

const download = (url: string, filename: string) => {
  https.get(url, (res) => {
    const contentType = res.headers["content-type"];
    userImage = `${filename}${
      contentType === "image/gif"
        ? ".gif"
        : contentType === "image/png"
        ? ".png"
        : contentType === "image/webp"
        ? ".webp"
        : ".jpg"
    }`;

    const fileStream = fs.createWriteStream(
      `./public/assets/images/users/${filename}${
        contentType === "image/gif"
          ? ".gif"
          : contentType === "image/png"
          ? ".png"
          : contentType === "image/webp"
          ? ".webp"
          : ".jpg"
      }`
    );
    res.pipe(fileStream);
    fileStream.on("finish", () => {
      fileStream.close();
    });
  });
};

export default async function LoginCallback(req: any, res: any) {
  const code = req.query.code;

  try {
    const token = await oauth.tokenRequest({
      clientId,
      clientSecret,
      code,
      scope: "identify",
      grantType: "authorization_code",
      redirectUri,
    });
    const user = await oauth.getUser(token.access_token);
    download(
      `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}?size=1024`,
      user.id
    );
    const data = createData(user.id, user.username, user.avatar, token.refresh_token);

    res.setHeader(
      "Set-Cookie",
      `session=${
        data[1]
      }; path=/; SameSite=Strict; HttpOnly; expires=${new Date(
        Date.now() + 2592000000
      ).toUTCString()}`
    );

    createSession(user.id, token.refresh_token);
    res.redirect("/");
  } catch (error) {
    let errorMessage: string = "";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(500).json({ error: errorMessage });
  }
}
