import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import { User } from "@lib/types/users";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ProfileMenu({ session }: { session: User }) {
  return (
    <>
      <Menu as="div" className="pt-1 ml-4 relative flex-shrink-0">
        <div>
          <Menu.Button className="rounded-md flex focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-pink-600 dark:focus:ring-indigo-500 hover:cursor-pointer">
            <Image
              className="h-8 w-8 rounded-md"
              src={`https://api.danesaber.cf/MG${session.image}`}
              alt={""}
              width={32}
              height={32}
              unoptimized={true}
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href={`/user/${session.id}`}
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "block px-4 py-2 text-sm text-gray-700"
                  )}
                >
                  Profile
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/user/settings"
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "block px-4 py-2 text-sm text-gray-700"
                  )}
                >
                  Settings
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/api/auth/logout"
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "block px-4 py-2 text-sm text-gray-700"
                  )}
                >
                  Logout
                </Link>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
}
