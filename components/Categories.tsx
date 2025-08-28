"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Categories = () => {
  const data = [
    {
      name: "Beauty",
      image: "images/beauty.jpg",
      description:
        "Explore a wide range of beauty products including skincare, makeup, and hair care.",
    },
    {
      name: "Groceries",
      image: "images/grocery.jpg",
      description: "Fresh and organic groceries delivered to your doorstep.",
    },
    {
      name: "Furniture",
      image: "images/furniture.jpg",
      description:
        "Stylish and comfortable furniture for every room in your home.",
    },
    {
      name: "Fragrances",
      image: "images/fragrances.jpg",
      description: "Discover a variety of fragrances for every occasion.",
    },
  ];
  const router = useRouter();
  const handleCategoryClick = (category: string) => {
    router.push(`/products/category?category=${category}`);
  };
  return (
    <div className="px-3">
      <h1 className="md:text-3xl text-2xl font-bold mb-5 text-center">Categories</h1>
      <div className="max-w-[1380px] mx-auto">
        <div className="flex flex-wrap justify-center">
          <div className="cursor-pointer grid lg:grid-cols-4 grid-cols-2 gap-2">
            {data.map((item, index) => {
              return (
                <div
                  className="bg-white p-1 rounded-lg shadow-md hover:shadow-lg transform duration-150 ease-in hover:scale-105 z-0 relative overflow-hidden"
                  key={index}
                  onClick={() => handleCategoryClick(item.name)}
                >
                  <div className="h-full">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="group flex flex-col justify-center relative z-10 h-full bg-emerald-900 text-white lg:opacity-0 opacity-75 backdrop-blur-2xl md:hover:opacity-75 transition-opacity duration-300 rounded-lg transform translate-y-[-100%] md:p-4 p-2">
                    <div className="flex flex-col justify-center items-center transform lg:translate-y-[100%] translate-y-0 md:group-hover:translate-y-0 transition-transform duration-300">
                      <h2 className="md:text-3xl text-xl font-semibold mb-2">
                        {item.name}
                      </h2>
                      <p className="text-center md:text-base text-xs">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
