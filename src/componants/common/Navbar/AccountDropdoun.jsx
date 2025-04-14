import React from "react";
import { ChevronDown } from "lucide-react";

const AccountDropdown = ({ accountDropdownOpen, toggleAccountDropdown }) => (
  <div className="relative">
    <div
      className="mx-1 text-xs cursor-pointer"
      onClick={toggleAccountDropdown}
    >
      <div className="hidden sm:block">Hello, sign in</div>
      <div className="font-bold flex items-center text-[13px]">
        <span className="sm:hidden">Account</span>
        <span className="hidden sm:inline">Account & Lists</span>
        <ChevronDown size={14} className="hidden sm:block" />
      </div>
    </div>

    {accountDropdownOpen && (
      <div className="absolute right-0 top-full mt-1 bg-white text-black shadow-lg rounded-sm z-50 w-72 lg:w-96">
        <div className="flex flex-col items-center p-4 border-b border-gray-200">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-1 px-12 lg:px-32 rounded text-sm">
            Sign in
          </button>
          <div className="text-xs lg:text-sm mt-2">
            New customer? <span className="text-blue-500">Start here.</span>
          </div>
        </div>

        <div className="flex p-4">
          <div className="flex-1 border-r border-gray-200 pr-4">
            <div className="font-bold text-base lg:text-lg mb-2">
              Your Lists
            </div>
            <ul className="text-xs lg:text-sm space-y-2">
              <li className="hover:underline hover:text-red-500">
                Create a Wish List
              </li>
              <li className="hover:underline hover:text-red-500">
                Wish from Any Website
              </li>
              <li className="hover:underline hover:text-red-500">
                Baby Wishlist
              </li>
              <li className="hover:underline hover:text-red-500">
                Discover Your Style
              </li>
              <li className="hover:underline hover:text-red-500">
                Explore Showroom
              </li>
            </ul>
          </div>

          <div className="flex-1 pl-4">
            <div className="font-bold text-base lg:text-lg mb-2">
              Your Account
            </div>
            <ul className="text-xs lg:text-sm space-y-2">
              <li className="hover:underline hover:text-red-500">
                Your Account
              </li>
              <li className="hover:underline hover:text-red-500">
                Your Orders
              </li>
              <li className="hover:underline hover:text-red-500">
                Your Wish List
              </li>
              <li className="hover:underline hover:text-red-500">
                Your Recommendations
              </li>
              <li className="hover:underline hover:text-red-500">
                Your Prime Membership
              </li>
              <li className="hover:underline hover:text-red-500">
                Your Prime Video
              </li>
              <li className="hover:underline hover:text-red-500">
                Your Subscribe & Save Items
              </li>
              <li className="hover:underline hover:text-red-500">
                Memberships & Subscriptions
              </li>
              <li className="hover:underline hover:text-red-500">
                Your Seller Account
              </li>
              <li className="hover:underline hover:text-red-500">
                Manage Your Content and Devices
              </li>
              <li className="hover:underline hover:text-red-500">
                Register for a free Business Account
              </li>
            </ul>
          </div>
        </div>
      </div>
    )}
  </div>
);

export default AccountDropdown;