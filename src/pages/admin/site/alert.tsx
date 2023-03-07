import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "@comp/Meta/Title";
import PageHeader from "@comp/UI/General/PageHeader";
import { User } from "@lib/types/users";
import Unauthorized from "@lib/general/admin/unauthorized";
import SettingsPage from "@comp/Staff/site/Settings";

export default function UserAdmin({
  session,
  setSession,
}: {
  session: User;
  setSession: Function;
}) {
  const router = useRouter();
  const [isSessionLoading, setIsSessionLoading] = useState(true);
  const { id } = router.query as unknown as { id: number };

  const [isLoading, setIsLoading] = useState(true);
  const [perm, setPerm] = useState(0);
  const [alertData, setData] = useState<any>(null);
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    if (router.isReady && isSessionLoading) {
      fetch(`${process.env.PUBLIC_URL}/api/auth/getsession`)
        .then((res) => res.json())
        .then((data) => {
          if (data.session) {
            setSession(data.session);
            setPerm(data.session.permissions);
            setIsSessionLoading(false);
            return;
          }
          router.push("/");
        });
    }
  }, [isSessionLoading, router, setSession]);

  useEffect(() => {
    if (router.isReady && !isSessionLoading) {
      if (session && perm) {
        if (perm < 8) {
          router.push("/");
          return;
        }
        fetch(`${process.env.PUBLIC_URL}/api/site/alert`)
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              return router.push(`/admin/user`);
            }
            setData(data.alert);
            if (data) {
              setUrl(window.location.href);
              setIsLoading(false);
              setTimeout(() => {
                perm >= 8 &&
                  !isLoading &&
                  document
                    .querySelector(".adminPanel")!
                    .classList.add("translate-y-[10px]");
                document
                  .querySelector(".adminPanel")!
                  .classList.remove("opacity-0");
              }, 150);
            }
          });
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, [id, isLoading, isSessionLoading, perm, router, session]);

  return (
    <>
      <Header title={`Page`} />
      {isLoading ? (
        <>
          <div className="flex flex-col pt-[5rem] flex-wrap justify-center items-center">
            <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-black dark:border-white drop-shadow-[0_0_1px_rgba(0,0,0,0.50)] mt-[1rem]"></div>
          </div>
        </>
      ) : (
        <>
          {perm < 8 ? (
            <Unauthorized />
          ) : (
            <>
              <Header
                title={`Site alert`}
                link={url}
                contents={`Site alert-panel | The Site alert-panel on ${process.env.PUBLIC_NAME}.`}
              />
              <div className="max-w-[1340px] mx-auto pt-10 px-4 sm:px-6 lg:px-8">
                <PageHeader title={`Site alert`} />
                <>
                  <div className="adminPanel bg-white dark:bg-[#161616] pb-1rem overflow-hidden rounded-lg divide-y dark:divide-[#202020] transition-all opacity-0 duration-500">
                    <div className="px-4 py-5 sm:px-6">
                      <SettingsPage session={session} alertData={alertData} />
                    </div>
                    <div className="rounded-lg bg-gray-200 dark:bg-[#161616] overflow-hidden shadow divide-y sm:divide-y-0 dark:divide-[#202020] sm:grid sm:grid-cols-2 sm:gap-px transition-all duration-500"></div>
                  </div>
                </>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
