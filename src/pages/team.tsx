import { useState, useEffect } from "react";
import React from "react";
import Header from "@comp/Meta/Title";
import StaffPanel from "@comp/Staff/StaffPanel";
import PageHeader from "@comp/UI/General/PageHeader";
import type { StaffTeam } from "@lib/types/staffTeam";

export default function Team() {
  const [team, setTeam] = useState<StaffTeam[]>([]);
  const [load, setLoad] = useState<boolean>(true);
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    fetch(
      `https://raw.githubusercontent.com/mgtourney/website/team/data/team.json`
    )
      .then((res) => res.json())
      .then((data) => {
        setTeam(data.Members);
        setLoad(false);
        setUrl(window.location.href);
      });
    {
      setTimeout(() => {
        !load &&
          document
            .querySelector(".teamDiv")!
            .classList.add("translate-y-[10px]");
        document.querySelector(".teamDiv")!.classList.remove("opacity-0");
      }, 150);
    }
  }, [load]);

  return (
    <>
      <Header
        title={`Team`}
        link={url}
        contents={`Team | The Staffteam on ${process.env.NEXT_PUBLIC_NAME}.`}
      />
      <div className="max-w-[1340px] mx-auto pt-10 px-4 sm:px-6 lg:px-8">
        <PageHeader title="TEAM" />
        <div className="teamDiv opacity-0 transition-all duration-500">
          {team.map((item, index) => (
            <React.Fragment key={index}>
              {Object.keys(item).map((key) => (
                <StaffPanel key={key} title={key} staffMembers={item[key]} />
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
}
