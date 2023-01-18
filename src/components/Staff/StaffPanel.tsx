import DividerCenter from "@comp/UI/General/DividerCenter";
import type { StaffTeam } from "@lib/types/staffTeam";
import Icon from "@comp/Staff/Icon";
import React from "react";
import Image from "next/image";

export let staffTeam: StaffTeam[];

export default function StaffPanel({
  title,
  staffMembers,
}: {
  title: string;
  staffMembers: any;
}) {
  return (
    <>
      <DividerCenter text={title} />
      <div className="mt-5">
        <div className="staffPanel">
          <>
            {staffMembers.length === 0 ? (
              <div className="flex justify-center text-xl italic opacity-[25%] text-black dark:text-gray-50">
                Nobody have this role yet
              </div>
            ) : (
              staffMembers.map(
                (
                  item: {
                    Name: String;
                    Image: String;
                    ScoreSaberID: String;
                    Roles: String[];
                    ScoreSaber: String;
                    Discord: String;
                    Twitter: String;
                    Twitch: String;
                  },
                  index: React.Key
                ) => (
                  <React.Fragment key={index}>
                    <div
                      key={index}
                      className="staffCard skew-x-[-10deg] group select-none"
                    >
                      {/* Edit this span, to edit the hover-effect when hovering the staffCard. Remember to use group-hover: <3 */}
                      <span className="staffCard h-[120px] absolute group-hover:animate-pulse dark:group-hover:bg-[#3C416B] group-hover:bg-[#ffffff00]" />
                      <Image
                        width={124}
                        height={124}
                        unoptimized={true}
                        alt="PFP"
                        placeholder="empty"
                        className="staffImage select-none skew-x-[10deg]"
                        src={`/assets/images/users/${item.Image}`}
                      />
                      <div className="flex flex-col -ml-[60px] pt-3 min-w-[220px] items-start">
                        <span className="text-[#008DDE] text-[22px] font-semibold dark:text-slate-200 z-10 hover:cursor-default">
                          {item.Name}
                        </span>
                        <span className="text-black opacity-[50%] text-sm font-medium dark:text-white dark:opacity-[40%] italic z-10 hover:cursor-default skew-x-[20deg]">
                          {item.Roles.map((role: String, index: React.Key) => (
                            <React.Fragment key={index}>
                              {role}
                              {index! < item.Roles.length - 1 ? ", " : ""}
                            </React.Fragment>
                          ))}
                        </span>
                      </div>
                      <div className="flex content-center -ml-[140px] gap-2 w-[140px] max-w-[140px] skew-x-[10deg]">
                        <Icon
                          path="scoresaber.svg"
                          open={`https://scoresaber.com/u/${item.ScoreSaberID}`}
                          h={24}
                          w={24}
                        />
                        {item.Discord ? (
                          <Icon
                            path="discord.svg"
                            open={`https://discordapp.com/users/${item.Discord}`}
                            h={24}
                            w={24}
                          />
                        ) : (
                          <></>
                        )}{" "}
                        {item.Twitter ? (
                          <Icon
                            path="twitter.svg"
                            open={`https://twitter.com/${item.Twitter}`}
                            h={24}
                            w={24}
                          />
                        ) : (
                          <></>
                        )}{" "}
                        {item.Twitch ? (
                          <Icon
                            path="twitch.svg"
                            open={`https://www.twitch.tv/${item.Twitch}`}
                            h={24}
                            w={22}
                          />
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </React.Fragment>
                )
              )
            )}
          </>
        </div>
      </div>
    </>
  );
}
