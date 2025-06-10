'use client';

import React from 'react';
import Image from 'next/image';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';
import { HiOutlineInformationCircle, HiOutlineEllipsisHorizontal, HiCheckCircle } from 'react-icons/hi2';

interface IntegrationCardProps {
  name: string;
  description: string;
  icon: string;
  status: 'connected' | 'not-connected';
  connectedAccount?: string;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({
  name,
  description,
  icon,
  status,
  connectedAccount,
}) => {
  const { isDarkMode } = useTheme();

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
          <button className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
            <HiOutlineInformationCircle size={20} className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          </button>
          <button className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
            <HiOutlineEllipsisHorizontal size={20} className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          </button>
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