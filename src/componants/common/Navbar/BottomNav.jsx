import React from "react";
import MenuToggle from "./menuToogle";

const BottomNav = ({ toggleSidebar }) => (
  <div className="flex items-center bg-gray-800 px-4 py-1 text-sm p-10">
    <MenuToggle onClick={toggleSidebar} />
    <div className="flex space-x-4">
      <span>Fresh</span>
      <span>MX Player</span>
      <span>Sell</span>
      <span>Bestsellers</span>
      <span>Mobiles</span>
      <span>Today's Deals</span>
      <span>Prime</span>
      <span>Customer Service</span>
      <span>New Releases</span>
      <span>Electronics</span>
      <span>Amazon Pay</span>
      <span>Fashion</span>
    </div>
  </div>
);

export default BottomNav;