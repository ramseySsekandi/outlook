"use client";
import React, { useState } from "react";
import {
  FolderClosed,
  Package,
  UserCircle,
  Smartphone,
  MonitorSmartphone,
  Phone,
  Globe,
  LayoutGrid,
} from "lucide-react";

const VerticalNav = () => {
  const [activeIcon, setActiveIcon] = useState(0);

  const icons = [
    { icon: FolderClosed, label: "Files" },
    { icon: Package, label: "Package" },
    { icon: UserCircle, label: "Profile" },
    { icon: Smartphone, label: "Mobile" },
    { icon: MonitorSmartphone, label: "Devices" },
    { icon: Phone, label: "Phone" },
    { icon: Globe, label: "Browser" },
    { icon: LayoutGrid, label: "Apps" },
  ];

  return (
    <div className="flex h-screen">
      <nav className="bg-[#1A1B1E] w-16 flex flex-col items-center py-4 gap-6">
        {icons.map((IconObj, index) => (
          <button
            key={index}
            className={`p-3 rounded-lg transition-all duration-200 relative group ${
              activeIcon === index ? "bg-blue-500/20" : "hover:bg-blue-500/10"
            }`}
            onClick={() => setActiveIcon(index)}
          >
            <IconObj.icon
              className={`w-6 h-6 transition-colors duration-200 ${
                activeIcon === index
                  ? "text-[#3B82F6] stroke-[1.5]"
                  : "text-gray-500 group-hover:text-[#3B82F6] stroke-[1.5]"
              }`}
            />
            {/* Glow effect */}
            <div
              className={`absolute inset-0 rounded-lg transition-opacity duration-200 ${
                activeIcon === index
                  ? "opacity-100 animate-pulse"
                  : "opacity-0 group-hover:opacity-50"
              }`}
              style={{
                background:
                  "radial-gradient(circle at center, rgba(59, 130, 246, 0.2) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />
          </button>
        ))}
      </nav>
    </div>
  );
};

export default VerticalNav;
