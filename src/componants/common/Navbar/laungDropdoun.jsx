import React from "react";
import { ChevronDown } from "lucide-react";
import Flag from "../../../assets/navlogo/flag.png";

const LanguageDropdown = ({ languageDropdownOpen, toggleLanguageDropdown }) => (
  <div className="relative">
    <div
      className="flex items-center mx-1 lg:mx-3 cursor-pointer"
      onClick={toggleLanguageDropdown}
    >
      <div className="mr-1 lg:mr-4">
        <img src={Flag} alt="Flag" className="h-2 lg:h-3" />
      </div>
      <span className="font-bold text-xs lg:text-base">EN</span>
      <ChevronDown size={12} className="hidden sm:block" />
    </div>

    {languageDropdownOpen && (
      <div className="absolute right-0 top-full mt-1 bg-white text-black shadow-lg rounded-sm z-50 w-64">
        <div className="p-3">
          <div className="flex items-center mb-3">
            <input
              type="radio"
              id="en"
              name="language"
              value="en"
              defaultChecked
              className="mr-2"
            />
            <label htmlFor="en" className="flex items-center">
              <span className="font-medium">English - EN</span>
            </label>
          </div>

          <div className="flex items-center mb-3">
            <input
              type="radio"
              id="hi"
              name="language"
              value="hi"
              className="mr-2"
            />
            <label htmlFor="hi" className="flex items-center">
              <span>हिन्दी - HI</span>
            </label>
          </div>

          <div className="flex items-center mb-3">
            <input
              type="radio"
              id="ta"
              name="language"
              value="ta"
              className="mr-2"
            />
            <label htmlFor="ta" className="flex items-center">
              <span>தமிழ் - TA</span>
            </label>
          </div>

          <div className="flex items-center mb-3">
            <input
              type="radio"
              id="te"
              name="language"
              value="te"
              className="mr-2"
            />
            <label htmlFor="te" className="flex items-center">
              <span>తెలుగు - TE</span>
            </label>
          </div>

          <div className="flex items-center mb-3">
            <input
              type="radio"
              id="kn"
              name="language"
              value="kn"
              className="mr-2"
            />
            <label htmlFor="kn" className="flex items-center">
              <span>ಕನ್ನಡ - KN</span>
            </label>
          </div>

          <div className="flex items-center mb-3">
            <input
              type="radio"
              id="ml"
              name="language"
              value="ml"
              className="mr-2"
            />
            <label htmlFor="ml" className="flex items-center">
              <span>മലയാളം - ML</span>
            </label>
          </div>

          <div className="flex items-center mb-3">
            <input
              type="radio"
              id="bn"
              name="language"
              value="bn"
              className="mr-2"
            />
            <label htmlFor="bn" className="flex items-center">
              <span>বাংলা - BN</span>
            </label>
          </div>

          <div className="flex items-center mb-3">
            <input
              type="radio"
              id="mr"
              name="language"
              value="mr"
              className="mr-2"
            />
            <label htmlFor="mr" className="flex items-center">
              <span>मराठी - MR</span>
            </label>
          </div>

          <div className="text-blue-500 text-center mt-3">Learn more</div>

          <div className="flex items-center mt-3 pt-3 border-t">
            <span className="text-sm mr-1">🇮🇳</span>
            <span className="text-sm">You are shopping on Amazon.in</span>
          </div>

          <div className="text-blue-500 text-center mt-2">
            Change country/region
          </div>
        </div>
      </div>
    )}
  </div>
);

export default LanguageDropdown;