import { useEffect, useState } from "react";
import React from "react";
import Header from "@comp/Meta/Title";
import PageHeader from "@comp/UI/General/PageHeader";
import DividerLeft from "@comp/UI/General/DividerLeft";
import { Tabs } from "flowbite-react";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import H3 from "@comp/UI/General/H3";
import { RulesType } from "@lib/types/rules";
import Link from "next/link";

let url: string;
let jsonData: any;
let load: boolean = true;
export default function Rules() {
  const [rules, setData] = useState<RulesType[]>([]);
  useEffect(() => {
    fetch(`/assets/staff/rules.json`, { next: { revalidate: 120 } })
      .then((response) => response.json())
      .then((json) => {
        jsonData = json;
        setData(jsonData.Rules);
        load = false;
      });

    load
      ? null
      : (document
          .querySelector(".rulesDiv")!
          .classList.add("translate-y-[5px]"),
        document.querySelector(".rulesDiv")!.classList.remove("opacity-0"));
    url = window.location.href;
  }, []);

  return (
    <>
      <Header
        title={`Rules`}
        link={url}
        contents={`Rules | The Rules on ${process.env.NEXT_PUBLIC_NAME}.`}
      />
      <div className="max-w-[1340px] mx-auto pt-10 px-4 sm:px-6 lg:px-8">
        <PageHeader title="Rulesets" />

        {load ? (
          <>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-black dark:border-white drop-shadow-[0_0_1px_rgba(0,0,0,0.50)] flex justify-center align-middle mt-[15%]"></div>
            </div>
          </>
        ) : (
          <>
            <div className="rulesDiv bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg divide-y divide-gray-200 transition-all opcaity-0">
              <div className="px-4 py-5 sm:px-6">
                <p className="rulesInfoHeader">
                  The general guidelines of the website.
                </p>
                <p className="text-gray-900 dark:text-white text-[18px] mt-2">
                  These rules are subject to change at any time.
                </p>
                <p className="text-gray-900 dark:text-white text-[18px] mt-2">
                  If you have any questions, please contact a staff member.
                </p>
                <DividerLeft />
                <p className="text-[18px] mt-2 italic opacity-[75%] ">
                  BannedMods-checker:{" "}
                  <Link
                    className="text-gray-900 underline font-bold dark:text-[#b86969]"
                    href="/bannedmods"
                  >
                    Click here
                  </Link>
                </p>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <Tabs.Group
                  aria-label="Tabs with icons"
                  style="underline"
                  className="text-gray-900 dark:text-white border-gray-200 dark:gray-900 rounded-md bg-gray-200 dark:bg-gray-800 w-auto"
                >
                  {rules!.map((item, index) => (
                    <Tabs.Item
                      key={index}
                      title={item.tabHeader}
                      icon={BookOpenIcon}
                    >
                      {item.tabContent.map((item, index) => (
                        <React.Fragment key={index}>
                          <H3 key={index} text={item.tabTitle} />
                          {item.tabRules.map((item, index) => (
                            <p
                              key={index}
                              className="text-gray-900 dark:text-white text-[18px] mb-[10px]"
                            >
                              {item}
                            </p>
                          ))}
                          <DividerLeft />
                        </React.Fragment>
                      ))}
                    </Tabs.Item>
                  ))}
                </Tabs.Group>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
