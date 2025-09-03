import React, { useState } from "react";
import { Listbox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Divide, X } from "lucide-react";
import { Product, SortOption } from "@/components/FilterProducts";
import SlideFilterButton from "@/components/Buttons/SlideFilterButton";
import ProductGrid from "@/components/ProductGrid";

interface LeftSectionProps {
  setSelectedSort: (sort: SortOption | null) => void;
  setSelectedFilterOptions: React.Dispatch<React.SetStateAction<string[]>>;
  selectedFilterOptions: string[];
  products: Product[];
  sortProducts: Product[];
  selectedSort: SortOption | null;
  sortOptions: SortOption[];
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TopSection: React.FC<LeftSectionProps> = ({
  setSelectedSort,
  setSelectedFilterOptions,
  selectedFilterOptions,
  products,
  sortProducts,
  selectedSort,
  sortOptions,
  open,
  setOpen,
}) => {
  return (
    <div className="relative z-0">
      <div className=" flex justify-between items-center mb-4">
        <div className="w-full">
          <div className="flex items-center justify-between px-3">
            <div className="text-black opacity-50 text-semibold text-lg mb-4">
              Total Products : {sortProducts.length}
            </div>
            <div className="lg:hidden flex justify-end">
              <SlideFilterButton open={open} setOpen={setOpen} />
            </div>
            <div className=" z-20 bg-gray-200 px-3 py-1 rounded-md items-center lg:flex hidden">
              <span className="opacity-80 mr-2">Sort by :</span>
              <Listbox
                value={selectedSort}
                onChange={(option) => {
                  setSelectedSort(option);
                  if (option) {
                    option.action();
                  }
                }}
              >
                <div className="relative w-60">
                  <Listbox.Button className="relative w-full cursor-pointer rounded-md bg-none font-semibold py-1.5 pl-3 pr-10 text-left focus:outline-none">
                    <span className="block truncate">
                      {(selectedSort ?? sortOptions[0]).label}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
                    </span>
                  </Listbox.Button>
                  <Listbox.Options
                    className="absolute mt-1.5 border-none max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg focus:outline-none z-50"
                    modal={false}
                  >
                    {sortOptions.map((option) => (
                      <Listbox.Option
                        key={option.id}
                        value={option}
                        className={({ active }) =>
                          `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                            active
                              ? "bg-blue-100 text-blue-900"
                              : "text-gray-900"
                          }`
                        }
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {option.label}
                            </span>
                            {selected && (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                <CheckIcon className="h-5 w-5" />
                              </span>
                            )}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>
          </div>
          <div className="px-3">
            {selectedFilterOptions.length > 0 && (
              <div className="text-sm opacity-60 -mt-3 ">
                Selected Filters:
                <div className="flex items-center gap-2 w-[100%] flex-wrap mt-1">
                  {selectedFilterOptions.map((option) => (
                    <span
                      key={option}
                      className="p-1 px-2 bg-gray-300 rounded-md text-gray-800  flex items-center w-fit"
                    >
                      {option}
                      <span
                        className="ml-1 cursor-pointer"
                        onClick={() => {
                          setSelectedFilterOptions((prev) =>
                            prev.filter((item) => item !== option)
                          );
                        }}
                      >
                        <X className="h-4 w-5" strokeWidth={2} aria-hidden />
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <ProductGrid products={sortProducts} />
    </div>
  );
};

export default TopSection;
