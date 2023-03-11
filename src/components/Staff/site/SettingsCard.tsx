import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AcademicCapIcon,
  CheckBadgeIcon,
  UsersIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export default function SiteCards() {

  return (
    <>
      <div
        key={"ManagePage"}
        className={
          "pb-20 rounded-tl-lg z-10 rounded-tr-lg rounded-bl-lg rounded-br-lg sm:rounded relative group bg-white dark:bg-[#272727] hover:dark:bg-[#202020] p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 transition-all duration-150"
        }
      >
        <div>
          <span
            className={
              "text-sky-700 bg-sky-50 rounded-lg inline-flex p-3 ring-4 ring-[#68a372] dark:bg-[#1f202b] transition-all duration-500"
            }
          >
            <UsersIcon className="h-6 w-6" aria-hidden="true" />
          </span>
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-medium">
            <Link href={`/admin/site/alert`} className="focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true" />
              <span className="dark:text-white text-gray-900 transition-all duration-500">
                General Settings [WIP]
              </span>
            </Link>
          </h3>
          <div className="mt-2 text-sm text-gray-500">
            Manage Maintenance, Site Name, Site Description, Site Logo, and
            more.
          </div>
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
      <div
        key={"Alerts"}
        className={
          "rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-lg sm:rounded relative group bg-white dark:bg-[#272727] hover:dark:bg-[#202020] p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 transition-all duration-150"
        }
      >
        <div>
          <span
            className={
              "text-purple-700 bg-purple-50 dark:bg-[#211a23] rounded-lg inline-flex p-3 ring-4 ring-white dark:ring-[#141414] transition-all duration-500"
            }
          >
            <CheckBadgeIcon className="h-6 w-6" aria-hidden="true" />
          </span>
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-medium">
            <Link href={`/admin/site/alert`} className="focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true" />
              <span className="dark:text-white text-gray-900 transition-all duration-500">
                Site-notifications
              </span>
            </Link>
          </h3>
          <div className="mt-2 text-sm text-gray-500">
            Want to announce something? You can do it here!
          </div>
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
      <div
        key={"Rules"}
        className={
          "rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-lg sm:rounded relative group bg-white dark:bg-[#272727] hover:dark:bg-[#202020] p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 transition-all duration-150"
        }
      >
        <div>
          <span
            className={
              "text-rose-700 bg-rose-50 dark:bg-[#2e1923] rounded-lg inline-flex p-3 ring-4 ring-white dark:ring-[#141414] transition-all duration-500"
            }
          >
            <UsersIcon className="h-6 w-6" aria-hidden="true" />
          </span>
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-medium">
            <Link href={`#`} className="focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true" />
              <span className="dark:text-white text-gray-900 transition-all duration-500">
                Rules [WIP]
              </span>
            </Link>
          </h3>
          <div className="mt-2 text-sm text-gray-500">
            Manage your rules here!
          </div>
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
      <div
        key={"UserStats"}
        className={
          "rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-lg sm:rounded relative group bg-white dark:bg-[#272727] hover:dark:bg-[#202020] p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 transition-all duration-150"
        }
      >
        <div>
          <span
            className={
              "text-indigo-700 dark:bg-[#1b1932] bg-indigo-50 rounded-lg inline-flex p-3 ring-4 ring-white dark:ring-[#141414] transition-all duration-500"
            }
          >
            <AcademicCapIcon className="h-6 w-6" aria-hidden="true" />
          </span>
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-medium">
            <Link href={`#`} className="focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true" />
              <span className="dark:text-white text-gray-900 transition-all duration-500">
                API-Settings [WIP]
              </span>
            </Link>
          </h3>
          <div className="mt-2 text-sm text-gray-500">
            Change API-settings here.
          </div>
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
    </>
  );
}
