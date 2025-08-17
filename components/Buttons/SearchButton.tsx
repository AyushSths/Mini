// "use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const searchSchema = z.object({
  text: z.string("Search term is required").min(2, "Search term is required"),
});

type searchFormInputs = z.infer<typeof searchSchema>;

const SearchButton = () => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<searchFormInputs>({
    resolver: zodResolver(searchSchema),
  });

  const onSubmit = (data: searchFormInputs) => {
    setSearchTerm(data.text);
    console.log("Search term submitted:", data.text);
    router.push(`/search?query=${data.text}`);

  };

  // Toggle the visibility of the search input
  // const toggleSearch = () => {
  //   setOpen(!open);
  // };
  // console.log(open);

  return (
    <div className="searchBox flex items-center relative">
      <form onSubmit={handleSubmit(onSubmit)} className="searchForm flex items-center">
        <input
          {...register("text")}
          name="text"
          type="text"
          placeholder="Search..."
          className="search-input relative left-10"
          // className={`search-input border-b border-b-slate-300 px-3 py-2 min-w-[200px] md:w-[500px] focus:outline-none focus:border-slate-500  ${open ? "block w-full" : "hidden"}`}
        />
        <Button className=" cursor-pointer bg-slate-700">
          <FontAwesomeIcon icon={faSearch} className="searchIcon text-lg" />
        </Button>
      </form>
    </div>
  );
};

export default SearchButton;
