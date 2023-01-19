import { useEffect, useState } from "react";
import { Menu } from "@headlessui/react";
import { classNames } from "@calu/Classes";

interface FilerMenuProps {
  filters: {
    [key: string]: boolean;
  };
  selectedMenuFilter: boolean;
  setFilters: Function;
  setSelectedMenuFilter: Function;
  setNoneSelected: Function;
}

export default function FilterMenu({
  filters,
  selectedMenuFilter,
  setFilters,
  setSelectedMenuFilter,
  setNoneSelected,
}: FilerMenuProps) {
  const trueState = Object.keys(filters).reduce(
    (pre, cur) => ({ ...pre, [cur]: true }),
    {}
  );
  const falseState = Object.keys(filters).reduce(
    (pre, cur) => ({ ...pre, [cur]: false }),
    {}
  );
  const [someSelected, setSomeSelected] = useState(false);
  const handleFilterItemClick = async (type: any) => {
    setFilters((state: any) => ({
      ...state,
      [type]: !state[type],
    }));
  };
  const handleSelectAll = () => {
    selectedMenuFilter ? setFilters(trueState) : setFilters(falseState);
    setSelectedMenuFilter(!selectedMenuFilter);
  };

  useEffect(() => {
    const allSelected = Object.values(filters).every((filter) => filter);
    if (allSelected) {
      setSelectedMenuFilter(false);
    }
    setNoneSelected(Object.values(filters).every((filter) => filter === false));

    setSomeSelected(Object.values(filters).some((filter) => !filter));
  }, [filters, setSelectedMenuFilter, setNoneSelected]);

  return (
    <div className="mt-0.5">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button
            className={classNames(
              someSelected
                ? "text-cyan-500 bg-gray-50"
                : "text-gray-500 bg-white hover:bg-gray-50",
              `ml-2 relative inline-flex items-center px-2 py-2 shadow-md 
                      rounded-md border border-gray-300 text-sm focus:outline-none `
            )}
          >
            <span className="sr-only">Filter</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
              />
            </svg>
          </Menu.Button>
        </div>

        <Menu.Items className="z-10 origin-top-right absolute left-2 w-35 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          {Object.keys(filters).map((filterName: string, key: number) => {
            return (
              <Menu.Item key={key}>
                {({ active }) => (
                  <div
                    className={classNames(
                      active ? "bg-gray-100 text-cyan-900" : "text-gray-700",
                      "group flex items-center px-4 py-2 text-sm cursor-pointer"
                    )}
                    onClick={() => handleFilterItemClick(filterName)}
                  >
                    <input
                      type="checkbox"
                      onChange={() => {}}
                      checked={filters[filterName]}
                      className="mr-3 text-cyan-500 focus:ring-cyan-400 focus:ring-opacity-25 border border-gray-300 rounded cursor-pointer"
                    />
                    {`${filterName[0].toUpperCase()}${filterName.slice(1)}`}
                  </div>
                )}
              </Menu.Item>
            );
          })}
          <div className="py-1 border-t border-gray-100">
            <Menu.Item>
              {({ active }) => (
                <div
                  className={classNames(
                    active ? "bg-gray-100 text-fuchsia-700" : "text-gray-700",
                    "group flex items-center px-4 py-2 text-xs cursor-pointer text-center"
                  )}
                  onClick={handleSelectAll}
                >
                  {selectedMenuFilter ? "Select All" : "Deselect All"}
                </div>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Menu>
    </div>
  );
}
