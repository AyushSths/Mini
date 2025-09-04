import { Product } from "@/components/FilterProducts";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

const PriceRangeSchema = z.object({
  min: z.coerce.number().min(1, "Minimum must be at least 1").optional(),
  max: z.coerce.number().optional(),
});

type PriceRangeInputs = z.infer<typeof PriceRangeSchema>;

interface LeftSectionProps {
  setSelectedSort: (sort: any) => void;
  selectedFilterOptions: string[];
  setSelectedFilterOptions: React.Dispatch<React.SetStateAction<string[]>>;
  products: Product[];
  sortProducts: Product[];
  setSortProducts: React.Dispatch<React.SetStateAction<Product[]>>;
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
      selectedFilterOptions,
      setSelectedFilterOptions,
      products,
      starsData,
      handleStarRating,
      open,
      sortProducts,
      setSortProducts,
      setOpen,
    },
    ref
  ) => {
    const [priceRangeVisible, setPriceRangeVisible] = useState(false);

    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<PriceRangeInputs>({
      resolver: zodResolver(PriceRangeSchema),
    });

    const onSubmit = ({ min, max }: PriceRangeInputs) => {
      const base = selectedFilterOptions.length ? sortProducts : products;

      const filtered = base.filter((p) => {
        if (min != null && max != null) return p.price >= min && p.price <= max;
        if (min != null) return p.price >= min;
        if (max != null) return p.price <= max;
        return true;
      });

      setSortProducts(filtered);
    };

    const handleReset = () => {
      reset(); // clear min/max inputs
      setSelectedFilterOptions([]);
      setSelectedSort(null);
      setSortProducts(products); // reset all products
      setPriceRangeVisible(false); // hide buttons
    };

    return (
      <div
        ref={ref}
        className={`flex-col justify-start z-10 rounded-l-md backdrop-blur-3xl border-r-2 bg-opacity-50 h-full ${
          open
            ? "flex fixed overflow-y-scroll -right-0 -mt-3.5 z-30 pb-22 bg-white"
            : "lg:flex hidden"
        }`}
      >
        <button className="flex pt-3 justify-end px-5">
          <FontAwesomeIcon
            icon={faTimes}
            className="text-gray-600 text-xl"
            onClick={() => setOpen(!open)}
          />
        </button>

        <div className="">
          {/* Header */}
          <div className="border-b-2 flex items-center justify-between py-2 px-3">
            <h1 className="text-xl font-semibold">FILTERS</h1>
            <p
              className="text-red-500 font-extrabold tracking-wide cursor-pointer text-xs bg-gray-200 hover:bg-gray-300 py-1 px-2 rounded-md"
              onClick={handleReset}
            >
              CLEAR ALL
            </p>
          </div>

          <div className="flex flex-col gap-y-4 px-5 py-3">
            {/* Category Filter */}
            <div className="border-b-2 pb-3">
              <p className="font-semibold opacity-80 mb-1">Category</p>
              <div>
                {[...new Set(products.map((p) => p.category))].map((category) => (
                  <div key={category} className="flex items-center gap-x-2">
                    <input
                      type="checkbox"
                      id={category}
                      value={category}
                      className="h-4 w-4"
                      onChange={(e) => {
                        const checked = e.target.checked;
                        if (checked) {
                          setSelectedFilterOptions((prev) => [...prev, category]);
                        } else {
                          setSelectedFilterOptions((prev) =>
                            prev.filter((c) => c !== category)
                          );
                        }
                      }}
                    />
                    <label htmlFor={category} className="text-sm">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="border-b-2 pb-4">
              <p className="font-semibold opacity-80 mb-1">Price Range</p>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col items-center gap-y-2"
              >
                <div className="flex items-center gap-x-2">
                  <input
                    {...register("min")}
                    type="number"
                    placeholder="Min"
                    className="border rounded px-2 py-1 w-24"
                    onFocus={() => setPriceRangeVisible(true)}
                  />
                  <span>-</span>
                  <input
                    {...register("max")}
                    type="number"
                    placeholder="Max"
                    className="border rounded px-2 py-1 w-24"
                    onFocus={() => setPriceRangeVisible(true)}
                    />
                </div>
                    {errors.min && (
                      <p className="text-red-500 text-sm mt-1">{errors.min.message}</p>
                    )}
                  {errors.max && (
                    <p className="text-red-500 text-sm mt-1">{errors.max.message}</p>
                  )}

                {/* Submit & Reset Buttons */}
                <div
                  className={`items-center gap-x-3 justify-between w-full ${
                    priceRangeVisible ? "flex" : "hidden"
                  }`}
                >
                  <button
                    type="submit"
                    className="py-1 px-3 w-1/2 bg-emerald-600 hover:bg-emerald-700 rounded-md text-white"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="py-1 px-3 w-1/2 bg-red-600 hover:bg-red-700 rounded-md text-white"
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>

            {/* Brands Filter */}
            <div className="border-b-2 pb-4">
              <p className="font-semibold opacity-80 mb-1">Brands</p>
              <div>
                {[...new Set(products.map((p) => p.brand))].map((brand, index) => (
                  <div key={index} className="flex items-center gap-x-2">
                    <input
                      type="checkbox"
                      id={brand}
                      value={brand}
                      className="h-4 w-4"
                      onChange={(e) => {
                        const checked = e.target.checked;
                        if (checked) setSelectedFilterOptions((prev) => [...prev, brand]);
                        else
                          setSelectedFilterOptions((prev) =>
                            prev.filter((b) => b !== brand)
                          );
                      }}
                    />
                    <label htmlFor={brand} className="text-sm overflow-x-hidden text-ellipsis w-[100%]">
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <div className="">
              <p className="font-semibold opacity-80 mb-1">Rating</p>
              <div className="flex flex-col gap-y-1 cursor-pointer">
                {starsData.map((item) => (
                  <p key={item.value} onClick={() => handleStarRating(item.value)}>
                    {item.icon} {item.desc}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default LeftSec;
