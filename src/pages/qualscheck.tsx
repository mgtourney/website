import { useState, useEffect } from "react";
import React from "react";
import Header from "@comp/Meta/Title";
import PageHeader from "@comp/UI/General/PageHeader";
import Image from "next/image";

const rankNumber: number = 500;

export default function Team() {
  const [url, setUrl] = useState<string>("");
  const [id1, setId1] = useState<string>("");
  const [id2, setId2] = useState<string>("");
  const [names, setNames] = useState<string[]>(["", ""]);
  const [ranks, setRanks] = useState<number[]>([0, 0]);
  const [eligible, setEligible] = useState<string>("🔎");
  const [reason, setReason] = useState<string>("");
  const [images, setImages] = useState<string[]>([
    `https://i.imgur.com/C3wtwlJ.png`,
    `https://i.imgur.com/C3wtwlJ.png`,
  ]);

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
      setEligible("🔎");
      setReason("");

      if (!id1 || !id2) {
        setEligible(`❌`);
        setReason(`Control empty IDs!`);
        return;
      }

      if (id1 === id2) {
        setEligible(`❌`);
        setReason(`Can't go solo!`);
        return;
      }

      setEligible("⌛");
      setReason("");

      const fetchPlayer = async (id: string) => {
        const res = await fetch(
          `https://skillsaber.vercel.app/api/player?id=${id}`
        );
        const data = await res.json();
        return { data, errorMessage: data.errorMessage };
      };

      const [player1, player2] = await Promise.all([
        fetchPlayer(id1),
        fetchPlayer(id2),
      ]);

      setImages([player1.data.profilePicture, player2.data.profilePicture]);
      setNames([player1.data.name, player2.data.name]);
      setRanks([player1.data.rank, player2.data.rank]);

      if (player1.errorMessage) {
        setEligible(`❌`);
        setReason(`Control ID 1`);
        return;
      }
      if (player2.errorMessage) {
        setEligible(`❌`);
        setReason(`Control ID 2`);
        return;
      }
      if (player1.data.rank <= 50) {
        setEligible(`❌`);
        setReason(`Player 1 is inside top 50!`);
        return;
      }
      if (player2.data.rank <= 50) {
        setEligible(`❌`);
        setReason(`Player 1 is inside top 50!`);
        return;
      }
      if (player1.data.rank + player2.data.rank <= rankNumber) {
        setEligible(`❌`);
        setReason(
          `Exceeds by ${
            rankNumber - (player1.data.rank + player2.data.rank)
          } ranks!`
        );
        return;
      }
      setEligible(`✔️`);
      setReason(`You can team up!`);
    } catch (error) {
      console.log(error);
      setEligible("❌");
      setReason("Control IDs");
    }
  }

  return (
    <>
      <Header
        title={`Rank checker`}
        link={url}
        contents={`Rank checker | The Rank-check on ${process.env.PUBLIC_NAME}.`}
      />
      <div className="max-w-[1340px] mx-auto pt-10 px-4 sm:px-6 lg:px-8 pb-10">
        <PageHeader title="RANK CHECK" />
        <>
          <div className="qualsCheckDiv bg-white dark:bg-[#161616] pb-1rem overflow-hidden shadow rounded-lg divide-y-2 divide-gray-200 dark:divide-[#292929] transition-all opacity-0">
            <div className="px-4 py-5 sm:px-6">
              <p className="rulesInfoHeader">Rank checker</p>
              <p className="text-gray-900 dark:text-white text-[18px] mt-2">
                Check to see, if you&apos;re allowed to team up with a specific
                player!
              </p>
            </div>
            <header className="relative z-20 flex flex-wrap items-end justify-center border-gray-200 py-4 px-6 lg:flex-none">
              <div className="container flex justify-center gap-[100px] mt-6 py-10 rounded-md dark:bg-[#1d1d1d]">
                <div className="player1 flex flex-col items-center">
                  <Image
                    src={images[0]}
                    width={138}
                    height={138}
                    className="h-[138px] w-[138px] rounded-full mb-2 drop-shadow-[1px_0px_2px_rgba(0,0,0,0.2)]"
                    alt={""}
                  />
                  <p className="min-h-[40px] text-black dark:text-white">
                    {names[0] || "Name"}
                  </p>
                  <p className="min-h-[26px] text-black dark:text-white">
                    #{ranks[0] || "Rank"}
                  </p>
                  <div className="pt-5 col-span-12 sm:col-span-6">
                    <input
                      type="number"
                      name="scoresaber-id1"
                      id="scoresaber-id1"
                      placeholder="76561198347791418"
                      onChange={(e) => setId1(e.target.value)}
                      className="mt-1 block w-full border border-gray-300 dark:border-[#242424] dark:bg-[#161616] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-end items-center gap-10 w-[220px]">
                  <div className="flex items-center flex-col">
                    <p className="text-[32px]">{eligible}</p>
                    <p className="text-[32px] text-center">{reason}</p>
                  </div>
                  <button
                    onClick={handleCheck}
                    className="bg-[#B97EF5] h-[40px] border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-[#8f5dc2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                  >
                    Check!
                  </button>
                </div>
                <div className="player2 flex flex-col items-center">
                  <Image
                    src={images[1]}
                    width={138}
                    height={138}
                    className="h-[138px] w-[138px] rounded-full mb-2 drop-shadow-[1px_0px_2px_rgba(0,0,0,0.2)]"
                    alt={""}
                  />
                  <p className="min-h-[40px] text-black dark:text-white">
                    {names[1] || "Name"}
                  </p>
                  <p className="min-h-[26px] text-black dark:text-white">
                    #{ranks[1] || "Rank"}
                  </p>
                  <div className="pt-5 col-span-12 sm:col-span-6">
                    <input
                      type="number"
                      name="scoresaber-id2"
                      id="scoresaber-id2"
                      placeholder="76561199253219625"
                      onChange={(e) => setId2(e.target.value)}
                      className="mt-1 block w-full border border-gray-300 dark:border-[#242424] dark:bg-[#161616] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </header>
          </div>
        </>
      </div>
    </>
  );
}
