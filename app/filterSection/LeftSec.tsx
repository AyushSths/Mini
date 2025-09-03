import { Product } from "@/components/FilterProducts";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface LeftSectionProps {
  setSelectedSort: (sort: any) => void;
  setSelectedFilterOptions: React.Dispatch<React.SetStateAction<string[]>>;
  products: Product[];
  starsData: {
    label: string;
    value: number;
    icon: React.ReactNode;
    desc: string;
  }[];
  handleStarRating: (rating: number) => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LeftSec = React.forwardRef<HTMLDivElement, LeftSectionProps>(
  (
    {
      setSelectedSort,
      setSelectedFilterOptions,
      products,
      starsData,
      handleStarRating,
      open,
      setOpen,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={` flex-col justify-start z-10 rounded-l-md  backdrop-blur-3xl border-r-2 bg-opacity-50  h-full ${
          open == true
            ? "flex absolute h-screen overflow-y-scroll -right-0 -mt-3.5 z-30 bg-white"
            : "lg:flex hidden"
        }`}
      >
          <button className="flex pt-3 justify-end px-5">
            <FontAwesomeIcon
              icon={faTimes}
              className="text-gray-600 text-xl"
              onClick={() => {
                setOpen(!open);
              }}
            />
          </button>
        <div className="">
          <div className="border-b-2 flex items-center justify-between py-2 px-3">
            <h1 className="text-xl font-semibold">FILTERS</h1>
            <p
              className="text-red-500 font-extrabold tracking-wide cursor-pointer text-xs bg-gray-200 hover:bg-gray-300 py-1 px-2 rounded-md"
              onClick={() => {
                setSelectedFilterOptions([]);
                setSelectedSort(null);
              }}
            >
              CLEAR ALL
            </p>
          </div>
          <div className="flex flex-col gap-y-4 px-5 py-3">
            <div className=" border-b-2 pb-3">
              <p className="font-semibold opacity-80 mb-1">Category</p>
              <div>
                {[...new Set(products.map((item) => item.category))].map(
                  (category) => (
                    <div key={category} className="flex items-center gap-x-2">
                      <input
                        type="checkbox"
                        id={category}
                        name={category}
                        value={category}
                        className="h-4 w-4 "
                        onChange={(e) => {
                          const checked = e.target.checked;
                          if (checked) {
                            setSelectedFilterOptions((prev) => [
                              ...prev,
                              category,
                            ]);
                          } else {
                            setSelectedFilterOptions((prev) =>
                              prev.filter((item) => item !== category)
                            );
                          }
                        }}
                      />
                      <label htmlFor={category} className="text-sm">
                        {category}
                      </label>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className=" border-b-2 pb-4">
              <p className="font-semibold opacity-80 mb-1">Price Range</p>
              <div className="flex items-center gap-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="border rounded px-2 py-1 w-24"
                />
                <span>-</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="border rounded px-2 py-1 w-24"
                />
              </div>
            </div>
            <div className="border-b-2 pb-4">
              <p className="font-semibold opacity-80 mb-1">Brands</p>
              <div>
                {[...new Set(products.map((item) => item.brand))].map(
                  (brand, index) => (
                    <div key={index} className="flex items-center gap-x-2">
                      <input
                        type="checkbox"
                        id={brand}
                        name={brand}
                        value={brand}
                        className={`h-4 w-4 ${brand ? "block" : "hidden"}`}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          if (checked) {
                            setSelectedFilterOptions((prev) => [
                              ...prev,
                              brand,
                            ]);
                          } else {
                            setSelectedFilterOptions((prev) =>
                              prev.filter((prevItem) => prevItem !== brand)
                            );
                          }
                        }}
                      />
                      <label
                        htmlFor={brand}
                        className="text-sm overflow-x-hidden text-ellipsis w-[100%]"
                      >
                        {brand}
                      </label>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="">
              <p className="font-semibold opacity-80 mb-1">Rating</p>
              <div className="flex justify-center gap-y-1 flex-col cursor-pointer">
                {starsData.map((item, index) => {
                  return (
                    <p
                      onClick={() => {
                        handleStarRating(item.value);
                      }}
                      key={item.value}
                      // className={`${clickedRating == true ? "" : "text-black"}`}
                    >
                      {item.icon} {item.desc}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default LeftSec;
