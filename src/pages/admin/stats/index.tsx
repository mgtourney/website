import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Header from "@comp/Meta/Title";
import PageHeader from "@comp/UI/General/PageHeader";
import { User } from "@lib/types/users";

function animateValue(ref: { current: { innerHTML: number } }, end: number) {
  let startTimestamp: number | null = null;
  const step = (timestamp: number) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / 250, 1);
    ref.current.innerHTML = Math.floor(progress * (end - 0) + 0);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

export default function PageStats(
  this: any,
  {
    session,
    setSession,
  }: {
    session: User;
    setSession: Function;
  }
) {
  const uCRef = useRef<HTMLDivElement>(null);
  const aCRef = useRef<HTMLDivElement>(null);
  const tCRef = useRef<HTMLDivElement>(null);
  const lqCRef = useRef<HTMLDivElement>(null);
  const ltCRef = useRef<HTMLDivElement>(null);
  const etCRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [isSessionLoading, setIsSessionLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [perm, setPerm] = useState(session.permissions);
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

  const [stats, setStats] = useState<any>([]);
  useEffect(() => {
    if (router.isReady && !isSessionLoading) {
      if (session && perm) {
        if (perm < 4) {
          router.push("/");
          return;
        }

        fetch(`${process.env.PUBLIC_URL}/api/stats`, {
          cache: "force-cache",
          headers: new Headers({ "cache-control": `max-age=300` }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (!data.stats) {
              return;
            }
            setStats(data.stats[0]);
          });

        setUrl(window.location.href);
        setIsLoading(false);
        setTimeout(() => {
          !isLoading &&
            document
              .querySelector(".adminPanel")!
              .classList.remove("opacity-0");
          document
            .querySelector(".adminPanel")!
            .classList.add("translate-y-[10px]");
        }, 150);
      }
    }
  }, [isLoading, isSessionLoading, perm, router, session]);

  useEffect(() => {
    const valuesToAnimate = [
      { ref: uCRef, count: stats.user_count },
      { ref: aCRef, count: stats.apikey_count },
      { ref: lqCRef, count: stats.active_qualifiers_count },
      { ref: etCRef, count: stats.ended_tournament_count },
      { ref: tCRef, count: stats.total_tournament_count },
      { ref: ltCRef, count: stats.active_tournament_count },
    ];

    valuesToAnimate.forEach(({ ref, count }: { ref: any; count: any }) => {
      if (count) {
        animateValue(ref, parseInt(count));
      }
    });
  }, [stats]);

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
            title={`Stats-Panel`}
            link={url}
            contents={`Stats-panel | The Stats-Panel on ${process.env.PUBLIC_NAME}.`}
          />
          <div className="max-w-[1340px] mx-auto pt-10 px-4 sm:px-6 lg:px-8">
            <PageHeader title={`Website-stats`} />
            <>
              <div className="adminPanel bg-white dark:bg-[#161616] pb-1rem overflow-hidden rounded-lg divide-y dark:divide-[#202020] transition-all opacity-0 duration-500">
                <div className="px-4 py-5 sm:px-6">
                  <p className="rulesInfoHeader">
                    {`${process.env.PUBLIC_NAME} Website-statistics`}
                  </p>
                </div>
                <div className="bg-white dark:bg-[#373737] pt-6 sm:pt-10 rounded-lg transition-all duration-500">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                      <p className="text-xl dark:text-white text-black transition-all duration-500">
                        See the combined stats of different things on the
                        website.
                      </p>
                    </div>
                  </div>
                  <div className="mt-10 pb-12 sm:pb-16">
                    <div className="relative">
                      <div className="absolute inset-0 h-1/2" />
                      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                          <dl className="dark:bg-[#272727] bg-[#fafafa] rounded-lg shadow-lg sm:grid sm:grid-cols-3 transition-all duration-500">
                            <div className="flex flex-col border-b dark:border-[#202020] p-6 text-center sm:border-0 sm:border-r transition-all duration-500">
                              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                                Users
                              </dt>
                              <dd
                                ref={uCRef}
                                className="uC order-1 text-5xl font-extrabold text-[#009FFB] dark:text-[#008DDE]"
                              >
                                0
                              </dd>
                            </div>
                            <div className="flex flex-col border-t border-b dark:border-[#202020] p-6 text-center sm:border-0 sm:border-l sm:border-r transition-all duration-500">
                              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                                API Keys issued
                              </dt>
                              <dd
                                ref={aCRef}
                                className="aC order-1 text-5xl font-extrabold text-[#009FFB] dark:text-[#008DDE]"
                              >
                                0
                              </dd>
                            </div>
                            <div className="flex flex-col border-t dark:border-[#202020] p-6 text-center sm:border-0 sm:border-l transition-all duration-500">
                              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                                Tournaments
                              </dt>
                              <dd
                                ref={tCRef}
                                className="tC order-1 text-5xl font-extrabold text-[#009FFB] dark:text-[#008DDE]"
                              >
                                0
                              </dd>
                            </div>
                            <div className="flex flex-col border-b dark:border-[#202020] p-6 text-center sm:border-0 sm:border-r sm:border-t transition-all duration-500">
                              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                                Live Qualifiers
                              </dt>
                              <dd
                                ref={lqCRef}
                                className="lqC order-1 text-5xl font-extrabold text-[#009FFB] dark:text-[#008DDE]"
                              >
                                0
                              </dd>
                            </div>
                            <div className="flex flex-col border-t border-b dark:border-[#202020] p-6 text-center sm:border-0 sm:border-l sm:border-r sm:border-t transition-all duration-500">
                              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                                Live Tournaments
                              </dt>
                              <dd
                                ref={ltCRef}
                                className="ltC order-1 text-5xl font-extrabold text-[#009FFB] dark:text-[#008DDE]"
                              >
                                0
                              </dd>
                            </div>
                            <div className="flex flex-col border-t dark:border-[#202020] p-6 text-center sm:border-0 sm:border-l sm:border-t transition-all duration-500">
                              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                                Ended Tournaments
                              </dt>
                              <dd
                                ref={etCRef}
                                className="etC order-1 text-5xl font-extrabold text-[#009FFB] dark:text-[#008DDE]"
                              >
                                0
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          </div>
        </>
      )}
    </>
  );
}
