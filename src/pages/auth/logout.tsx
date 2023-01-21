import { useEffect } from "react";

export default function Logout({ setSession }: { setSession: Function }) {
  setSession(false);
  useEffect(() => {
    window.location.href = "/";
  });
}
