import { useState, useEffect } from "react";
import React from "react";
import Header from "@comp/Meta/Title";
import PageHeader from "@comp/UI/General/PageHeader";
import { User } from "@lib/types/users";
import Unauthorized from "@lib/admin/unauthorized";

let url: string;
export default function AdminMods({ session }: { session: User }) {
  const [loading, setLoading] = useState(true);
  const [perm, setPerm] = useState(0);

  useEffect(() => {
    url = window.location.href;
    if (session) {
      setPerm(session.permissions);
    }
    setTimeout(() => {
      setLoading(false);
    }, 150);
  }, [session, perm, setPerm, loading, setLoading]);

  return (
    <>
      <Header title={``} />
      {loading ? (
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
                title={`${
                  perm === 10
                    ? "Developer Panel"
                    : perm === 9
                    ? "Admin Panel"
                    : perm === 8 && "Moderator Panel"
                }`}
                link={url}
                contents={`Staff Panel | The Staff Panel on ${process.env.NEXT_PUBLIC_NAME}.`}
              />
              <div className="max-w-[1340px] mx-auto pt-10 px-4 sm:px-6 lg:px-8">
                <PageHeader
                  title={`${
                    perm === 10
                      ? "Developer Panel"
                      : perm === 9
                      ? "Admin Panel"
                      : perm === 8 && "Moderator Panel"
                  }`}
                />
                <>
                  <div className="calendarDiv bg-white dark:bg-gray-800 pb-1rem overflow-hidden shadow rounded-lg divide-y divide-gray-200 transition-all opcaity-0">
                    <div className="px-4 py-5 sm:px-6">
                      <p className="rulesInfoHeader">
                        Welcome back, {`${session.name}`}!
                      </p>
                      <p className="text-gray-900 dark:text-white text-[18px] mt-2"></p>
                    </div>
                    <header className="relative z-20 flex items-center justify-between border-b border-gray-200 py-4 px-6 lg:flex-none">
                      <div className="container min-h-[400px]">HOLY SMOKES, YOU'RE AUTHORIZED IN HERE?!</div>
                    </header>
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
