import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "@comp/Meta/Title";
import PageHeader from "@comp/UI/General/PageHeader";
import { User } from "@lib/types/users";
import Unauthorized from "@lib/general/admin/unauthorized";
import TeamSettingsPage from "@comp/Staff/tournaments/UpdateTeam";

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
  const { tid } = router.query as unknown as { tid: number };

  const [isLoading, setIsLoading] = useState(true);
  const [perm, setPerm] = useState(0);
  const [teamData, setData] = useState<any>("");
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
  }, [isSessionLoading, router, setSession, tid]);

  useEffect(() => {
    if (router.isReady && !isSessionLoading) {
      if (session && perm) {
        if (perm < 8) {
          router.push("/");
          return;
        }
        fetch(`${process.env.PUBLIC_URL}/api/tourneys/${id}/team/${tid}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              return router.push(`/admin/tourneys/${id}`);
            }
            setData(data.team);
            if (data) {
              setUrl(window.location.href);
              setIsLoading(false);
            }
          });
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, [id, isLoading, isSessionLoading, perm, router, session, tid]);

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
                title={`Teampage`}
                link={url}
                contents={`Teampage | The Teampage on ${process.env.PUBLIC_NAME}.`}
              />
              <div className="max-w-[1340px] mx-auto pt-10 px-4 sm:px-6 lg:px-8">
                <PageHeader title={`Teamsettings`} />
                <>
                  <TeamSettingsPage session={session} teamData={teamData} />
                </>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
