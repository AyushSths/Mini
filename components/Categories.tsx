"use client"
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
    <div className="px-3 py-10">
      <h1 className="md:text-3xl text-2xl font-bold mb-4">Categories</h1>
      <div className="max-w-[1380px] mx-auto">
        <div className="flex flex-wrap justify-center">
          <div className="w-full cursor-pointer grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2">
            {data.map((item, index) => {
              return (
                <div
                  className="bg-white p-1 rounded-lg shadow-md hover:shadow-lg transform duration-150 ease-in hover:scale-105 z-0"
                  key={index}
                  onClick={() => handleCategoryClick(item.name)}
                >
                  <div className=" w-full h-full ">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-md mb-4 "
                    />
                  </div>
                  <div className="group flex flex-col justify-center relative z-10 h-full bg-black text-white opacity-0 backdrop-blur-2xl hover:opacity-75 transition-opacity duration-300 rounded-lg transform translate-y-[-100%] p-4">
                    <div className="flex flex-col justify-center items-center  transform translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300">
                      <h2 className="text-2xl font-semibold mb-2">
                        {item.name}
                      </h2>
                      <p className="text-center">{item.description}</p>
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
