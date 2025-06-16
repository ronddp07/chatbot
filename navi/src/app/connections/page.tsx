'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import Sidebar from '../components/Sidebar';
import {
  HiOutlineInformationCircle,
  HiOutlineEllipsisHorizontal,
  HiOutlinePlus,
  HiMagnifyingGlass,
  HiChevronDown,
  HiChevronUp,
} from 'react-icons/hi2';

interface Connection {
  name: string;
  description: string;
  credits: string;
  isAvailable: boolean;
  bgColor?: string;
  lastUsed?: string;
  category: string;
  status: 'active' | 'inactive' | 'coming_soon';
}

interface ConnectionCardProps {
  connection: Connection;
  onClick: (connection: Connection) => void;
}

const ConnectionCard: React.FC<ConnectionCardProps> = ({
  connection,
  onClick,
}) => {
  const { name, description, credits, isAvailable, bgColor } = connection;
  const { isDarkMode } = useTheme();
  const [isEnabled, setIsEnabled] = useState(isAvailable);

  const handleClick = () => {
    onClick(connection);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      className={`rounded-xl p-5 shadow-xl border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-100' : `${bgColor} border-gray-200 text-gray-900`} flex flex-col cursor-pointer`}
      onClick={handleClick}
    >
      <div className="flex justify-between items-center mb-3">
        <label htmlFor={`toggle-${name}`} className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              id={`toggle-${name}`}
              className="sr-only"
              checked={isEnabled}
              onChange={() => setIsEnabled(!isEnabled)}
            />
            <div
              className={`block w-12 h-6 rounded-full ${isEnabled ? (isDarkMode ? 'bg-teal-700' : 'bg-teal-500') : (isDarkMode ? 'bg-gray-600' : 'bg-gray-300')} transition-colors duration-200`}
            ></div>
            <div
              className={`dot absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${isEnabled ? 'translate-x-6' : 'translate-x-0'}
              `}
            ></div>
          </div>
        </label>
        <div className="flex items-center space-x-3">
          <HiOutlineInformationCircle size={22} className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} cursor-pointer hover:text-teal-500`} />
          <HiOutlineEllipsisHorizontal size={22} className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} cursor-pointer hover:text-teal-500`} />
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className={`text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} flex-grow`}>{description}</p>
      <p className={`text-sm mt-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{credits}</p>
    </motion.div>
  );
};

interface ConnectionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  connection: Connection | null;
}

const ConnectionDetailsModal: React.FC<ConnectionDetailsModalProps> = ({
  isOpen,
  onClose,
  isDarkMode,
  connection,
}) => {
  if (!isOpen || !connection) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl w-full max-w-lg p-8 transform transition-all scale-100 opacity-100`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className={`${isDarkMode ? 'text-white' : 'text-gray-900'} text-3xl font-bold`}>{connection.name}</h2>
              <button onClick={onClose} className={`${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'} focus:outline-none`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-lg font-medium`}>Description:</p>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{connection.description}</p>
              </div>
              <div>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-lg font-medium`}>Credits:</p>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{connection.credits}</p>
              </div>
              <div>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-lg font-medium`}>Status:</p>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {connection.status === 'active' ? 'Active' : connection.status === 'inactive' ? 'Inactive' : 'Coming Soon'}
                </p>
              </div>
              {connection.lastUsed && (
                <div>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-lg font-medium`}>Last Used:</p>
                  <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{connection.lastUsed}</p>
                </div>
              )}
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={onClose}
                className={`${isDarkMode ? 'bg-teal-600 hover:bg-teal-700 text-white' : 'bg-teal-500 hover:bg-teal-600 text-white'} px-6 py-3 rounded-xl font-semibold`}
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function ConnectionsPage() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isNaviModalOpen, setIsNaviModalOpen] = useState(false);
  const [isNaviDropdownOpen, setIsNaviDropdownOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('Status');
  const [isNaviChatbotOpen, setIsNaviChatbotOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState<Connection | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('name-asc');
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  const connectionCategories = ['All', 'OpenAI', 'Anthropic', 'Google DeepMind', 'Mistral / Mixtral', 'More'];
  const statusOptions = ['Status', 'Active', 'Inactive', 'Coming Soon'];
  const sortOptions = [
    { label: 'Name (A-Z)', value: 'name-asc' },
    { label: 'Name (Z-A)', value: 'name-desc' },
    { label: 'Last Used (Newest)', value: 'lastUsed-desc' },
    { label: 'Last Used (Oldest)', value: 'lastUsed-asc' },
  ];

  const connections: Connection[] = [
    { name: 'GPT-4.1', description: 'Internal name often used to refer to improved GPT-4-turbo in 2024.', credits: '0.8 Credits / 1k Tokens', isAvailable: false, lastUsed: '2024-06-15', category: 'OpenAI', status: 'inactive' },
    { name: 'GPT-4.1 nano', description: 'Hypothetical or future model variants for mobile/local deployment (not officially branded).', credits: 'FREE • For paid account only', isAvailable: true, lastUsed: '2024-06-14', category: 'OpenAI', status: 'active' },
    { name: 'o4-mini', description: 'Hypothetical or future model variants for mobile/local deployment (not officially branded).', credits: '0.8 Credits / 1k Tokens', isAvailable: false, lastUsed: '2024-06-13', category: 'OpenAI', status: 'inactive' },
    { name: 'GPT-4-turbo', description: 'Not officially branded, but often refers to an interim improvement in 2024.', credits: '0.8 Credits / 1k Tokens', isAvailable: false, lastUsed: '2024-06-12', category: 'OpenAI', status: 'inactive' },
    { name: 'GPT-3.5-turbo-instruct', description: 'Instruct-tuned version of 3.5, mostly for API compatibility.', credits: '0.8 Credits / 1k Tokens', isAvailable: false, lastUsed: '2024-06-11', category: 'OpenAI', status: 'inactive' },
    { name: 'Claude 1, 2, 3', description: 'Claude 3 family includes Opus (most powerful), Sonnet (balanced), and Haiku (fastest).', credits: '0.8 Credits / 1k Tokens', isAvailable: true, lastUsed: '2024-06-10', category: 'Anthropic', status: 'active' },
    { name: 'Claude 3.5 Opus', description: 'Latest flagship model from Anthropic (mid-2025).', credits: '0.8 Credits / 1k Tokens', isAvailable: true, lastUsed: '2024-06-09', category: 'Anthropic', status: 'active' },
    { name: 'Claude-instant', description: 'Lighter, faster Claude variant.', credits: '0.8 Credits / 1k Tokens', isAvailable: true, lastUsed: '2024-06-08', category: 'Anthropic', status: 'active' },
    { name: 'Gemini 1, 1.5', description: 'Multimodal models with text, image, code understanding.', credits: '0.8 Credits / 1k Tokens', isAvailable: false, lastUsed: '2024-06-07', category: 'Google DeepMind', status: 'inactive' },
    { name: 'Gemini Nano', description: 'On-device variant used in Android and Pixel devices.', credits: '0.8 Credits / 1k Tokens', isAvailable: false, lastUsed: '2024-06-06', category: 'Google DeepMind', status: 'inactive' },
    { name: 'Mistral 7B', description: 'Open-weight LLM by Mistral AI.', credits: '0.8 Credits / 1k Tokens', isAvailable: true, lastUsed: '2024-06-05', category: 'Mistral / Mixtral', status: 'active' },
    { name: 'Mixtral 8x7B', description: 'Mixture-of-Experts model with 8 experts.', credits: '0.8 Credits / 1k Tokens', isAvailable: true, lastUsed: '2024-06-04', category: 'Mistral / Mixtral', status: 'active' },
  ];

  const filteredConnections = connections.filter((connection) => {
    const matchesSearch = connection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          connection.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeTab === 'All' || connection.category === activeTab;
    const matchesStatus = selectedStatus === 'Status' ||
                          (selectedStatus === 'Active' && connection.status === 'active') ||
                          (selectedStatus === 'Inactive' && connection.status === 'inactive') ||
                          (selectedStatus === 'Coming Soon' && connection.status === 'coming_soon');

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const sortedConnections = [...filteredConnections].sort((a, b) => {
    switch (sortOption) {
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'lastUsed-desc':
        return (b.lastUsed || '').localeCompare(a.lastUsed || '');
      case 'lastUsed-asc':
        return (a.lastUsed || '').localeCompare(b.lastUsed || '');
      default:
        return 0;
    }
  });

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
          className="w-full max-w-6xl"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-10">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold">Connections</h1>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-base sm:text-lg mt-2`}>A curated list of connected AI models ready for use in your applications.</p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto mt-4 sm:mt-0">
              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  placeholder="Search connections..."
                  className={`w-full p-3 pl-10 rounded-xl shadow-sm border ${isDarkMode ? 'bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-400' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'} focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <HiMagnifyingGlass size={22} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              <button className="flex items-center justify-center px-4 py-3 bg-teal-500 text-white rounded-xl shadow-md hover:bg-teal-600 transition-colors duration-200 shrink-0">
                <HiOutlinePlus size={22} className="mr-2" /> Add a custom connection
              </button>
            </div>
          </div>

          {/* Categories and Status Filter */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
            <div className={`flex flex-wrap gap-2 mb-4 sm:mb-0 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-xl p-1.5 shadow-sm`}>
              {connectionCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveTab(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    activeTab === category
                      ? isDarkMode
                        ? 'bg-teal-600 text-white shadow-sm'
                        : 'bg-white text-gray-900 shadow-sm'
                      : isDarkMode
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              {/* Sort by dropdown */}
              <div className="relative w-full sm:w-48">
                <button
                  onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl border ${isDarkMode ? 'bg-gray-800 border-gray-600 text-gray-100' : 'bg-white border-gray-200 text-gray-900'} shadow-sm hover:bg-gray-700 transition-colors duration-200`}
                >
                  {sortOptions.find(option => option.value === sortOption)?.label}
                  {isSortDropdownOpen ? <HiChevronUp size={22} /> : <HiChevronDown size={22} />}
                </button>
                <AnimatePresence>
                  {isSortDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className={`absolute right-0 mt-2 w-full rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10 ${isDarkMode ? 'bg-gray-800 ring-gray-700' : 'bg-white ring-gray-200'}`}
                    >
                      <div className="py-1.5">
                        {sortOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setSortOption(option.value);
                              setIsSortDropdownOpen(false);
                            }}
                            className={`block w-full text-left px-4 py-2 text-sm ${isDarkMode ? 'hover:bg-gray-700 text-gray-100' : 'hover:bg-gray-100 text-gray-700'} transition-colors duration-200`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {/* Status filter dropdown */}
              <div className="relative w-full sm:w-48">
                <button
                  onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl border ${isDarkMode ? 'bg-gray-800 border-gray-600 text-gray-100' : 'bg-white border-gray-200 text-gray-900'} shadow-sm hover:bg-gray-700 transition-colors duration-200`}
                >
                  {selectedStatus}
                  {isStatusDropdownOpen ? <HiChevronUp size={22} /> : <HiChevronDown size={22} />}
                </button>
                <AnimatePresence>
                  {isStatusDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className={`absolute right-0 mt-2 w-full rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10 ${isDarkMode ? 'bg-gray-800 ring-gray-700' : 'bg-white ring-gray-200'}`}
                    >
                      <div className="py-1.5">
                        {statusOptions.map((status) => (
                          <button
                            key={status}
                            onClick={() => {
                              setSelectedStatus(status);
                              setIsStatusDropdownOpen(false);
                            }}
                            className={`block w-full text-left px-4 py-2 text-sm ${isDarkMode ? 'hover:bg-gray-700 text-gray-100' : 'hover:bg-gray-100 text-gray-700'} transition-colors duration-200`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Connections Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {sortedConnections.map((connection, index) => (
              <ConnectionCard key={index} connection={connection} onClick={(c) => {
                setSelectedConnection(c);
                setIsDetailsModalOpen(true);
              }} />
            ))}
          </div>
        </motion.div>
      </div>
      <ConnectionDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        isDarkMode={isDarkMode}
        connection={selectedConnection}
      />
    </div>
  );
}