import React from "react";
import { Redirect } from "@lib/general/user/redirect";

let url: string;
export default function UserPage() {
  return (
    <>
      <Redirect redirectTo={`/`} />
    </>
  );
}
