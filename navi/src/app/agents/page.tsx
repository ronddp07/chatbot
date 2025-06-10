'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';
import Sidebar from '../components/Sidebar';

export default function AgentsPage() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isNaviModalOpen, setIsNaviModalOpen] = useState(false);
  const [isNaviDropdownOpen, setIsNaviDropdownOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const availableAgents = [
    { name: 'Navi', image: '/images/Navi.png', bgColor: 'from-cyan-400 to-teal-500', description: 'Lorem ipsum' },
    { name: 'Flicka', image: '/images/flicka.png', bgColor: 'from-purple-600 to-indigo-700', description: 'Lorem ipsum' },
    { name: 'Audra', image: '/images/Audra.png', bgColor: 'from-green-600 to-emerald-700', description: 'Lorem ipsum' },
    { name: 'Pixie', image: '/images/Pixie.png', bgColor: 'from-pink-400 to-rose-500', description: 'Lorem ipsum' },
    { name: 'Paige', image: '/images/Paige.png', bgColor: 'from-amber-400 to-orange-500', description: 'Lorem ipsum' },
    { name: 'Neuro', image: null, bgColor: 'from-gray-600 to-gray-700', description: 'Coming Soon' },
  ];

  const comingSoonAgents = [
    { name: 'Navi', image: '/images/Navi.png', bgColor: 'from-cyan-400 to-teal-500', description: 'Lorem ipsum' },
    { name: 'Flicka', image: '/images/flicka.png', bgColor: 'from-purple-600 to-indigo-700', description: 'Lorem ipsum' },
    { name: 'Audra', image: '/images/Audra.png', bgColor: 'from-green-600 to-emerald-700', description: 'Lorem ipsum' },
    { name: 'Pixie', image: '/images/Pixie.png', bgColor: 'from-pink-400 to-rose-500', description: 'Lorem ipsum' },
    { name: 'Paige', image: '/images/Paige.png', bgColor: 'from-amber-400 to-orange-500', description: 'Lorem ipsum' },
    { name: 'Neuro', image: null, bgColor: 'from-gray-600 to-gray-700', description: 'Coming Soon' },
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'} flex font-poppins transition-colors duration-300`}>
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
      <div className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'ml-16' : 'ml-48'} p-4 sm:p-6 overflow-x-hidden`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[calc(100vw-4rem)] mx-auto"
        >
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6 sm:mb-8">
            <div className="text-center sm:text-left w-full">
              <h1 className="text-2xl sm:text-3xl font-extrabold">Meet Your Agents</h1>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm sm:text-base`}>
                Lorem ipsum dolor sit amet consectetur. Etiu eu eu mauris purus. Facibus amet sed ut
              </p>
            </div>
          </div>

          <div className="mb-8 sm:mb-12">
            <h2 className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-lg sm:text-xl font-semibold mb-4 sm:mb-6`}>Available Agents</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {availableAgents.map((agent, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  className={`rounded-xl p-3 sm:p-4 flex flex-col items-center justify-center text-center text-white min-h-[150px] sm:min-h-[200px] bg-gradient-to-br ${agent.bgColor} shadow-lg`}
                >
                  {agent.image ? (
                    <Image src={agent.image} alt={agent.name} width={80} height={80} className="rounded-full mb-2 sm:mb-3" />
                  ) : (
                    <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-gray-500 flex items-center justify-center mb-2 sm:mb-3">
                      <span className="text-gray-300 text-2xl sm:text-4xl">?</span>
                    </div>
                  )}
                  <h3 className="text-lg sm:text-xl font-semibold">{agent.name}</h3>
                  <p className="text-sm sm:text-base opacity-80">{agent.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h2 className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-lg sm:text-xl font-semibold mb-4 sm:mb-6`}>Coming Soon Agents</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {comingSoonAgents.map((agent, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  className={`rounded-xl p-3 sm:p-4 flex flex-col items-center justify-center text-center text-white min-h-[150px] sm:min-h-[200px] bg-gradient-to-br ${agent.bgColor} shadow-lg`}
                >
                  {agent.image ? (
                    <Image src={agent.image} alt={agent.name} width={80} height={80} className="rounded-full mb-2 sm:mb-3" />
                  ) : (
                    <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-gray-500 flex items-center justify-center mb-2 sm:mb-3">
                      <span className="text-gray-300 text-2xl sm:text-4xl">?</span>
                    </div>
                  )}
                  <h3 className="text-lg sm:text-xl font-semibold">{agent.name}</h3>
                  <p className="text-sm sm:text-base opacity-80">{agent.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}