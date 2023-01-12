import moment from "moment";
import { GridCard, GridComingSoonCard, GridSkeleton } from "./GridCard";
import { APICalendarEvent } from "@lib/types/calendar";
import { classNames } from "@calu/Classes";
import { useState } from "react";

interface GridViewProps {
  isLoading: boolean;
  isError: boolean;
  data: APICalendarEvent[];
  months: Array<number>;
  selectedMonth: number;
  setSelectedMonth: Function;
  setSelectedYear: Function;
  selectedYear: number;
  filters: {
    [key: string]: boolean;
  };
  noneSelected: boolean;
}

export function GridView(props: GridViewProps) {
  const {
    isLoading,
    isError,
    data,
    months,
    selectedMonth,
    setSelectedMonth,
    setSelectedYear,
    selectedYear,
    filters,
    noneSelected,
  } = props;
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const nextYear = currentYear + 1;
  const lastYear = currentYear - 1;

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const year = e.target.value;

    setYear(parseInt(year));
  };

  const handleClick = (url: string): void => {
    window.open(url, "_blank");
  };

  return (
    <div>
      <>
        {!isError && (
          <div className="flex items-start">
            <div className="relative mr-4 sm:mr-12 lg:mr-22">
              <select
                className="CalendarDropdown border-[#0000] bg-[#0000] text-gray-900 ml-[-15px] dark:text-white font-medium focus:outline-none focus:ring-[#0000] focus:border-[#0000]"
                defaultValue={currentYear}
                onChange={handleYearChange}
                onClick={() => {
                  setSelectedYear(year);
                }}
              >
                <option className="text-black" value={lastYear}>
                  {lastYear}
                </option>
                <option className="text-black" value={currentYear}>
                  {currentYear}
                </option>
                <option className="text-black" value={nextYear}>
                  {nextYear}
                </option>
              </select>
              <div
                className="absolute inset-0 my-6 ml-[4.5rem] pointer-events-none -z-1"
                aria-hidden="true"
              >
                <div className="absolute inset-0 w-0.5 h-full bg-gray-300"></div>
              </div>
              {months.map((month, key) => {
                return (
                  <button
                    key={key}
                    className={classNames(
                      `${
                        selectedMonth === month
                          ? "text-pink-600 dark:text-white ml-[-1rem]"
                          : "text-slate-900"
                      }`,
                      "flex items-center dark:text-white hover:text-pink-600 justify-between font-medium text-slate-700 w-20 py-3 mr-1 text-left"
                    )}
                    onClick={() => setSelectedMonth(month)}
                  >
                    <span className="flex ">
                      {moment(new Date(2022, month, 1)).format("MMM")}
                    </span>
                    <span
                      className={classNames(
                        `${
                          selectedMonth === month
                            ? "bg-pink-600"
                            : "bg-slate-600"
                        }`,
                        "z-0 block w-3.5 h-3.5 border-2 border-white rounded-full text-white"
                      )}
                    ></span>
                  </button>
                );
              })}
            </div>

            {!isLoading && !noneSelected && (
              <>
                {months.map((month, key) => {
                  return (
                    <div
                      key={key}
                      className={`flex-grow ${
                        selectedMonth !== month && "hidden"
                      }`}
                    >
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-4">
                        {data &&
                          data
                            .filter(({ startDate, endDate }) => {
                              const startMonth = new Date(startDate).getMonth();
                              const endMonth = new Date(endDate).getMonth();
                              const startYear = new Date(
                                startDate
                              ).getFullYear();
                              const endYear = new Date(endDate).getFullYear();
                              return (
                                (startMonth === month &&
                                  startYear === selectedYear) ||
                                (endMonth === month && endYear === selectedYear)
                              );
                            })
                            .filter(({ eventType }) => filters[eventType])
                            .map((event, key) => (
                              <GridCard key={key} {...{ event, handleClick }} />
                            ))}

                        {data.filter(({ startDate, endDate }) => {
                          const startMonth = new Date(startDate).getMonth();
                          const endMonth = new Date(endDate).getMonth();
                          const startYear = new Date(startDate).getFullYear();
                          const endYear = new Date(endDate).getFullYear();
                          return (
                            (startMonth === month &&
                              startYear === selectedYear) ||
                            (endMonth === month && endYear === selectedYear)
                          );
                        }).length === 0 && <GridComingSoonCard />}
                      </div>
                    </div>
                  );
                })}
              </>
            )}
            {isLoading && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-4 w-full">
                {[1].map((key) => (
                  <GridSkeleton key={key} />
                ))}
              </div>
            )}

            {!isLoading && noneSelected && (
              <div className="relative block w-full bg-slate-50 opacity-80 border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                <i className="fas fa-grip-horizontal fa-4x text-slate-700"></i>
                <span className="mt-2 block text-sm font-medium text-gray-900">
                  Select a filter <i className="fas fa-filter"></i> to see
                  events
                </span>
              </div>
            )}
          </div>
        )}
      </>
      {isError && (
        <div className="relative block w-full bg-slate-50 opacity-80 border-2 border-pink-500 border-dashed rounded-lg p-12 text-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
          <i className="fas fa-exclamation-circle fa-4x text-pink-700"></i>
          <span className="mt-2 block text-sm font-medium text-pink-900">
            Error loading calendar events
          </span>
        </div>
      )}
    </div>
  );
}
