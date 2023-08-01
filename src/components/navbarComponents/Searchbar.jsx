"use client";
import React from "react";
import { Search } from "lucide-react";

export const SearchBar = () => {
  return (
    <div className="flex items-center justify-center bg-black w-full md:w-2/4 rounded-md  border border-black">
      <input
        type="text"
        className="text-white focus:text-black bg-[#333333] focus:bg-white outline-none p-2 flex-1 rounded-l-md"
        placeholder="Search..."
      />
      <button className="p-2 rounded-r-md bg-transparent bg-[#333333]">
        <Search color="#f6f2f2" />
      </button>
    </div>
  );
};
