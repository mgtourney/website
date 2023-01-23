import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu } from "@headlessui/react";
import {
  AcademicCapIcon,
  CheckBadgeIcon,
  UsersIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

function useDebounceValue(value: string, time: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, time);
    return () => {
      clearTimeout(handler);
    };
  }, [value, time]);
  return debouncedValue;
}

export default function UserCards() {
  const [inputType, setInputType] = useState("name");
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const debouncedQuery = useDebounceValue(query, 500);

  useEffect(() => {
    (async () => {
      setSuggestions([]);
      if (debouncedQuery.length > 0 && debouncedQuery !== ".") {
        const response = await fetch(`${process.env.PUBLIC_URL}/api/user/search/${inputType}/${debouncedQuery}`);
        const data = await response.json();
        if (data.list === false) {
          setSuggestions([]);
        } else {
          setSuggestions(data.list);
        }
      } else {
        setSuggestions([]);
      }
    })();
  }, [debouncedQuery, inputType]);


  return (
    <>
      <div
        key={"EditUsers"}
        className={
          "rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-lg sm:rounded relative group bg-white dark:bg-[#272727] hover:dark:bg-[#202020] p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 transition-all duration-150"
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
            <div
              className="focus:outline-none"
            >
              <span className="absolute inset-0" aria-hidden="true" />
              <span className="dark:text-white text-gray-900 transition-all duration-500">
                Edit user
              </span>
            </div>
          </h3>
          <div className="mt-2 text-sm">
            <div className="max-w-[50rem] w-full lg:max-w-xs">
              <label htmlFor="search" className="sr-only" unselectable="on">
                Search
              </label>
              <div className="relative flex flex-row">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button
                      className="hover:text-cyan-500 hover:bg-gray-50 text-gray-500 bg-white border-gray-300 dark:bg-[#161616] dark:border-[#131313] dark:text-gray-200 ml-2 relative inline-flex items-center px-2 py-2 shadow-md rounded-l-md border text-sm focus:outline-none">
                      <span className="sr-only">Type</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-[22px] h-[22px]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
                        />
                      </svg>
                    </Menu.Button>
                  </div>
                  <Menu.Items className="z-10 origin-top-right absolute left-2 w-35 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      <div onClick={() => { setInputType("id"), setQuery(""); }} className="bg-gray-100 hover:bg-gray-200 text-cyan-900 group flex items-center px-4 py-2 text-sm cursor-pointer">
                        ID
                      </div>
                    </Menu.Item>
                    <Menu.Item>
                      <div onClick={() => { setInputType("name"), setQuery(""); }} className="bg-gray-100 hover:bg-gray-200 text-cyan-900 group flex items-center px-4 py-2 text-sm cursor-pointer">
                        Name
                      </div>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
                <div className="absolute inset-y-0 left-[3.5rem] pl-1 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full h-[40px] pl-10 border text-black border-gray-300 rounded-r-md focus:rounded-br-none leading-5 bg-white placeholder-gray-500 dark:text-white dark:border-[#131313] dark:bg-[#161616] focus:placeholder-gray-400"
                  placeholder={`Search by ${inputType}`}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>

            <div className={`absolute left-[4.5rem] max-h-32 overflow-x-hidden flex items-center flex-col z-10 last:rounded-b-[10px] ${suggestions.length <= 8 ? 'h-8rem' : ''}`}>
              {suggestions.map((suggestion: any) => (
                <Link
                  className="text-[18px] w-[16rem] bg-white border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-gray-900 focus:border-gray-900 dark:border-[#131313] dark:bg-[#161616] dark:hover:bg-[#131313] text-black dark:text-white border min-h-[40px] pt-2 pl-2 border-1 last:rounded-b-[10px]"
                  key={suggestion.id}
                  href={`/admin/user/${suggestion.id}`}
                >
                  {suggestion.name}
                </Link>
              ))}
            </div>
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
        key={"APIKeys"}
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
            <Link href={`#`} className="focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true" />
              <span className="dark:text-white text-gray-900 transition-all duration-500">
                API-Verification
              </span>
            </Link>
          </h3>
          <div className="mt-2 text-sm text-gray-500">
            Someone asked for API access? Verify their account, and give them an
            API key!
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
        key={"UserList"}
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
                Userlist
              </span>
            </Link>
          </h3>
          <div className="mt-2 text-sm text-gray-500">
            See a list of users, and their roles!
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
                Stats
              </span>
            </Link>
          </h3>
          <div className="mt-2 text-sm text-gray-500">
            An overview of the user-stats on the website
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
