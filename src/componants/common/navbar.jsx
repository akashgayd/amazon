import React, { useState } from "react";
import { Search, ShoppingCart, ChevronDown } from "lucide-react";

// Import components
import Logo from "./Navbar/logo";
import MenuToggle from "./Navbar/menuToogle";
import Location from "./Navbar/Location";
import LanguageDropdown from "./Navbar/laungDropdoun";
import AccountDropdown from "./Navbar/AccountDropdoun";
import MobileSearchBar from "./Navbar/Seachbar";
import SearchDropdown from "./Navbar/searchdropdooun";
import Sidebar from "./Navbar/Sidebar";

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    if (accountDropdownOpen) setAccountDropdownOpen(false);
    if (languageDropdownOpen) setLanguageDropdownOpen(false);
  };

  const toggleAccountDropdown = () => {
    setAccountDropdownOpen(!accountDropdownOpen);
    if (languageDropdownOpen) setLanguageDropdownOpen(false);
  };

  const toggleLanguageDropdown = () => {
    setLanguageDropdownOpen(!languageDropdownOpen);
    if (accountDropdownOpen) setAccountDropdownOpen(false);
  };

  const handleCategorySelected = (category) => {
    setSelectedCategory(category);
    console.log("Selected category in Header:", category);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <div className="relative">
        <div className="bg-gray-900 text-white w-full z-50 fixed top-0">
          {/* Top Navigation Bar */}
          <div className="flex items-center px-2 py-1">
            {/* Logo */}
            <Logo />

            {/* Deliver to Location */}
            <Location />

            {/* Search Bar - Hidden on mobile, visible on large screens */}
            <div className="hidden lg:flex flex-1 mx-2">
              <SearchDropdown onCategorySelected={handleCategorySelected} />
              <input
                type="text"
                placeholder="Search Amazon.in"
                className="flex-1 py-2 px-3 text-black border-0 outline-none bg-white text-sm"
              />
              <button className="bg-yellow-500 text-black rounded-r-md p-1">
                <Search size={20} />
              </button>
            </div>

            {/* Right Navigation */}
            <div className="flex items-center ml-auto">
              {/* Language Selection */}
              <LanguageDropdown
                languageDropdownOpen={languageDropdownOpen}
                toggleLanguageDropdown={toggleLanguageDropdown}
              />

              {/* Account & Lists */}
              <AccountDropdown
                accountDropdownOpen={accountDropdownOpen}
                toggleAccountDropdown={toggleAccountDropdown}
              />

              {/* Returns & Orders - Hidden on smallest screens */}
              <div className="hidden sm:block mx-1 lg:mx-3 text-xs">
                <div>Returns</div>
                <div className="font-bold text-[13px] lg:text-[15px]">
                  & Orders
                </div>
              </div>

              {/* Cart */}
              <div className="flex items-center ml-1 lg:ml-3">
                <div className="relative">
                  <ShoppingCart size={24} />
                  <span className="absolute -top-1 right-0 bg-yellow-500 text-black rounded-full px-1 text-xs font-bold">
                    0
                  </span>
                </div>
                <span className="font-bold ml-1 text-sm lg:text-base">
                  Cart
                </span>
              </div>
            </div>
          </div>

          {/* Mobile Search Bar - Only visible on smaller screens */}
          <MobileSearchBar onCategorySelected={handleCategorySelected} />

          {/* Bottom Navigation Bar */}
          <div className="flex items-center bg-gray-800 px-2 lg:px-4 py-1 text-xs lg:text-sm">
            <MenuToggle onClick={toggleSidebar} />

            <div className="flex space-x-2 lg:space-x-4 whitespace-nowrap">
              <span>Fresh</span>
              <span className="hidden xs:inline">MX Player</span>
              <span>Sell</span>
              <span className="hidden sm:inline">Bestsellers</span>
              <span>Mobiles</span>
              <span className="hidden sm:inline">Today's Deals</span>
              <span className="flex items-center">
                Prime
                <ChevronDown />
              </span>
              <span className="hidden md:inline">Customer Service</span>
              <span className="hidden lg:inline">New Releases</span>
              <span className="hidden md:inline">Electronics</span>
              <span className="hidden sm:inline">Amazon Pay</span>
              <span>Fashion</span>
            </div>
          </div>
        </div>

        {/* Overlay with blur effect when sidebar or dropdowns are open */}
        {(sidebarOpen || accountDropdownOpen || languageDropdownOpen) && (
          <div
            className="fixed inset-0 bg-opacity-10 backdrop-blur-[1px] z-10"
            onClick={() => {
              setSidebarOpen(false);
              setAccountDropdownOpen(false);
              setLanguageDropdownOpen(false);
            }}
          />
        )}

        {/* Sidebar Menu */}
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      </div>
    </>
  );
};

export default Navbar;