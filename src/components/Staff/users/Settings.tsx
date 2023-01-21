import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import { User } from "@lib/types/users";
import { Notify } from "notiflix/build/notiflix-notify-aio";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function SettingsPage({
  session,
  userData,
}: {
  session: User;
  userData: User | any;
}) {
  const scoreSab = JSON.parse(userData?.scoresaberdata);
  const [scoreSaberID, setScoreSaberID] = useState(scoreSab[0]);
  const [ssLRank, setSSLRank] = useState(scoreSab[1]);
  const [ssGRank, setSSGRank] = useState(scoreSab[2]);
  const [ssCountry, setSSCountry] = useState(scoreSab[3]);
  const [userRoles, setUserRoles] = useState<any>(JSON.parse(userData?.roles));
  const [roles, setRoles] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState<any>(
    userData.permissions
  );
  const [pronouns, setPronouns] = useState<number>(userData?.pronouns);
  const [isBanned, setIsBanned] = useState(false);
  const [twitch, setTwitch] = useState(userData?.twitch);
  const [twitter, setTwitter] = useState(userData?.twitter);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/api/staff/roles`)
      .then((res) => res.json())
      .then((data) => {
        setRoles(data);
      });
  }, [isBanned, selectedPermissions, pronouns, scoreSaberID]);

  const handleSave = () => {
    fetch(`https://scoresaber.com/api/player/${scoreSaberID}/basic`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "MagnesiumTourneys/1.0.0",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errorMessage) {
          Notify.failure("Control the ScoreSaber ID", {
            position: "right-bottom",
            timeout: 5000,
            clickToClose: true,
          });
          return;
        } else {
          setSSLRank(data.countryRank);
          setSSGRank(data.rank);
          setSSCountry(data.country);
          fetch(
            `${process.env.PUBLIC_URL}/api/staff/user/${userData.id}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId: userData?.id,
                scoresaberdata: JSON.stringify([
                  scoreSaberID,
                  ssLRank,
                  ssGRank,
                  ssCountry,
                ]),
                permissions: selectedPermissions,
                pronouns: pronouns,
                roles: JSON.stringify(userRoles),
                twitter: twitter,
                twitch: twitch,
                banned: isBanned,
              }),
            }
          )
            .then((res) => res.json())
            .then((data) => {
              if (data.error) {
                Notify.failure(data.error.message, {
                  position: "right-bottom",
                  timeout: 5000,
                  clickToClose: true,
                });
              } else {
                Notify.success("Settings got saved!", {
                  position: "right-bottom",
                  timeout: 5000,
                  clickToClose: true,
                });
              }
            });
        }
      });
  };

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
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700 dark:text-white"
                      >
                        ScoreSaber ID
                      </label>
                      <input
                        type="number"
                        name="scoresaber-id"
                        id="scoresaber-id"
                        value={scoreSaberID}
                        onChange={(e) => setScoreSaberID(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 dark:border-[#242424] dark:bg-[#161616] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-12 sm:col-span-6">
                      <label
                        htmlFor="pronouns"
                        className="block text-sm font-medium text-gray-700 dark:text-white"
                      >
                        Pronouns
                      </label>
                      <select
                        id="pronouns"
                        name="pronouns"
                        value={Number(pronouns)}
                        onChange={(e) => setPronouns(Number(e.target.value))}
                        className="mt-1 block w-full bg-white border dark:border-[#242424] dark:bg-[#161616] border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                      >
                        <option value={0}>He/Him</option>
                        <option value={1}>She/Her</option>
                        <option value={2}>They/Them</option>
                        <option value={3}>Other</option>
                      </select>
                    </div>

                    {userData?.id !== session.id && (
                      <>
                        <div className="col-span-12 sm:col-span-6">
                          <label
                            htmlFor="role"
                            className="block text-sm font-medium text-gray-700 dark:text-white"
                          >
                            Role
                          </label>
                          <select
                            id="role"
                            name="role"
                            value={Number(selectedPermissions)}
                            onChange={(e) =>
                              setSelectedPermissions(Number(e.target.value))
                            }
                            className="mt-1 block w-full bg-white border dark:border-[#242424] dark:bg-[#161616] border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                          >
                            {roles.map((role: any) => (
                              <option key={role.id} value={role.permission}>
                                {role.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-span-12 sm:col-span-6">
                          <label
                            htmlFor="userRoles"
                            className="block text-sm font-medium text-gray-700 dark:text-white"
                          >
                            Other Roles (Comma seperated)
                          </label>
                          <input
                            type="text"
                            name="userRoles"
                            id="userRoles"
                            value={userRoles}
                            //Onchange, split the string by comma, wrap all strings in quotes and join them with a comma, and put them in the array
                            onChange={(e) => setUserRoles(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 dark:border-[#242424] dark:bg-[#161616] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                          />
                        </div>
                      </>
                    )}
                  </div>
                  <div className="mt-6 grid grid-cols-12 gap-6">
                    <div className="col-span-12 sm:col-span-6">
                      <label
                        htmlFor="twitch"
                        className="block text-sm font-medium text-gray-700 dark:text-white"
                      >
                        Twitch
                      </label>
                      <input
                        type="text"
                        name="twitch"
                        id="twitch"
                        value={twitch}
                        onChange={(e) => setTwitch(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 dark:border-[#242424] dark:bg-[#161616] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-12 sm:col-span-6">
                      <label
                        htmlFor="twitter"
                        className="block text-sm font-medium text-gray-700 dark:text-white"
                      >
                        Twitter
                      </label>
                      <input
                        type="text"
                        name="twitter"
                        id="twitter"
                        value={twitter}
                        onChange={(e) => setTwitter(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 dark:border-[#242424] dark:bg-[#161616] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    {userData?.id !== session.id && (
                      <Switch.Group as="li" className="py-4 flex flex-wrap">
                        <div className="flex flex-col">
                          <Switch.Label
                            as="p"
                            className="text-sm font-medium text-gray-900 dark:text-white"
                            passive
                          >
                            Ban user
                          </Switch.Label>
                          <Switch.Description className="text-sm text-gray-500">
                            Toggle ban.
                          </Switch.Description>
                        </div>
                        <Switch
                          checked={isBanned}
                          onChange={setIsBanned}
                          className={classNames(
                            isBanned ? "bg-teal-500" : "bg-gray-200",
                            "ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className={classNames(
                              isBanned ? "translate-x-5" : "translate-x-0",
                              "inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                            )}
                          />
                        </Switch>
                      </Switch.Group>
                    )}
                    <div className="flex justify-end">
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
