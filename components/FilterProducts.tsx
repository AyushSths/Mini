"use client";
import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as solidStar,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import LeftSec from "@/app/filterSection/LeftSec";
import TopSection from "@/app/filterSection/TopSection";
import { SkeletonDemo } from "./Loader/SkeletonDemo";

export type Product = {
  id: string;
  title: string;
  category: string;
  brand: string;
  price: number;
  images: string;
  thumbnail: string;
  rating: number;
  stock: number;
  discountPercentage: number;
};

export type SortOption = {
  id: string;
  label: string;
  action: () => void;
};

const FilterProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortProducts, setSortProducts] = useState<Product[]>([]);
  const [selectedSort, setSelectedSort] = useState<SortOption | null>(null);
  const [selectedFilterOptions, setSelectedFilterOptions] = useState<string[]>(
    []
  );

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();

      const items: Product[] = data.products;
      setProducts(items);
      setSortProducts(items);
      console.log("data", items);
    };
    fetchProducts();
    console.log("products", products);
  }, []);

  const priceHTL = () => {
    if (selectedFilterOptions.length === 0) {
      const sorted = [...products].sort((a, b) => b.price - a.price);
      setSortProducts(sorted);
    } else {
      setSortProducts(
        products.filter((item) =>
          selectedFilterOptions.includes(item.category)
        ) ||
          products.filter((item) =>
            selectedFilterOptions.includes(item.brand)
          ) ||
          products.filter((item) =>
            selectedFilterOptions.includes(item.rating.toString())
          )
      );
      const sorted = [...sortProducts].sort((a, b) => b.price - a.price);
      setSortProducts(sorted);
      console.log("sorted", sortProducts);
    }
  };
  const priceLTH = () => {
    if (selectedFilterOptions.length === 0) {
      const sorted = [...products].sort((a, b) => a.price - b.price);
      setSortProducts(sorted);
    } else {
      setSortProducts(
        products.filter((item) =>
          selectedFilterOptions.includes(item.category)
        ) ||
          products.filter((item) => selectedFilterOptions.includes(item.brand))
      );
      const sorted = [...sortProducts].sort((a, b) => a.price - b.price);
      setSortProducts(sorted);
      console.log("sorted", sortProducts);
    }
  };

  const sortRating = () => {
    if (selectedFilterOptions.length === 0) {
      const sorted = [...products].sort((a, b) => b.rating - a.rating);
      setSortProducts(sorted);
    } else {
      setSortProducts(
        products.filter((item) =>
          selectedFilterOptions.includes(item.category)
        ) ||
          products.filter((item) =>
            selectedFilterOptions.includes(item.brand)
          ) ||
          products.filter((item) =>
            selectedFilterOptions.includes(item.rating.toString())
          )
      );
      const sorted = [...sortProducts].sort((a, b) => b.rating - a.rating);
      setSortProducts(sorted);
      console.log("sorted", sortProducts);
    }
  };
  const sortPopularity = () => {
    if (selectedFilterOptions.length === 0) {
      const sorted = [...products].sort((a, b) => {
        const popularityA = a.rating * (100 - a.stock);
        const popularityB = b.rating * (100 - b.stock);
        return popularityB - popularityA;
      });
      setSortProducts(sorted);
    } else {
      setSortProducts(
        products.filter((item) =>
          selectedFilterOptions.includes(item.category)
        ) ||
          products.filter((item) =>
            selectedFilterOptions.includes(item.brand)
          ) ||
          products.filter((item) =>
            selectedFilterOptions.includes(item.rating.toString())
          )
      );
      const sorted = [...sortProducts].sort((a, b) => {
        const popularityA = a.rating * (100 - a.stock);
        const popularityB = b.rating * (100 - b.stock);
        return popularityB - popularityA;
      });
      setSortProducts(sorted);
      console.log("sorted", sortProducts);
    }
  };

  const sortOptions: SortOption[] = [
    {
      id: "recomended",
      label: "Recommended",
      action: () => setSortProducts(products),
    },
    { id: "priceHTL", label: "Price: High to Low", action: priceHTL },
    { id: "priceLTH", label: "Price: Low to High", action: priceLTH },
    { id: "rating", label: "Rating", action: sortRating },
    { id: "popularity", label: "Popularity", action: sortPopularity },
  ];

  const fivestars = [];
  for (let i = 1; i <= 5; i++) {
    fivestars.push(
      <FontAwesomeIcon key={i} icon={solidStar} className="text-yellow-400" />
    );
  }
  const fourstars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= 4) {
      fourstars.push(
        <FontAwesomeIcon key={i} icon={solidStar} className="text-yellow-400" />
      );
    } else {
      fourstars.push(
        <FontAwesomeIcon
          key={i}
          icon={regularStar}
          className="text-yellow-400"
        />
      );
    }
  }
  const threestars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= 3) {
      threestars.push(
        <FontAwesomeIcon key={i} icon={solidStar} className="text-yellow-400" />
      );
    } else {
      threestars.push(
        <FontAwesomeIcon
          key={i}
          icon={regularStar}
          className="text-yellow-400"
        />
      );
    }
  }
  const twostars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= 2) {
      twostars.push(
        <FontAwesomeIcon key={i} icon={solidStar} className="text-yellow-400" />
      );
    } else {
      twostars.push(
        <FontAwesomeIcon
          key={i}
          icon={regularStar}
          className="text-yellow-400"
        />
      );
    }
  }
  const onestar = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= 1) {
      onestar.push(
        <FontAwesomeIcon key={i} icon={solidStar} className="text-yellow-400" />
      );
    } else {
      onestar.push(
        <FontAwesomeIcon
          key={i}
          icon={regularStar}
          className="text-yellow-400"
        />
      );
    }
  }

  const starsData = [
    { label: "5 Stars", value: 5, icon: fivestars, desc: "Premium" },
    { label: "4 Stars", value: 4, icon: fourstars, desc: "And Above" },
    { label: "3 Stars", value: 3, icon: threestars, desc: "And Above" },
    { label: "2 Stars", value: 2, icon: twostars, desc: "And Above" },
    { label: "1 Star", value: 1, icon: onestar, desc: "And Above" },
  ];

  const [clickedRating, setClickedRating] = useState(null);

  const handleStarRating = (rating: number) => {
    const filtered = products.filter((item) => item.rating >= rating);
    console.log("filtered products", filtered);
    if (selectedFilterOptions.length != 0) {
      const sortFiltered = sortProducts.filter((item) => item.rating >= rating);
      console.log("sortFiltered products", sortFiltered);
      setSortProducts(sortFiltered);
    } else setSortProducts(filtered);
  };

  useEffect(() => {
    if (selectedFilterOptions.length === 0) {
      setSortProducts(products);
    } else {
      setSortProducts(
        products.filter(
          (item) =>
            selectedFilterOptions.includes(item.category) ||
            selectedFilterOptions.includes(item.brand) ||
            selectedFilterOptions.includes(item.rating.toString())
        )
      );
    }
  }, [selectedFilterOptions, products]);

  return products.length === 0 ? (
    <div className="flex items-center justify-center h-screen">
      <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  ) : (
    <div className="max-w-[1380px] mx-auto md:py-10 py-4">
      <div className="productSection flex justify-center gap-x-7 ">
        <LeftSec
          setSelectedFilterOptions={setSelectedFilterOptions}
          setSelectedSort={setSelectedSort}
          products={products}
          starsData={starsData}
          handleStarRating={handleStarRating}
        />
        <TopSection
          setSelectedSort={setSelectedSort}
          selectedSort={selectedSort}
          setSelectedFilterOptions={setSelectedFilterOptions}
          selectedFilterOptions={selectedFilterOptions}
          sortProducts={sortProducts}
          sortOptions={sortOptions}
          products={products}
        />
      </div>
    </div>
  );
};

export default FilterProducts;
