"use client";
import React, { useState } from "react";
import { Bell, HelpCircle, Menu, Search, Settings } from "lucide-react";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <nav className="bg-white border-b px-2 py-1 flex items-center space-x-2">
      <button
        onClick={toggleMobileSidebar}
        className="md:hidden"
        aria-label="Toggle Menu"
      >
        <Menu className="h-5 w-5 text-gray-600" />
      </button>

      <div className="flex items-center space-x-4">
        <span className="text-blue-600 font-semibold">Outlook</span>
        <div className="hidden md:flex space-x-4 text-sm">
          <button className="px-2 py-1 text-gray-700 border-b-2 border-transparent hover:border-gray-300">
            Home
          </button>
          <button className="px-2 py-1 text-gray-700 border-b-2 border-transparent hover:border-gray-300">
            View
          </button>
          <button className="px-2 py-1 text-gray-700 border-b-2 border-transparent hover:border-gray-300">
            Help
          </button>
        </div>
      </div>

      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-1.5 border rounded-sm focus:outline-none focus:border-blue-500 text-sm"
          />
        </div>
      </div>

      <div className="hidden md:flex items-center space-x-2">
        <button aria-label="Help">
          <HelpCircle className="h-5 w-5 text-gray-600" />
        </button>
        <button aria-label="Settings">
          <Settings className="h-5 w-5 text-gray-600" />
        </button>
        <button aria-label="Notifications">
          <Bell className="h-5 w-5 text-gray-600" />
        </button>
      </div>
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </nav>
  );
};

export default Navbar;
