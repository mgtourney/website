import { useState, useEffect } from "react";
import React from "react";
import Header from "@comp/Meta/Title";
import PageHeader from "@comp/UI/General/PageHeader";
import { Success, Error } from "@comp/UI/General/Notifiers";

export default function Team() {
  const [url, setUrl] = useState<string>("");
  const [id1, setId1] = useState<string>("");
  const [id2, setId2] = useState<string>("");

  useEffect(() => {
    setUrl(window.location.href);
    setTimeout(() => {
      document
        .querySelector(".qualsCheckDiv")!
        .classList.add("translate-y-[10px]");
      document.querySelector(".qualsCheckDiv")!.classList.remove("opacity-0");
    }, 150);
  }, []);

  async function handleCheck() {
    try {
      const skillSaberRes1 = await fetch(
        `https://skillsaber.vercel.app/api/player?id=${id1}`
      );
      const skillSaberData1 = await skillSaberRes1.json();
      const skillSaberRes2 = await fetch(
        `https://skillsaber.vercel.app/api/player?id=${id2}`
      );
      const skillSaberData2 = await skillSaberRes2.json();

      if (skillSaberData1.errorMessage) {
        return Error({ text: "Control Player 1 ID" });
      }
      if (skillSaberData2.errorMessage) {
        return Error({ text: "Control Player 2 ID" });
      }
      if (skillSaberData1.rank + skillSaberData2.rank <= 500) {
        return Error({
          text: `<b>${skillSaberData1.name}</b></br> <b>${skillSaberData2.name}</b><br> Exceeds the limit by: <br> <b>${ 500 - (skillSaberData1.rank + skillSaberData2.rank)}</b> ranks!`,
        });
      } else {
        return Success({
          text: `<b>${skillSaberData1.name}</b></br> <b>${skillSaberData2.name}</b><br> can team up!`,
        });
      }

    } catch (error) {
      return Error({ text: "Control the ScoreSaber IDs" });
    }
  }

  return (
    <>
      <Header
        title={`Rank checker`}
        link={url}
        contents={`Rank checker | The Rank-check on ${process.env.PUBLIC_NAME}.`}
      />
      <div className="max-w-[1340px] mx-auto pt-10 px-4 sm:px-6 lg:px-8">
        <PageHeader title="RANK CHECK" />
        <>
          <div className="qualsCheckDiv bg-white dark:bg-[#161616] pb-1rem overflow-hidden shadow rounded-lg divide-y-2 divide-gray-200 dark:divide-[#292929] transition-all opacity-0">
            <div className="px-4 py-5 sm:px-6">
              <p className="rulesInfoHeader">Rank checker</p>
              <p className="text-gray-900 dark:text-white text-[18px] mt-2">
                Check to see, if you&apos;re allowed to team up with a specific player!
              </p>
            </div>
            <header className="relative z-20 flex items-center justify-center border-gray-200 py-4 px-6 lg:flex-none">
              <div className="container min-h-[300px] max-w-[300px]">
                <div className="mt-6">
                  <div className="col-span-12 sm:col-span-6">
                    <label
                      htmlFor="scoresaber-id1"
                      className="block text-sm font-medium text-gray-700 dark:text-white"
                    >
                      ScoreSaber ID for Player 1
                    </label>
                    <input
                      type="number"
                      name="scoresaber-id1"
                      id="scoresaber-id1"
                      onChange={(e) => setId1(e.target.value)}
                      className="mt-1 block w-full border border-gray-300 dark:border-[#242424] dark:bg-[#161616] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                    />
                  </div>
                  
                  <div className="col-span-12 sm:col-span-6">
                  <label
                    htmlFor="scoresaber-id2"
                    className="block text-sm font-medium text-gray-700 dark:text-white"
                  >
                    ScoreSaber ID for Player 2
                  </label>
                  <input
                    type="number"
                    name="scoresaber-id2"
                    id="scoresaber-id2"
                    onChange={(e) => setId2(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 dark:border-[#242424] dark:bg-[#161616] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                  />
                  </div>
                <div className="flex justify-end mt-5">
                  <button
                  onClick={handleCheck}
                    className="bg-[#B97EF5] border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-[#8f5dc2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                  >
                    Check!
                  </button>
                </div>
              </div>
          </div>
        </header>
      </div>
    </>
      </div >
    </>
  );
}
