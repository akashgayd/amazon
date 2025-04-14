import React from "react";
import { Menu } from "lucide-react";

const MenuToggle = ({ onClick }) => (
  <div
    className="flex items-center mr-2 lg:mr-4 cursor-pointer"
    onClick={onClick}
  >
    <Menu size={18} className="mr-1" style={{ fontWeight: "bold" }} />
    <span className="hidden sm:inline">All</span>
  </div>
);

export default MenuToggle;