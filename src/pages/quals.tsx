import { useEffect, useState } from "react";
import React from "react";
import Header from "@comp/Meta/Title";
import PageHeader from "@comp/UI/General/PageHeader";
import { Tabs } from "flowbite-react";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import H3 from "@comp/UI/General/H3";

interface Score {
  Map: string;
  Username: string;
  WeightedScore: number;
  WeightedAcc: number;
}

interface Player {
  scores: any[];
  totalScore: number;
  totalAcc: number;
  count: number;
  mapsPlayed: Record<string, boolean>;
}

interface MapCount {
  [key: string]: number;
}

function getOverallStandings(quals: { scores: Score[] }[]) {
  // Create an object to store the players' scores and accuracies across all maps
  const players: Record<string, Player> = {};
  const maps: MapCount = {};
  let mapCount = 0;

  // Loop through the quals array and keep track of each unique map
  quals.forEach((qual: { scores: any[] }) => {
    qual.scores.forEach((score: any) => {
      const { Map, Username, WeightedScore, WeightedAcc } = score;
      if (!players[Username]) {
        players[Username] = {
          scores: [],
          totalScore: 0,
          totalAcc: 0,
          count: 0,
          mapsPlayed: {},
        };
      }
      players[Username].scores.push(score);
      players[Username].totalScore += WeightedScore;
      players[Username].totalAcc += WeightedAcc;
      players[Username].count++;

      // Keep track of each unique map and how many times it appears in the quals array
      if (!maps[Map]) {
        maps[Map] = 1;
        mapCount++;
      } else {
        maps[Map]++;
      }
      players[Username].mapsPlayed[Map] = true;
    });
  });

  // Calculate the average score and accuracy for each player
  const standings = Object.keys(players).map((username) => {
    const { scores, totalScore, totalAcc, count, mapsPlayed } =
      players[username];
    const mapsNotPlayed = mapCount - Object.keys(mapsPlayed).length;
    const weightedScore =
      mapsNotPlayed > 0 ? totalScore / mapsNotPlayed : totalScore / mapCount;
    const weightedAcc =
      mapsNotPlayed > 0 ? totalAcc / mapsNotPlayed : totalAcc / mapCount;
    return {
      Username: username,
      WeightedScore: weightedScore / quals.length,
      WeightedAcc: weightedAcc / quals.length,
      scores: scores,
    };
  });

  // Sort the players by their average scores in descending order
  standings.sort((a, b) => b.WeightedScore - a.WeightedScore);

  return standings;
}

export default function RulesPage() {
  const [quals, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [url, setUrl] = useState<string>("");
  useEffect(() => {
    fetch(
      `${process.env.PUBLIC_URL}/api/quals/events/42150f85-1d01-4c77-b83c-25ab3a4f6e38/totals`,
      {
        next: { revalidate: 120 },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        setData(json.QualScores);
        setIsLoading(false);
        setUrl(window.location.href);
      });
  }, [isLoading]);

  return (
    <>
      <Header
        title={`Quals`}
        link={url}
        contents={`Quals | The Quals on ${process.env.PUBLIC_NAME}.`}
      />
      <div className="max-w-[1340px] mx-auto pt-10 px-4 sm:px-6 lg:px-8">
        <PageHeader title="Qual-scores" />

        {isLoading ? (
          <>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-black dark:border-white drop-shadow-[0_0_1px_rgba(0,0,0,0.50)] flex justify-center align-middle mt-[15%]"></div>
            </div>
          </>
        ) : (
          <>
            <div className="QualsDiv bg-white dark:bg-[#161616] overflow-hidden shadow rounded-lg divide-y divide-gray-200 transition-all duration-500">
              <div className="px-4 py-5 sm:p-6">
                <Tabs.Group
                  aria-label="Tabs with icons"
                  style="underline"
                  className="dark:text-white dark:gray-900 bg-white dark:bg-[#161616] transition-all duration-500"
                >
                  <Tabs.Item
                    title="Overall Standings"
                    icon={BookOpenIcon}
                    className="transition-all duration-500"
                  >
                    <H3 text="Overall Standings" />
                    <table className="table-auto w-full">
                      <thead className="border-b-[#ffffffa9] border-b-[1px]">
                        <tr>
                          <td className="py-2">Placement</td>
                          <td className="py-2">User</td>
                          <td className="py-2">Score</td>
                          <td className="py-2">ACC</td>
                        </tr>
                      </thead>

                      <tbody>
                        {getOverallStandings(quals).map((score, index) => (
                          <React.Fragment key={index}>
                            <tr className="border-b-[#ffffff1c] border-b-[1px]">
                              <td className="py-2">#{index + 1}</td>
                              <td className="py-2">{score.Username}</td>
                              <td className="py-2">
                                {score.WeightedScore.toFixed(0)}{" "}
                              </td>
                              <td className="py-2">
                                {score.WeightedAcc.toFixed(2)}%{" "}
                              </td>
                            </tr>
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </Tabs.Item>
                  {quals!.map((song: any, index: any) => (
                    <Tabs.Item
                      key={index}
                      title={`Map ${index + 1}`}
                      icon={BookOpenIcon}
                      className="transition-all duration-500"
                    >
                      <H3 text={song.songInfo.songName} />

                      <table className="table-auto w-full">
                        <thead className="border-b-[#ffffffa9] border-b-[1px]">
                          <tr>
                            <td className="py-2">Placement</td>
                            <td className="py-2">User</td>
                            <td className="py-2">
                              Score{" "}
                              <i className="opacity-[0.5]">(Unweighted)</i>
                            </td>
                            <td className="py-2">
                              ACC <i className="opacity-[0.5]">(Unweighted)</i>
                            </td>
                            <td className="py-2">
                              FC <i className="opacity-[0.5]"></i>
                            </td>
                          </tr>
                        </thead>
                        <tbody>
                          {song.scores.map((score: any, index: any) => (
                            <React.Fragment key={index}>
                              <tr className="border-b-[#ffffff1c] border-b-[1px]">
                                <td className="py-2">#{index + 1}</td>
                                <td className="py-2">{score.Username}</td>
                                <td className="py-2">
                                  {score.WeightedScore.toFixed(0)}{" "}
                                  <i className="opacity-[0.5]">{score.Score}</i>
                                </td>
                                <td className="py-2">
                                  {score.WeightedAcc.toFixed(2)}%{" "}
                                  <i className="opacity-[0.5]">
                                    {score.UnweightedAcc.toFixed(2)}%
                                  </i>
                                </td>
                                <td className="py-2">
                                  {score.FullCombo ? (
                                    <span className="text-green-500">
                                      &#x2713;
                                    </span>
                                  ) : (
                                    <span className="text-red-500">
                                      &#x2717;
                                    </span>
                                  )}
                                </td>
                              </tr>
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
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
