import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import { User } from "@lib/types/users";
import { Success, Error } from "@comp/UI/General/Notifiers";

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
  const [scoreSaberID, setScoreSaberID] = useState(scoreSab[0] || 0);
  const [userRoles, setUserRoles] = useState<any>(
    JSON.parse(userData.roles) || []
  );
  const [roles, setRoles] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState<any>(
    userData.permissions || 0
  );
  const [pronouns, setPronouns] = useState<number>(userData.pronouns || 0);
  const [isBanned, setIsBanned] = useState(false);
  const [twitch, setTwitch] = useState(userData.twitch || "");
  const [twitter, setTwitter] = useState(userData.twitter || "");
  const [skillSaberData, setSkillSaberData] = useState<any>([]);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/api/staff/roles`)
      .then((res) => res.json())
      .then((data) => {
        setRoles(data);
      });
  }, []);

  async function handleSave() {

    try {
      const skillSaberRes = await fetch(`https://skillsaber.vercel.app/api/player?id=${scoreSaberID}`);

      if (skillSaberData.errorMessage) {
        return Error({ text: "Control the ScoreSaber ID" });
      }

      setSkillSaberData(await skillSaberRes.json());

    } catch (error) {
      return Error({ text: "Control the ScoreSaber ID" });
    }

    const apiPatchRes = await fetch(`${process.env.PUBLIC_URL}/api/staff/user/${userData.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userData?.id,
        scoresaberdata: JSON.stringify([
          scoreSaberID,
          skillSaberData.countryRank,
          skillSaberData.rank,
          skillSaberData.country,
        ]),
        permissions: selectedPermissions,
        pronouns: pronouns,
        roles: (`["${userRoles}"]`),
        twitter: twitter,
        twitch: twitch,
        banned: isBanned,
      }),
    })
    const apiPatchData = await apiPatchRes.json();
    if (apiPatchData.error) {
      return Error({ text: apiPatchData.error.message });
    } else {
      return Success({ text: "Settings got saved!" });
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

                    {/* {userData?.id !== session.id && (  )}*/}
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
                          onChange={(e) => setUserRoles(e.target.value)}
                          className="mt-1 block w-full border border-gray-300 dark:border-[#242424] dark:bg-[#161616] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                        />
                      </div>
                    </>
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
