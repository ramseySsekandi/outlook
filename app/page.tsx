"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Mail,
  Search,
  Settings,
  Bell,
  HelpCircle,
  Menu,
  Bold,
  Italic,
  UnderlineIcon,
  ChevronRight,
} from "lucide-react";

interface Email {
  id: number;
  sender: {
    name: string;
    avatar: string;
  };
  subject: string;
  preview: string;
  time: string;
  read: boolean;
}

const OutlookInterface = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedEmail, setSelectedEmail] = useState<number | null>(null);
  const [selectedTab, setSelectedTab] = useState<"focused" | "other">(
    "focused"
  );
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const emails: Email[] = [
    {
      id: 1,
      sender: {
        name: "Silvia Ayling",
        avatar: "/avatars/silvia.jpg",
      },
      subject: "Surprise Birthday Planning",
      preview: "Hi team, just wanted to confirm the details...",
      time: "8:19 AM",
      read: false,
    },
    {
      id: 2,
      sender: {
        name: "Contoso Airlines",
        avatar: "/avatars/contoso.jpg",
      },
      subject: "Your flight reservation is confirmed",
      preview: "Hi Kath, your flight to Charlotte is confirm...",
      time: "2:41 PM",
      read: true,
    },
    {
      id: 3,
      sender: {
        name: "Lydia Bauer",
        avatar: "/avatars/lydia.jpg",
      },
      subject: "Team Pictures",
      preview: "That worked! Thanks! We added 56 of the...",
      time: "11:10 AM",
      read: true,
    },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const handleEmailClick = (emailId: number) => {
    setSelectedEmail(selectedEmail === emailId ? null : emailId);
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Top Navigation Bar */}
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
      </nav>

      {/* Formatting Toolbar */}
      <div className="border-b px-2 py-1">
        <div className="flex items-center space-x-1">
          <select className="text-sm border rounded px-2 py-1 bg-white">
            <option>Aptos</option>
          </select>
          <div className="flex items-center space-x-1 border-r pr-2">
            <button aria-label="Bold" className="p-1 hover:bg-gray-100 rounded">
              <Bold className="h-4 w-4 text-gray-600" />
            </button>
            <button
              aria-label="Italic"
              className="p-1 hover:bg-gray-100 rounded"
            >
              <Italic className="h-4 w-4 text-gray-600" />
            </button>
            <button
              aria-label="Underline"
              className="p-1 hover:bg-gray-100 rounded"
            >
              <UnderlineIcon className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Sidebar Overlay */}
        {isMobileSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={toggleMobileSidebar}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
          absolute md:relative w-64 h-full bg-white border-r z-50 transition-all duration-300 ease-in-out
          ${isMobileSidebarOpen ? "left-0" : "-left-64"}
          ${isSidebarOpen ? "md:left-0" : "md:-left-64"}
        `}
        >
          <div className="p-3">
            <button className="w-full bg-blue-600 text-white px-4 py-1.5 rounded-sm text-sm">
              New message
            </button>
          </div>
          <nav className="px-2">
            <button className="w-full flex items-center space-x-2 p-2 bg-gray-100 rounded-sm">
              <Mail className="h-4 w-4 text-gray-600" />
              <span className="text-sm">Inbox</span>
              <span className="ml-auto text-xs">9</span>
            </button>
          </nav>
        </aside>

        {/* Toggle Sidebar Button */}
        <button
          onClick={toggleSidebar}
          className="hidden md:flex items-center justify-center w-6 h-6 absolute left-64 top-2 bg-white border rounded-full z-50 transform -translate-x-1/2"
          aria-label={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
        >
          <ChevronRight
            className={`h-4 w-4 transition-transform duration-300 ${
              isSidebarOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Email List */}
        <div
          className={`
          flex-none transition-all duration-300 ease-in-out overflow-auto
          ${selectedEmail ? "w-0 md:w-96" : "w-full md:w-96"}
          ${isSidebarOpen ? "md:ml-0" : ""}
        `}
        >
          <div className="border-b px-3 py-2">
            <div className="flex space-x-4 text-sm">
              {["focused", "other"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab as "focused" | "other")}
                  className={`${
                    selectedTab === tab
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {emails.map((email) => (
            <button
              key={email.id}
              onClick={() => handleEmailClick(email.id)}
              className={`
                w-full px-3 py-2 border-b hover:bg-gray-50 text-left
                ${selectedEmail === email.id ? "bg-blue-50" : ""}
              `}
            >
              <div className="flex items-start space-x-3">
                <div className="relative w-8 h-8">
                  <Image
                    src={email.sender.avatar}
                    alt=""
                    fill
                    className="rounded-full object-cover"
                    sizes="32px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold truncate">
                      {email.sender.name}
                    </span>
                    <span className="text-xs text-gray-500">{email.time}</span>
                  </div>
                  <div className="text-sm font-medium truncate">
                    {email.subject}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {email.preview}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Email Content */}
        <div
          className={`
          flex-1 transition-all duration-300 ease-in-out
          ${selectedEmail ? "block" : "hidden md:block"}
        `}
        >
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Apartment unit tour</h2>
              <button className="bg-blue-600 text-white px-4 py-1.5 rounded-sm text-sm">
                Send
              </button>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Draft saved at 11:00 AM
            </div>
            <div className="mt-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm text-gray-600">To:</span>
                <input
                  type="text"
                  defaultValue="Dianne Russell"
                  className="flex-1 border-b text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <input
                type="text"
                placeholder="Add a subject"
                className="w-full border-b text-sm focus:outline-none focus:border-blue-500 mb-4"
              />
              <textarea
                className="w-full min-h-[200px] text-sm focus:outline-none resize-none"
                placeholder="Type your message here..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutlookInterface;
