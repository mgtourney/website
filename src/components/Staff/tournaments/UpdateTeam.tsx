import { useEffect, useState } from "react";
import { User } from "@lib/types/users";
import { Success, Error } from "@comp/UI/General/Notifiers";
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import router from "next/router";


export default function TeamSettingsPage({
  session,
  teamData,
}: {
  session: User;
  teamData: any;
}) {
  const [teamName, setTeamName] = useState<string>(teamData.name);
  const [teamImage, setTeamImage] = useState<string>(teamData.image);
  const [p1, setP1] = useState<string>(teamData.players[0]);
  const [p2, setP2] = useState<string>(teamData.players[1]);

  async function handleDeletion() {
    Confirm.show(
      'Delete Team',
      'Are you sure you want to delete this team?',
      'Yes',
      'No',
      deleteTeam
    );
  }

  async function deleteTeam() {
    try {
      const apiDeleteRes = await fetch(
        `${process.env.PUBLIC_URL}/api/tourneys/${teamData.tournamentid}/team/${teamData.teamid}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const apiDeleteData = await apiDeleteRes.json();
      if (apiDeleteData.error) {
        return Error({ text: apiDeleteData.error.message });
      } else {
        router.push(`/admin/tourneys/${teamData.tournamentid}`);
        return Success({ text: "Team got deleted!" });
      }
    } catch (error) {
      return Error({ text: "Something went wrong." });
    }
  }

  async function handleSave() {
    if (teamName.length < 3) return Error({ text: "Teamname is too short." });
    if (teamImage.length < 3)
      return Error({ text: "Please provide a teamimage." });
    if (p1 == p2) return Error({ text: "A team need 2 players." });
    try {
      const fetchPlayer = async (id: string) => {
        const res = await fetch(
          `https://skillsaber.vercel.app/api/player?id=${id}`
        );
        const data = await res.json();
        return { data, errorMessage: data.errorMessage };
      };

      await Promise.all([fetchPlayer(p1), fetchPlayer(p2)]);
    } catch (error) {
      return Error({ text: "Control the ScoreSaber IDs." });
    }
    try {
      const apiPatchRes = await fetch(
        `${process.env.PUBLIC_URL}/api/tourneys/${teamData.tournamentid}/team/${teamData.teamid}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            teamname: teamName,
            teamimage: teamImage,
            p1: p1,
            p2: p2,
          }),
        }
      );
      const apiPatchData = await apiPatchRes.json();
      if (apiPatchData.error) {
        return Error({ text: apiPatchData.error.message });
      } else {
        return Success({ text: "Team got updated!" });
      }
    } catch (error) {
      return Error({ text: "Control the ScoreSaber ID" });
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
                  <div>
                    <div className="col-span-12 sm:col-span-6">
                      <label
                        htmlFor="team-name"
                        className="block text-sm font-medium text-gray-700 dark:text-white"
                      >
                        Teamname (Max 32 char.)
                      </label>
                      <input
                        type="text"
                        name="team-name"
                        id="team-name"
                        maxLength={32}
                        value={teamName}
                        placeholder="Teamname"
                        onChange={(e) => setTeamName(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 dark:border-[#242424] dark:bg-[#161616] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                      />
                    </div>
                    <div className="mt-5 col-span-12 sm:col-span-6">
                      <label
                        htmlFor="team-image"
                        className="block text-sm font-medium text-gray-700 dark:text-white"
                      >
                        Team Image (Direct link)
                      </label>
                      <input
                        type="text"
                        name="team-image"
                        id="team-image"
                        value={teamImage}
                        placeholder="https://i.imgur.com/X29Xuha.png"
                        onChange={(e) => setTeamImage(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 dark:border-[#242424] dark:bg-[#161616] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-12 gap-6">
                    <div className="col-span-12 sm:col-span-6">
                      <label
                        htmlFor="player1"
                        className="block text-sm font-medium text-gray-700 dark:text-white"
                      >
                        Player 1 SSID
                      </label>
                      <input
                        type="number"
                        name="player1"
                        id="player1"
                        placeholder="76561198086326146"
                        value={p1}
                        onChange={(e) => setP1(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 dark:border-[#242424] dark:bg-[#161616] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-12 sm:col-span-6">
                      <label
                        htmlFor="player2"
                        className="block text-sm font-medium text-gray-700 dark:text-white"
                      >
                        Player 2 SSID
                      </label>
                      <input
                        type="number"
                        name="player2"
                        id="player2"
                        placeholder="76561198086326146"
                        value={p2}
                        onChange={(e) => setP2(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 dark:border-[#242424] dark:bg-[#161616] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="flex gap-2 justify-between">

                      <button
                        onClick={handleSave}
                        className="bg-[#B97EF5] border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-[#8f5dc2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleDeletion}
                        className="bg-[#8d1a1a] border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-[#8f5dc2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                      >
                        Delete Team
                      </button>
                      <button
                        onClick={() =>
                          router.push(
                            `/admin/tourneys/${teamData.tournamentid}/`
                          )
                        }
                        className="bg-[#7ea6f5] border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-[#8f5dc2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                      >
                        Back
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
