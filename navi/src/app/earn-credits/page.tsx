'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import Sidebar from '../components/Sidebar';
import { HiOutlineDocumentDuplicate, HiCheckCircle } from 'react-icons/hi2';

interface InvitedFriend {
  name: string;
  email: string;
  status: 'sent' | 'credited';
  credits?: number;
}

export default function EarnCreditsPage() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isNaviModalOpen, setIsNaviModalOpen] = useState(false);
  const [isNaviDropdownOpen, setIsNaviDropdownOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [inviteLink, setInviteLink] = useState('https://simplabots.com/invite/troyteeples');
  const [copied, setCopied] = useState(false);
  const [isNaviChatbotOpen, setIsNaviChatbotOpen] = useState(false);

  const invitedFriends: InvitedFriend[] = [
    { name: 'Alice Johnson', email: 'alice.johnson@email.com', status: 'sent' },
    { name: 'Michael Smith', email: 'michael.smith@email.com', status: 'sent' },
    { name: 'Emma Brown', email: 'emma.brown@email.com', status: 'credited', credits: 5741 },
    { name: 'James Wilson', email: 'james.wilson@email.com', status: 'credited', credits: 4306 },
    { name: 'Sophia Davis', email: 'sophia.davis@email.com', status: 'credited', credits: 2870 },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'} font-poppins transition-colors duration-300 flex`}>
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
        isNaviChatbotOpen={isNaviChatbotOpen}
        setIsNaviChatbotOpen={setIsNaviChatbotOpen}
      />
     <div className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'ml-12' : 'ml-32'} p-6 sm:p-8 overflow-x-hidden flex justify-center`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl mx-auto"
        >
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">Invite your friends to Simplabots</h1>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-base sm:text-lg`}>
              Share Simplabots with a friend using the link below
            </p>
          </div>

          <div className={`flex items-center rounded-xl p-2 mb-10
            ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}
          `}>
            <input
              type="text"
              readOnly
              value={inviteLink}
              className={`flex-grow px-3 py-2 bg-transparent focus:outline-none
                ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}
              `}
            />
            <button
              onClick={handleCopy}
              className={`flex items-center px-4 py-2 rounded-lg font-semibold transition-colors duration-200
                ${isDarkMode ? 'bg-teal-600 hover:bg-teal-700 text-white' : 'bg-teal-500 hover:bg-teal-600 text-white'}
              `}
            >
              <HiOutlineDocumentDuplicate size={20} className="mr-2" />
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          <div className={`rounded-xl p-6 ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
            <h2 className="text-xl sm:text-2xl font-semibold mb-6">Invited Friends</h2>
            <div className="space-y-4">
              {invitedFriends.map((friend, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-lg">{friend.name}</p>
                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>{friend.email}</p>
                  </div>
                  {friend.status === 'sent' ? (
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold
                      ${isDarkMode ? 'bg-orange-900 text-orange-300' : 'bg-orange-100 text-orange-600'}
                    `}>
                      Invite sent
                    </span>
                  ) : (
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1
                      ${isDarkMode ? 'bg-cyan-900 text-cyan-300' : 'bg-cyan-100 text-cyan-600'}
                    `}>
                      <HiCheckCircle size={16} />
                      <span>{friend.credits?.toLocaleString()} credits</span>
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
