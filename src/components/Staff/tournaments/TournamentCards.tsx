import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AcademicCapIcon,
  CheckBadgeIcon,
  UsersIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import TourneySearch from "./TournamentSearch";

export default function TourneyCards() {
  return (
    <>
      <div
        key={"EditTournaments"}
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
            <div className="focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true" />
              <span className="dark:text-white text-gray-900 transition-all duration-500">
                Search for a tournament
              </span>
            </div>
          </h3>
          <div className="mt-1">
            <TourneySearch />
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
