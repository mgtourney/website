import DiscordOAuth2 from "discord-oauth2";
import * as fs from "fs";
import * as https from "https";
import { createData } from "@sescomp";
import { createSession } from "@lib/db/sessions";
import rateLimit from "@lib/api/ratelimit";
const oauth = new DiscordOAuth2();

const ratelimit: number =
  (parseInt(process.env.TOURNAMENT_RATELIMIT!) as number) || 10;
const limiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500,
});

const clientId = process.env.DISCORD_CLIENT_ID || "";
const clientSecret = process.env.DISCORD_CLIENT_SECRET || "";
const redirectUri = process.env.DISCORD_REDIRECT_URI || "";
let userImage: string = "";

async function postData(url: string, data: { url: string; name: string }) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

const download = (url: string, filename: string) => {
  let userImage: string = "";
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

    /*
    Temp fix until CDN/Other method of storing image is up
    */
    postData("https://api.danesaber.cf/MG/upload", { url, name: userImage });

    /*
    Temp disabled writing files to own server, until CDN/Other method of storing image is up
    */
    // const fileStream = fs.createWriteStream(
    //   `./public/assets/images/users/${filename}${
    //     contentType === "image/gif"
    //       ? ".gif"
    //       : contentType === "image/png"
    //       ? ".png"
    //       : contentType === "image/webp"
    //       ? ".webp"
    //       : ".jpg"
    //   }`
    // );
    // res.pipe(fileStream);
    // fileStream.on("finish", () => {
    //   fileStream.close();
    // });
  });
};

export default async function LoginCallback(req: any, res: any) {
  const code = req.query.code;
  try {
    await limiter.check(res, ratelimit, "CACHE_TOKEN");
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
      const data = createData(
        user.id,
        user.username,
        user.avatar,
        token.refresh_token
      );

      res.setHeader(
        "Set-Cookie",
        `session=${
          data[1]
        }; path=/; SameSite=Strict; HttpOnly; expires=${new Date(
          Date.now() + 2592000000
        ).toUTCString()}`
      );

      await createSession(user.id, token.refresh_token);
      res.redirect("/");
    } catch (error) {
      let errorMessage: string = "";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      res.status(500).json({ error: errorMessage });
    }
  } catch {
    return res.status(429).json({ error: { message: "Too many requests" } });
  }
}
