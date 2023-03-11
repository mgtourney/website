import { useEffect, useState } from "react";
import { BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function BottomBanner({
  visible,
  headline,
  message,
  link,
  linkText,
}: {
  visible: boolean;
  headline: string;
  message: string;
  link: string;
  linkText: string;
}) {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    setShowBanner(visible);
  }, [visible]);

  if (!showBanner) {
    return null;
  }

  return (
    <>
      <div className="sticky z-10 bottom-0 pb-2 sm:pb-5">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="p-2 rounded-lg bg-[#7B52A5] shadow-lg sm:p-3">
            <div className="flex items-center justify-between flex-wrap">
              <div className="w-0 flex-1 flex items-center">
                <span className="flex p-2 rounded-lg bg-[#4a3560]">
                  <BellIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </span>
                <p className="ml-3 font-medium text-white truncate">
                  <span className="md:hidden">{headline}</span>
                  <span className="hidden md:inline">{message}</span>
                </p>
              </div>
              <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                <a
                  href={link || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50"
                >
                  {linkText || "Learn more"}
                </a>
              </div>
              <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
                <button
                  type="button"
                  className="-mr-1 flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <span className="sr-only">Dismiss</span>
                  <XMarkIcon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                    onClick={() => setShowBanner(false)}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
