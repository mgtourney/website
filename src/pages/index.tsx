import { useState, useEffect } from "react";
import React from "react";
import Header from "@comp/Meta/Title";
import Link from "next/link";
import Image from "next/image";
import { PowerGlitch } from "powerglitch";
import {
  Discord,
  GitHub,
  Twitch,
  Twitter,
} from "@comp/UI/Components/Frontpage/Logos";

let url = "";
export default function Home() {
  const [load, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
    url = window.location.href;
    PowerGlitch.glitch(".Magnesium", {
      playMode: "always",
      createContainers: true,
      hideOverflow: true,
      timing: {
        duration: 4000,
      },
      glitchTimeSpan: {
        start: 0.2,
        end: 0.7,
      },
      shake: false,
      slice: {
        count: 3,
        velocity: 1,
        minHeight: 0.01,
        maxHeight: 0.04,
        hueRotate: false,
      },
      pulse: false,
    });
  }, []);
  return (
    <>
      <Header
        title={`Frontpage`}
        link={url}
        contents={`Frontpage | The Frontpage of ${process.env.NEXT_PUBLIC_NAME}.`}
      />
      <div className="bg-gray-100 pt-16 dark:bg-[#1b1b1b] transition-all duration-500">
        <main>
          <div>
            <div className="relative">
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-200 dark:bg-[#111111] transition-all duration-500" />
              <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
                  <div className="absolute inset-0">
                    <Image
                      width={1920}
                      height={1080}
                      className="h-full w-full object-cover blur-[5px]"
                      src="/assets/images/base/Hero.png"
                      alt="Hero image"
                    />
                    <div className="absolute inset-0 bg-[#7B52A4] mix-blend-multiply" />
                  </div>
                  <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                    <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                      <span className="block text-white">TAKE CONTROL</span>
                      <span className="block text-gray-100">
                        THIS IS{" "}
                        <p className="Magnesium text-[#009FFB] dark:text-[#8190FF] italic text-[6rem]">
                          MAGNESIUM
                        </p>
                      </span>
                    </h1>
                    <p className="mt-6 max-w-lg mx-auto text-center text-xl text-indigo-200 sm:max-w-3xl opacity-[70%]">
                      Bringing new elements to the table.
                    </p>
                    <div className="mt-10 max-w-sm mx-auto flex justify-center">
                      <Link
                        href="/team"
                        className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 sm:px-8"
                      >
                        THE TEAM
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="dark:bg-[#111111] bg-gray-200 transition-all duration-500">
              <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <p className="text-center text-[3rem] font-bold uppercase text-[#009FFB] dark:text-[#008DDE] tracking-wide">
                  FIND US ON
                </p>
                <div className="mt-8 gap-12 flex justify-center">
                  <Link
                    href="https://discord.com/invite/4jSDUA6z6U"
                    target={"_blank"}
                    className="border-b-[2px] border-spacing-[4px] border-transparent dark:hover:border-[#7289da] hover:drop-shadow-[1px_0px_2px_rgba(0,0,0,0.4)] transition-all duration-500"
                  >
                    <Discord />
                  </Link>
                  <Link
                    href="https://twitter.com/MGTourneyBS"
                    target={"_blank"}
                    className="border-b-[2px] border-spacing-[4px] border-transparent dark:hover:border-[#1DA1F2] hover:drop-shadow-[1px_0px_2px_rgba(0,0,0,0.4)] transition-all duration-500"
                  >
                    <Twitter />
                  </Link>
                  <Link
                    href="https://www.twitch.tv/mgtourney"
                    target={"_blank"}
                    className="border-b-[2px] border-spacing-[4px] border-transparent dark:hover:border-[#5A3E85] hover:drop-shadow-[1px_0px_2px_rgba(0,0,0,0.4)] transition-all duration-500"
                  >
                    <Twitch />
                  </Link>
                  <Link
                    href="https://github.com/mgtourney"
                    target={"_blank"}
                    className="border-b-[2px] border-spacing-[4px] border-transparent dark:hover:border-[#24292f] hover:drop-shadow-[1px_0px_2px_rgba(0,0,0,0.4)] transition-all duration-500"
                  >
                    <GitHub />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
