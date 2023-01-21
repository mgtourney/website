import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "@comp/Meta/Title";
import PageHeader from "@comp/UI/General/PageHeader";
import { User } from "@lib/types/users";
import { Redirect } from "@lib/general/user/redirect";

export default function AdminMods({
  session,
  setSession,
}: {
  session: User;
  setSession: Function;
}) {
  const router = useRouter();
  const { id } = router.query as unknown as { id: number };

  const [isSessionLoading, setIsSessionLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setData] = useState<User | null>(null);
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    if (router.isReady && isSessionLoading) {
      fetch(`${process.env.PUBLIC_URL}/api/auth/getsession`)
        .then((res) => res.json())
        .then((data) => {
          if (data.session) {
            setSession(data.session);
            setIsSessionLoading(false);
            return;
          }
          router.push("/");
        });
    }
  }, [isSessionLoading, router.isReady, setSession, router]);

  useEffect(() => {
    if (router.isReady && !isSessionLoading) {
      fetch(`${process.env.PUBLIC_URL}/api/user/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            return router.push(`/`);
          }
          setData(data.user);
          if (data) {
            setIsLoading(false);
            setUrl(window.location.href);
            setTimeout(() => {
              !isLoading &&
                document
                  .querySelector(".userDiv")!
                  .classList.add("translate-y-[10px]");
              document.querySelector(".userDiv")!.classList.remove("opacity-0");
            }, 150);
          }
        });
    }
  }, [isSessionLoading, setData, setIsLoading, isLoading, id, router]);

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
          <Header
            title={`${userData?.name}'s Profile`}
            link={url}
            contents={`${userData?.name}'s Profile | User-profile on ${process.env.PUBLIC_NAME}.`}
          />

          <div className="max-w-[1340px] mx-auto pt-10 px-4 sm:px-6 lg:px-8">
            <PageHeader title={`${userData?.name}'s Profile`} />
            <>
              <div className="userDiv bg-white dark:bg-[#161616] pb-1rem overflow-hidden rounded-lg divide-y dark:divide-[#202020] transition-all opacity-0 duration-500">
                <div className="px-4 py-5 sm:px-6">
                  <p className="rulesInfoHeader">
                    Welcome back, {`${session.name}`}!
                  </p>
                  {/* <p className="text-gray-900 dark:text-white text-[18px] mt-2"></p> */}
                </div>
                <div className="rounded-lg bg-gray-200 dark:bg-[#161616] overflow-hidden shadow divide-y sm:divide-y-0 dark:divide-[#202020] sm:grid sm:grid-cols-2 sm:gap-px transition-all duration-500"></div>
              </div>
            </>
          </div>
        </>
      )}
    </>
  );
}
