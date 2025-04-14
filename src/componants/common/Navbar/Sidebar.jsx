import React from "react";
import { X, ChevronRight } from "lucide-react";
import { FaUserCircle } from "react-icons/fa";

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white z-20 w-full xs:w-4/5 sm:w-3/5 md:w-2/5 lg:w-[25%] transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out overflow-y-auto`}
    >
      {/* Sidebar Header */}
      <div className="bg-gray-800 text-white flex items-center p-3 lg:p-4 sticky top-0">
        <FaUserCircle size={20} className="lg:size-8 mr-2" />
        <div className="text-base lg:text-lg font-medium">Hello, sign in</div>
        <button
          className="ml-auto border border-gray-600 rounded-full p-1"
          onClick={onClose}
        >
          <X size={16} className="lg:size-5" />
        </button>
      </div>

      {/* Sidebar Content */}
      <div className="text-gray-800 p-2 lg:p-4">
        {/* Trending Section */}
        <div className="font-bold text-base lg:text-lg p-2 lg:p-3">
          Trending
        </div>
        <div className="py-1 px-3 hover:bg-gray-100 text-sm lg:text-base">
          Bestsellers
        </div>
        <div className="py-1 lg:py-2 px-3 lg:px-4 hover:bg-gray-100 text-sm lg:text-base">
          New Releases
        </div>
        <div className="py-1 lg:py-2 px-3 lg:px-4 border-b border-gray-200 hover:bg-gray-100 text-sm lg:text-base">
          Movers and Shakers
        </div>

        {/* Digital Content Section */}
        <div className="font-bold text-base lg:text-lg p-2 lg:p-3">
          Digital Content and Devices
        </div>
        <div className="py-1 lg:py-2 px-3 lg:px-4 hover:bg-gray-100 text-sm lg:text-base">
          Amazon miniTV- FREE entertainment
        </div>
        <div className="py-1 lg:py-2 px-3 lg:px-4 hover:bg-gray-100 flex justify-between items-center text-sm lg:text-base">
          <span>Echo & Alexa</span>
          <ChevronRight />
        </div>
        <div className="py-1 lg:py-2 px-3 lg:px-4 hover:bg-gray-100 flex justify-between items-center text-sm lg:text-base">
          <span>Fire TV</span>
          <ChevronRight />
        </div>
        <div className="py-1 lg:py-2 px-3 lg:px-4 hover:bg-gray-100 flex justify-between items-center text-sm lg:text-base">
          <span>Kindle E-Readers & eBooks</span>
          <ChevronRight />
        </div>
        <div className="py-1 lg:py-2 px-3 lg:px-4 hover:bg-gray-100 flex justify-between items-center text-sm lg:text-base">
          <span>Audible Audiobooks</span>
          <ChevronRight />
        </div>
        <div className="py-1 lg:py-2 px-3 lg:px-4 hover:bg-gray-100 flex justify-between items-center text-sm lg:text-base">
          <span>Amazon Prime Video</span>
          <ChevronRight />
        </div>
        <div className="py-1 lg:py-2 px-3 lg:px-4 hover:bg-gray-100 flex justify-between items-center border-b border-gray-200 text-sm lg:text-base">
          <span>Amazon Prime Music</span>
          <ChevronRight />
        </div>

        {/* Shop by Category */}
        <div className="font-bold text-base lg:text-lg p-2 lg:p-3">
          Shop by Category
        </div>
        <div className="py-1 lg:py-2 px-3 lg:px-4 hover:bg-gray-100 text-sm lg:text-base">
          Mobiles, Computers
        </div>
        <div className="py-1 lg:py-2 px-3 lg:px-4 hover:bg-gray-100 text-sm lg:text-base">
          TV, Application, Electronics
        </div>
        <div className="py-1 lg:py-2 px-3 lg:px-4 border-b border-gray-200 hover:bg-gray-100 text-sm lg:text-base">
          Women's Fashion
        </div>
        <div className="py-1 lg:py-2 px-3 lg:px-4 border-b border-gray-200 hover:bg-gray-100 text-sm lg:text-base">
          see all
        </div>
      </div>
    </div>
  );
};

export default Sidebar;