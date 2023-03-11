import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import { User } from "@lib/types/users";
import { Success, Error } from "@comp/UI/General/Notifiers";
import router from "next/router";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function SettingsPage({
  session,
  alertData,
}: {
  session: User;
  alertData: any;
}) {
  const [alertVisible, setAlertVisible] = useState(alertData?.visible || false);
  const [headline, setHeadline] = useState(alertData?.headline || "");
  const [message, setMessage] = useState(alertData?.message || "");
  const [link, setLink] = useState(alertData?.link || "");
  const [linkText, setLinkText] = useState(alertData?.linktext || "");

  async function handleSave() {
    try {
      const apiPatchRes = await fetch(
        `${process.env.PUBLIC_URL}/api/site/alert`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: 2,
            visible: alertVisible,
            headline: headline,
            message: message,
            link: link,
            linktext: linkText
          }),
        }
      );
      const apiPatchData = await apiPatchRes.json();
      if (apiPatchData.error) {
        return Error({ text: apiPatchData.error.message });
      } else {
        return Success({ text: "Alert got saved!" });
      }
    } catch (error) {
      return Error({ text: "Alert was not saved." });
    }
  }

  return (
    <div>
      <main className="relative flex flex-wrap flex-col">
        <div className="pb-6 px-4 sm:px-6 lg:pb-16">
          <div className="bg-white dark:bg-[#1b1b1b] rounded-lg shadow overflow-hidden">
            <div className="lg:grid">
              <div className="lg:col-span-9 flex justify-center align-middle">
                <div className="py-6 px-4 sm:p-6 lg:pb-8">
                  <div className="mt-6 grid grid-cols-12 gap-6">
                    <div className="col-span-12 sm:col-span-6">
                      <label
                        htmlFor="headline"
                        className="block text-sm font-medium text-gray-700 dark:text-white"
                      >
                        Headline (20 char.)
                      </label>
                      <input
                        type="text"
                        name="headline"
                        id="headline"
                        maxLength={20}
                        value={headline}
                        onChange={(e) => setHeadline(e.target.value)}
                        className="mt-1 block w-[420px] border border-gray-300 dark:border-[#242424] dark:bg-[#161616] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                      />
                    </div>
                    <div className="col-span-12 sm:col-span-6">
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 dark:text-white"
                      >
                        Message (40 char.)
                      </label>
                      <input
                        type="text"
                        name="message"
                        id="message"
                        maxLength={40}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="mt-1 block w-[420px] border border-gray-300 dark:border-[#242424] dark:bg-[#161616] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                      />
                    </div>
                    <div className="col-span-12 sm:col-span-6">
                      <label
                        htmlFor="link"
                        className="block text-sm font-medium text-gray-700 dark:text-white"
                      >
                        Link (Full link)
                      </label>
                      <input
                        type="text"
                        name="link"
                        id="link"
                        maxLength={120}
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        className="mt-1 block w-[420px] border border-gray-300 dark:border-[#242424] dark:bg-[#161616] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                      />
                    </div>
                    <div className="col-span-12 sm:col-span-6">
                      <label
                        htmlFor="linktext"
                        className="block text-sm font-medium text-gray-700 dark:text-white"
                      >
                        Link Text (15 char.)
                      </label>
                      <input
                        type="text"
                        name="linktext"
                        id="linktext"
                        maxLength={40}
                        value={linkText}
                        onChange={(e) => setLinkText(e.target.value)}
                        className="mt-1 block w-[420px] border border-gray-300 dark:border-[#242424] dark:bg-[#161616] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                      />
                    </div>
                      
                      <Switch.Group as="li" className="py-4 flex flex-wrap">
                          <div className="flex flex-col">
                            <Switch.Label
                              as="p"
                              className="text-sm font-medium text-gray-900 dark:text-white"
                              passive
                            >
                              Visible
                            </Switch.Label>
                          </div>
                          <Switch
                            checked={alertVisible}
                            onChange={setAlertVisible}
                            className={classNames(
                              alertVisible ? "bg-teal-500" : "bg-gray-200",
                              "ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                            )}
                          >
                            <span
                              aria-hidden="true"
                              className={classNames(
                                alertVisible ? "translate-x-5" : "translate-x-0",
                                "inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                              )}
                            />
                          </Switch>
                        </Switch.Group>
                  </div>
                  <div className="mt-6">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => router.push("/admin/site/")}
                        className="bg-[#7ea6f5] border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-[#8f5dc2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleSave}
                        className="bg-[#B97EF5] border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-[#8f5dc2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
