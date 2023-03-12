import { saveUser } from "@lib/db/users";
import CryptoJS from "crypto-js";
import * as https from "https";

const secret = process.env.AUTHSECRET || "devsecret";
const salt = process.env.SALT || "devsalt";

// Encrypt the user session
export function encrypt(text: string) {
  return CryptoJS.AES.encrypt(text, secret + salt).toString();
}

// Decrypt the user session
export function decrypt(text: string) {
  const bytes = CryptoJS.AES.decrypt(text, secret + salt);
  return bytes.toString(CryptoJS.enc.Utf8);
}

// Create a new session and return it
export function createData(
  id: string,
  username: string,
  avatar: string | any,
  refresh_token: string
) {
  let userImage: string = "";
  https.get(
    `https://cdn.discordapp.com/avatars/${id}/${avatar}?size=1024`,
    (res) => {
      const contentType = res.headers["content-type"];
      userImage = `${id}${contentType === "image/gif"
          ? ".gif"
          : contentType === "image/png"
            ? ".png"
            : contentType === "image/webp"
              ? ".webp"
              : ".jpg"
        }`;
      saveUser(id, username, userImage);
    }
  );
  const data = { id, refresh_token, created_at: new Date().toISOString() };
  const encryptedUser = encrypt(JSON.stringify(data));
  return [data, encryptedUser];
}
