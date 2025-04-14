import React from "react";
import { MapPin } from "lucide-react";

const Location = () => (
  <div className="hidden md:flex items-center text-xs mr-2">
    <MapPin size={16} className="mr-1" />
    <div>
      <div className="text-gray-300">Delivering to Nagpur 440022</div>
      <div className="font-bold text-[15px]">Update location</div>
    </div>
  </div>
);

export default Location;