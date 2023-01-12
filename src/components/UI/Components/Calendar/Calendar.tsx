import { useState, useMemo } from "react";
import { FilterMenu, GridView } from "./Comps";
import { APICalendarEvent } from "@lib/types/calendar";

interface CalendarProps {
  isLoading: boolean;
  isError: boolean;
  data: APICalendarEvent[];
}

export default function Calendar(props: CalendarProps) {
  const { isLoading, isError, data } = props;

  const [selectedMenuFilter, setSelectedMenuFilter] = useState(false);
  const [noneSelected, setNoneSelected] = useState(false);
  const [filters, setFilters] = useState({});
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const allMonths = Array.from({ length: 12 }, (_, i) => i);
  const months = allMonths;
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  useMemo(() => {
    if (data) {
      const availableTypes = data.reduce((types, { eventType }) => {
        return {
          ...types,
          [eventType]: true,
        };
      }, {});
      setFilters(availableTypes);
    }
  }, [data]);

  return (
    <div className="max-w-4xl mt-10 mx-6 sm:mx-auto">
      <div className="relative inline-flex w-full mb-12">
        <div className="absolute left-0">
          <div className="relative inline-flex">
            <FilterMenu
              {...{
                filters,
                selectedMenuFilter,
                setSelectedMenuFilter,
                setFilters,
                setNoneSelected,
              }}
            />
          </div>
        </div>
      </div>
      <GridView
        {...{
          isLoading,
          isError,
          data,
          months,
          filters,
          selectedMonth,
          setSelectedMonth,
          setSelectedYear,
          selectedYear,
          noneSelected,
        }}
      />
    </div>
  );
}
