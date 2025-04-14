import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const SearchDropdown = ({ onCategorySelected, mobile = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All Categories",
    "Alexa Skills",
    "Amazon Devices",
    "Amazon Fashion",
    "Amazon Fresh",
    "Amazon Pharmacy",
    "Appliances",
    "Apps & Games",
    "Audible Audiobooks",
    "Baby",
    "Beauty",
    "Books",
    "Car & Motorbike",
    "Clothing & Accessories",
    "Collectibles",
    "Computers & Accessories",
    "Deals",
    "Electronics",
    "Furniture",
    "Garden & Outdoors",
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectCategory = (category) => {
    setSelectedCategory(category);
    setIsOpen(false);
    if (onCategorySelected) {
      onCategorySelected(category);
    }
  };

  return (
    <div className="relative">
      {/* Dropdown button */}
      <button
        onClick={toggleDropdown}
        className={`flex items-center ${
          mobile
            ? "bg-gray-100 border-r border-gray-300 text-gray-700 p-4 rounded-l-md text-sm px-2"
            : "h-10 px-2 bg-gray-100 border-r border-gray-300 text-gray-700 rounded-l text-sm"
        }`}
      >
        <span className={mobile ? "mr-1 text-xs" : "mr-1"}>
          {selectedCategory}
        </span>
        <ChevronDown size={mobile ? 12 : 16} />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className={`absolute left-0 p-4 top-full z-50 w-64 text-black bg-white border border-gray-300 shadow-lg max-h-96 overflow-y-auto text-sm ${
            mobile ? "text-xs" : ""
          }`}
        >
          {categories.map((category, index) => (
            <div
              key={index}
              className={`px-4 py-2  text-black hover:bg-${
                mobile ? "gray-100" : "blue-500 hover:text-white"
              } cursor-pointer ${
                category === selectedCategory ? "bg-blue-600 text-black" : ""
              }`}
              onClick={() => selectCategory(category)}
            >
              {category}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;