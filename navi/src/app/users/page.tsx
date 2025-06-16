"use client";

import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { HiOutlineUserGroup, HiOutlineUsers, HiOutlinePlus, HiOutlineLink } from "react-icons/hi2";
import { useTheme } from "../../context/ThemeContext";

export default function ManageUsersPage() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isNaviModalOpen, setIsNaviModalOpen] = useState(false);
  const [isNaviDropdownOpen, setIsNaviDropdownOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("All Users");

  const tabList = [
    { label: "All Users", count: 0 },
    { label: "Unassigned", count: 0 },
    { label: "Groups", count: 0 },
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"} flex font-poppins transition-colors duration-300`}>
      <Sidebar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        isSidebarCollapsed={isSidebarCollapsed}
        setIsSidebarCollapsed={setIsSidebarCollapsed}
        isNaviModalOpen={isNaviModalOpen}
        setIsNaviModalOpen={setIsNaviModalOpen}
        isNaviDropdownOpen={isNaviDropdownOpen}
        setIsNaviDropdownOpen={setIsNaviDropdownOpen}
        isProfileOpen={isProfileOpen}
        setIsProfileOpen={setIsProfileOpen}
      />
      <div className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? "ml-12" : "ml-32"} p-8 overflow-x-hidden`}>  
        <h1 className="text-2xl font-bold mb-1">Manage Users</h1>
        <p className="text-gray-500 mb-6">Manage your team members and their account permission.</p>
        <div className="flex items-center mb-6 gap-4 flex-wrap">
          <div className="flex gap-2 bg-gray-100 rounded-full p-1">
            {tabList.map((tab) => (
              <button
                key={tab.label}
                className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${activeTab === tab.label ? "bg-teal-200 text-teal-900" : "text-gray-500"}`}
                onClick={() => setActiveTab(tab.label)}
              >
                {tab.label} <span className="ml-1">{tab.count}</span>
              </button>
            ))}
          </div>
          <div className="flex-1" />
          <input
            type="text"
            placeholder="Search user..."
            className="border rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white text-gray-900"
            style={{ minWidth: 200 }}
          />
          <button className="flex items-center gap-2 border rounded px-3 py-1 text-sm font-medium bg-white hover:bg-gray-100">
            <HiOutlineUserGroup className="w-5 h-5" /> Create Groups
          </button>
          <button className="flex items-center gap-2 bg-teal-400 text-white rounded px-3 py-1 text-sm font-medium hover:bg-teal-500">
            <HiOutlineUsers className="w-5 h-5" /> Invite User
          </button>
        </div>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <div className="flex flex-col items-center">
            <div className="rounded-full bg-gray-200 p-6 mb-4">
              <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-400 w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 14a4 4 0 1 0-8 0m8 0v1a4 4 0 0 1-4 4 4 4 0 0 1-4-4v-1m8 0H8" />
                <circle cx="12" cy="8" r="4" strokeWidth={1.5} />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 14v1a4 4 0 0 1-4 4 4 4 0 0 1-4-4v-1" />
                <circle cx="12" cy="8" r="4" strokeWidth={1.5} />
              </svg>
            </div>
            <h2 className="text-lg font-semibold mb-2">Invite your first user</h2>
            <p className="text-gray-500 mb-4 text-center">Add your team members and external users.</p>
            <div className="flex gap-2 flex-wrap justify-center">
              <button className="flex items-center gap-2 border rounded px-3 py-1 text-sm font-medium bg-white hover:bg-gray-100">
                <HiOutlineLink className="w-5 h-5" /> Copy Share Link
              </button>
              <button className="flex items-center gap-2 border rounded px-3 py-1 text-sm font-medium bg-white hover:bg-gray-100">
                <HiOutlineUserGroup className="w-5 h-5" /> Create Groups
              </button>
              <button className="flex items-center gap-2 bg-teal-400 text-white rounded px-3 py-1 text-sm font-medium hover:bg-teal-500">
                <HiOutlineUsers className="w-5 h-5" /> Invite User
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 