import { useState } from "react";
import { User } from "@lib/types/users";
import { Notify } from "notiflix/build/notiflix-notify-aio";

export default function SettingsPage({
  userData,
}: {
  session: User;
  userData: User | any;
}) {
  const scoreSab = JSON.parse(userData?.scoresaberdata);
  const [scoreSaberID, setScoreSaberID] = useState(scoreSab[0]);
  const [pronouns, setPronouns] = useState<number>(userData?.pronouns);
  const [twitch, setTwitch] = useState(userData?.twitch);
  const [twitter, setTwitter] = useState(userData?.twitter);
  const [idSet, setIdSet] = useState(false);

  const handleSave = async () => {
    await fetch(`${process.env.PUBLIC_URL}/api/user/list`)
      .then((res) => res.json())
      .then((data) => {
        if (scoreSaberID !== scoreSab[0]) {
          if (data.list.includes(scoreSaberID)) {
            return Notify.failure("This ScoreSaber ID is already in use!", {
              position: "right-bottom",
              timeout: 5000,
              clickToClose: true,
            });
          }
        }
        fetch(`https://skillsaber.vercel.app/api/player?id=${scoreSaberID}`, {
          method: "GET",
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
              fetch(`${process.env.PUBLIC_URL}/api/user/${userData.id}`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  userId: userData?.id,
                  scoresaberdata: JSON.stringify([
                    scoreSaberID,
                    data.countryRank,
                    data.rank,
                    data.country,
                  ]),
                  pronouns: pronouns,
                  twitter: twitter,
                  twitch: twitch,
                }),
              })
                .then((res) => res.json())
                .then((data) => {
                  if (data.error) {
                    Notify.failure(data.error.message, {
                      position: "right-bottom",
                      timeout: 5000,
                      clickToClose: true,
                    });
                  } else {
                    setIdSet(true);
                    Notify.success("Settings got saved!", {
                      position: "right-bottom",
                      timeout: 5000,
                      clickToClose: true,
                    });
                  }
                });
            }
          });
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
                    {(scoreSab[0] === "0" && !idSet) && (
                      <div className="ssIDDiv col-span-12 sm:col-span-6">
                        <label
                          htmlFor="scoresaber-id"
                          className="block text-sm font-medium text-gray-700 dark:text-white"
                        >
                          ScoreSaber ID
                        </label>
                        <input
                          type="number"
                          name="scoresaber-id"
                          id="scoresaber-id"
                          placeholder={scoreSaberID}
                          onChange={(e) => setScoreSaberID(e.target.value)}
                          className="ssIDField mt-1 block w-full border border-gray-300 dark:border-[#242424] dark:bg-[#161616] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                        />
                      </div>
                    )}
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
