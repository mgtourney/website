import { useEffect, useState, Fragment } from "react";
import React from "react";
import Header from "@comp/Meta/Title";
import PageHeader from "@comp/UI/General/PageHeader";
import Calendar from "@ui/Calendar/Calendar";
import { APICalendarEvent } from "@lib/types/calendar";

export default function Rules() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<APICalendarEvent[]>([]);
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    document.querySelector(".calendarDiv")!.classList.add("translate-y-[5px]");
    document.querySelector(".calendarDiv")!.classList.remove("opacity-0");
    const getEvents = async (): Promise<void> => {
      if (isLoading) {
        const response = await fetch(`/assets/staff/data.json`);
        const { events }: { events: APICalendarEvent[] } =
          await response.json();

        events.forEach((event) => {
          const startDate = new Date(event.startDate);
          const endDate = new Date(event.endDate);
          const currentDate = new Date();
          event.isLive = startDate <= currentDate && currentDate <= endDate;
          event.complete = currentDate > endDate && !event.cancelled;
        });

        events.sort((a, b) => {
          const aDate = new Date(a.startDate).getTime();
          const bDate = new Date(b.startDate).getTime();
          return aDate - bDate;
        });
        setData(events);
      }
    };
    getEvents();
    setIsLoading(false);
    setUrl(window.location.href);
  }, []);

  return (
    <>
      <Header
        title={`Calendar`}
        link={url}
        contents={`Calendar | The Calendar on ${process.env.NEXT_PUBLIC_NAME}.`}
      />
      <div className="max-w-[1340px] mx-auto pt-10 px-4 sm:px-6 lg:px-8">
        <PageHeader title="Calendar" />
        <>
          <div className="calendarDiv bg-white dark:bg-gray-800 pb-1rem overflow-hidden shadow rounded-lg divide-y divide-gray-200 transition-all opcaity-0">
            <div className="px-4 py-5 sm:px-6">
              <p className="rulesInfoHeader">The calendar</p>
              <p className="text-gray-900 dark:text-white text-[18px] mt-2">
                Shows all the events that are happening, will happen or have
                happened.
              </p>
            </div>
            <header className="relative z-20 flex items-center justify-between border-b border-gray-200 py-4 px-6 lg:flex-none">
              <div className="container min-h-[400px]">
                <Calendar
                  {...{
                    data,
                    isLoading,
                    isError,
                  }}
                />
              </div>
            </header>
          </div>
        </>
      </div>
    </>
  );
}
