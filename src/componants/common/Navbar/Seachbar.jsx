import React from "react";
import { Search } from "lucide-react";
import SearchDropdown from "./searchdropdooun";

const MobileSearchBar = ({ onCategorySelected }) => (
  <div className="w-full px-2 py-2 lg:hidden">
    <div className="flex">
      <SearchDropdown onCategorySelected={onCategorySelected} mobile={true} />
      <input
        type="text"
        placeholder="Search Amazon.in"
        className="flex-1 py-1 px-2 text-black border-0 outline-none bg-white text-sm"
      />
      <button className="bg-yellow-500 text-black px-2 rounded-r-md">
        <Search size={16} />
      </button>
    </div>
  </div>
);

export default MobileSearchBar;