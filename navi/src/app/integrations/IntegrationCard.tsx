'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { HiOutlineInformationCircle, HiOutlineEllipsisHorizontal, HiCheckCircle, HiOutlineCheck, HiOutlinePlus, HiOutlineTrash } from 'react-icons/hi2';

interface IntegrationCardProps {
  name: string;
  description: string;
  icon: string;
  status: 'connected' | 'not-connected';
  connectedAccount?: string;
  isDarkMode: boolean;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({
  name,
  description,
  icon,
  status,
  connectedAccount,
  isDarkMode,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isInfoDropdownOpen, setIsInfoDropdownOpen] = useState(false);
  const [accounts, setAccounts] = useState<string[]>(connectedAccount ? [connectedAccount] : []);

  const handleAddAccount = () => {
    const newAccountEmail = `newaccount${accounts.length + 1}@example.com`;
    setAccounts((prevAccounts) => [...prevAccounts, newAccountEmail]);
  };

  const handleDeleteAccount = (emailToDelete: string) => {
    setAccounts((prevAccounts) =>
      prevAccounts.filter((email) => email !== emailToDelete)
    );
  };

  const AccountDropdown = () => (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className={`absolute top-full right-0 mt-2 w-64 rounded-xl shadow-lg ring-1 ring-opacity-5 focus:outline-none z-50 transform origin-top-right ${isDarkMode ? 'bg-gray-800 text-gray-100 ring-gray-700' : 'bg-white text-gray-900 ring-gray-200'}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="py-1">
        {accounts.length > 0 ? (
          accounts.map((email) => (
            <div key={email} className={`flex items-center px-4 py-2 text-sm justify-between ${isDarkMode ? 'text-gray-100 hover:bg-gray-700' : 'text-gray-900 hover:bg-gray-100'}`}>
              <div className="flex items-center">
                <HiOutlineCheck size={20} className="mr-3 text-emerald-500" />
                <span>{email}</span>
              </div>
              <HiOutlineTrash 
                size={20} 
                className={`cursor-pointer ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} hover:text-red-500`}
                onClick={() => handleDeleteAccount(email)}
              />
            </div>
          ))
        ) : (
          <p className={`px-4 py-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>No accounts connected</p>
        )}
        <div className={`border-t my-1 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}></div>
        <button
          onClick={handleAddAccount}
          className={`flex items-center w-full px-4 py-2 text-sm ${isDarkMode ? 'hover:bg-gray-700 text-gray-100' : 'hover:bg-gray-100 text-gray-900'}`}
        >
          <HiOutlinePlus size={20} className="mr-3" /> Add new account
        </button>
      </div>
    </motion.div>
  );

  const InfoDropdown = () => (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className={`absolute top-full right-0 mt-2 w-64 rounded-xl shadow-lg ring-1 ring-opacity-5 focus:outline-none z-50 transform origin-top-right ${isDarkMode ? 'bg-gray-800 text-gray-100 ring-gray-700' : 'bg-white text-gray-900 ring-gray-200'}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="py-1">
        {[ 'Send an email', 'Send a reply email in thread', 'Get emails by sender', 'Get emails by subject', 'Etc'].map((item, index) => (
          <div key={index} className={`flex items-center px-4 py-2 text-sm ${isDarkMode ? 'hover:bg-gray-700 text-gray-100' : 'hover:bg-gray-100 text-gray-900'}`}>
            <HiOutlineCheck size={20} className="mr-3 text-emerald-500" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <motion.div
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className={`relative rounded-xl p-6 shadow-md flex flex-col items-start
        ${isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-100' : 'bg-white border border-gray-200 text-gray-900'}
      `}
    >
      <div className="flex justify-between w-full mb-4">
        <Image src={icon} alt={name} width={48} height={48} className="rounded-lg" />
        <div className="flex space-x-2">
          <div className="relative">
            <button 
              className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              onClick={() => setIsInfoDropdownOpen(!isInfoDropdownOpen)}
            >
              <HiOutlineInformationCircle size={20} className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            </button>
            {isInfoDropdownOpen && <InfoDropdown />}
          </div>
          <div className="relative">
            <button 
              className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <HiOutlineEllipsisHorizontal size={20} className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            </button>
            {isDropdownOpen && <AccountDropdown />}
          </div>
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm flex-grow mb-4`}>{description}</p>

      {status === 'connected' ? (
        <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full ${isDarkMode ? 'bg-teal-900 text-teal-300' : 'bg-teal-50 text-teal-600'} text-sm font-medium`}>
          <HiCheckCircle size={18} />
          <span>{connectedAccount}</span>
        </div>
      ) : (
        <button className={`w-full py-2 rounded-lg font-semibold
          ${isDarkMode ? 'bg-teal-600 hover:bg-teal-700 text-white' : 'bg-teal-500 hover:bg-teal-600 text-white'}
        `}>
          Connect
        </button>
      )}
    </motion.div>
  );
};

export default IntegrationCard; 