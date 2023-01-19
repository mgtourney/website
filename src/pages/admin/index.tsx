import { useState, useEffect } from "react";
import React from "react";
import Header from "@comp/Meta/Title";
import PageHeader from "@comp/UI/General/PageHeader";
import { User } from "@lib/types/users";
import Unauthorized from "@lib/general/admin/unauthorized";
import {
  AcademicCapIcon,
  CheckBadgeIcon,
  CurrencyDollarIcon,
  WrenchIcon,
  ReceiptRefundIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const actions = [
  {
    title: "Site Settings",
    description:
      "Admin or Developer? You can configure maintenance-mode, rules, API-setting and all the other fun stuff, right here!",
    href: "#",
    icon: WrenchIcon,
    iconForeground: "text-teal-700 dark:bg-[#1b211a]",
    iconBackground: "bg-teal-50 dark:bg-[#1b211a]",
  },
  {
    title: "Manage Tournaments",
    description:
      "Planning a tournament, or just want to adjust the settings of the current one? This is the place to do it!",
    href: "#",
    icon: CheckBadgeIcon,
    iconForeground: "text-purple-700 dark:bg-[#211a23]",
    iconBackground: "bg-purple-50 dark:bg-[#211a23]",
  },
  {
    title: "Manage User",
    description:
      "In here you can set permissions for a user, allow them access to the API, or even ban them from the site!",
    href: "#",
    icon: UsersIcon,
    iconForeground: "text-sky-700 dark:bg-[#171723]",
    iconBackground: "bg-sky-50 dark:bg-[#171723]",
  },
  {
    title: "Manage Something",
    description: "Something is coming here... Soon!",
    href: "#",
    icon: CurrencyDollarIcon,
    iconForeground: "text-yellow-700 dark:bg-[#292319]",
    iconBackground: "bg-yellow-50 dark:bg-[#292319]",
  },
  {
    title: "Feedback-forms",
    description:
      "Want to see feedback from previous tournaments, or do you want to gather new feedback? This is the place to do it!",
    href: "#",
    icon: ReceiptRefundIcon,
    iconForeground: "text-rose-700 dark:bg-[#2e1923]",
    iconBackground: "bg-rose-50 dark:bg-[#2e1923]",
  },
  {
    title: "Guides",
    description:
      "Collection of PDF-files, which can provide information on how to fulfill your role.",
    href: "#",
    icon: AcademicCapIcon,
    iconForeground: "text-indigo-700 dark:bg-[#1b1932]",
    iconBackground: "bg-indigo-50 dark:bg-[#1b1932]",
  },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

let url: string;
export default function AdminMods({ session }: { session: User }) {
  const [isLoading, setIsLoading] = useState(true);
  const [perm, setPerm] = useState(0);

  useEffect(() => {
    url = window.location.href;
    if (session) {
      setPerm(session.permissions);
      if (perm) {
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
  }, [session, perm, setPerm, isLoading, setIsLoading]);

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
                title={`${
                  perm === 10
                    ? "Directors Panel"
                    : perm === 9
                    ? "Developer Panel"
                    : perm === 6
                    ? "Casters Panel"
                    : perm === 5
                    ? "Coordinator Panel"
                    : perm === 4 && "Map-pool Panel"
                }`}
                link={url}
                contents={`Staff Panel | The Staff Panel on ${process.env.NEXT_PUBLIC_NAME}.`}
              />
              <div className="max-w-[1340px] mx-auto pt-10 px-4 sm:px-6 lg:px-8">
                <PageHeader
                  title={`${
                    perm === 10
                      ? "Directors Panel"
                      : perm === 9
                      ? "Developer Panel"
                      : perm === 6
                      ? "Casters Panel"
                      : perm === 5
                      ? "Coordinator Panel"
                      : perm === 4 && "Map-pool Panel"
                  }`}
                />
                <>
                  <div className="adminPanel bg-white dark:bg-[#161616] pb-1rem overflow-hidden rounded-lg divide-y dark:divide-[#202020] transition-all opacity-0 duration-500">
                    <div className="px-4 py-5 sm:px-6">
                      <p className="rulesInfoHeader">
                        Welcome back, {`${session.name}`}!
                      </p>
                    </div>
                    <div className="rounded-lg bg-gray-200 dark:bg-[#161616] overflow-hidden shadow divide-y sm:divide-y-0 dark:divide-[#202020] sm:grid sm:grid-cols-2 sm:gap-px transition-all duration-500">
                      {actions.map((action, actionIdx) => (
                        <div
                          key={action.title}
                          className={classNames(
                            actionIdx === 0
                              ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none"
                              : "",
                            actionIdx === 1 ? "sm:rounded-tr-lg" : "",
                            actionIdx === actions.length - 2
                              ? "sm:rounded-bl-lg"
                              : "",
                            actionIdx === actions.length - 1
                              ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none"
                              : "",
                            "relative group bg-white dark:bg-[#272727] hover:dark:bg-[#202020] p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 transition-all duration-150"
                          )}
                        >
                          <div>
                            <span
                              className={classNames(
                                action.iconBackground,
                                action.iconForeground,
                                "rounded-lg inline-flex p-3 ring-4 ring-white dark:bg-[#161616] dark:ring-[#141414] transition-all duration-500"
                              )}
                            >
                              <action.icon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </span>
                          </div>
                          <div className="mt-8">
                            <h3 className="text-lg font-medium">
                              <a
                                href={action.href}
                                className="focus:outline-none"
                              >
                                <span
                                  className="absolute inset-0"
                                  aria-hidden="true"
                                />
                                <span className="dark:text-white text-gray-900 transition-all duration-500">
                                  {action.title}
                                </span>
                              </a>
                            </h3>
                            <p className="mt-2 text-sm text-gray-500">
                              {action.description}
                            </p>
                          </div>
                          <span
                            className="pointer-events-none absolute top-6 right-6 dark:text-white text-gray-300 group-hover:text-gray-400 transition-all duration-200"
                            aria-hidden="true"
                          >
                            <svg
                              className="h-6 w-6"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                            </svg>
                          </span>
                        </div>
                      ))}
                    </div>
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
