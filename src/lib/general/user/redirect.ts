import { useEffect } from "react";
import { useRouter } from "next/router";

export function Redirect({ redirectTo }: { redirectTo: string }) {
  const router = useRouter();

  useEffect(() => {
    router.push(
      {
        pathname: redirectTo,
      },
      undefined,
      {}
    );
  }, [redirectTo, router]);

  return null;
}
