'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTheme } from '../../context/ThemeContext';
import { HiOutlineMagnifyingGlass, HiCheckCircle, HiOutlineEnvelope, HiOutlineInformationCircle, HiOutlineBell } from 'react-icons/hi2';
import Sidebar, { SidebarProps } from '../components/Sidebar';

interface NotificationItem {
  id: number;
  type: 'access_request' | 'billing' | 'info';
  actor?: string;
  actorAvatar?: string;
  target?: string;
  message: string;
  timestamp: string;
  status?: 'unread' | 'read';
}

interface NotificationCardProps {
  notification: NotificationItem;
  isDarkMode: boolean;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  isDarkMode,
}) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'access_request':
        return notification.actorAvatar ? (
          <Image
            src={notification.actorAvatar}
            alt={notification.actor || 'User'}
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center">
            <HiOutlineInformationCircle size={24} className="text-blue-700" />
          </div>
        );
      case 'billing':
        return (
          <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center">
            <HiOutlineEnvelope size={24} className="text-green-700" />
          </div>
        );
      case 'info':
        return (
          <div className="w-10 h-10 rounded-full bg-yellow-200 flex items-center justify-center">
            <HiOutlineInformationCircle size={24} className="text-yellow-700" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-center p-4 rounded-xl shadow-sm ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}
    >
      {notification.status === 'unread' && (
        <span className={`w-2 h-2 rounded-full mr-4 ${isDarkMode ? 'bg-teal-400' : 'bg-teal-500'}`}></span>
      )}
      {!notification.status && (
        <span className="w-2 h-2 rounded-full mr-4 bg-transparent"></span> 
      )}
      {getIcon()}
      <div className="flex-1 ml-4">
        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
          {notification.type === 'access_request' ? (
            <>
              <span className="font-semibold">{notification.actor}</span> {notification.message} <span className="font-semibold">{notification.target}</span>
            </>
          ) : (
            notification.message
          )}
        </p>
      </div>
      <div className="flex items-center space-x-2 ml-4">
        {notification.type === 'access_request' && (
          <>
            <button className={`${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'} px-4 py-2 rounded-lg font-medium text-sm`}>Deny</button>
            <button className={`${isDarkMode ? 'bg-teal-600 hover:bg-teal-700 text-white' : 'bg-teal-500 hover:bg-teal-600 text-white'} px-4 py-2 rounded-lg font-medium text-sm`}>Approve</button>
          </>
        )}
        <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-sm whitespace-nowrap`}>{notification.timestamp}</span>
      </div>
    </motion.div>
  );
};

export default function NotificationsPage() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 1,
      type: 'access_request',
      actor: 'Oliver Thompson',
      actorAvatar: '/images/Oliver.jpg',
      target: 'Greencheck',
      message: 'requested access to join',
      timestamp: '5h ago',
      status: 'unread',
    },
    {
      id: 2,
      type: 'billing',
      message: 'You successfully upgraded your account.',
      timestamp: '1 day ago',
      status: 'unread',
    },
    {
      id: 3,
      type: 'access_request',
      actor: 'Hanna Franci',
      actorAvatar: '/images/Hanna.jpg',
      target: 'Greencheck',
      message: 'requested access to join',
      timestamp: 'October 12, 2023 at 10:15 AM',
      status: 'read',
    },
    {
      id: 4,
      type: 'info',
      message: 'Insufficient credit: You don\'t have any credits in your account.',
      timestamp: 'October 12, 2023 at 10:15 AM',
      status: 'read',
    },
  ]);

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isNaviModalOpen, setIsNaviModalOpen] = useState(false);
  const [isNaviDropdownOpen, setIsNaviDropdownOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNaviChatbotOpen, setIsNaviChatbotOpen] = useState(false);

  const unreadCount = notifications.filter(n => n.status === 'unread').length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, status: 'read' })));
  };

  const filteredNotifications = activeTab === 'all'
    ? notifications
    : notifications.filter(n => n.status === 'unread');

  const todayNotifications = filteredNotifications.filter(n => ['5h ago', '1 day ago'].includes(n.timestamp)); // Simplistic grouping
  const yesterdayNotifications = filteredNotifications.filter(n => n.timestamp.includes('October 12')); // Simplistic grouping

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
        isNaviChatbotOpen={isNaviChatbotOpen}
        setIsNaviChatbotOpen={setIsNaviChatbotOpen}
      />
     <div className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'ml-12' : 'ml-32'} p-6 sm:p-8 overflow-x-hidden flex justify-center`}>
        <div className="w-full max-w-3xl px-8 py-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-extrabold">Notifications</h1>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Stay update with your latest notifications</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`relative flex items-center rounded-xl p-2 ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                <HiOutlineMagnifyingGlass size={20} className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'} ml-2`} />
                <input
                  type="text"
                  placeholder="Search..."
                  className={`ml-2 flex-grow bg-transparent focus:outline-none ${isDarkMode ? 'text-gray-100 placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'}`}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-8">
            <div className={`flex rounded-xl p-1 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${activeTab === 'all' ? (isDarkMode ? 'bg-teal-600 text-white' : 'bg-white text-gray-900 shadow-sm') : (isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100')}`}
              >
                All
              </button>
              <button
                onClick={() => setActiveTab('unread')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${activeTab === 'unread' ? (isDarkMode ? 'bg-teal-600 text-white' : 'bg-white text-gray-900 shadow-sm') : (isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100')}`}
              >
                Unread ({unreadCount})
              </button>
            </div>
            <button
              onClick={markAllAsRead}
              className={`text-sm font-medium flex items-center space-x-1 ${isDarkMode ? 'text-teal-400 hover:text-teal-300' : 'text-teal-600 hover:text-teal-500'}`}
            >
              <HiCheckCircle size={16} />
              <span>Mark all as read</span>
            </button>
          </div>

          <div className="space-y-8">
            {todayNotifications.length > 0 && (
              <div>
                <h2 className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-lg font-semibold mb-4`}>Today</h2>
                <div className="space-y-4">
                  {todayNotifications.map(notification => (
                    <NotificationCard key={notification.id} notification={notification} isDarkMode={isDarkMode} />
                  ))}
                </div>
              </div>
            )}

            {yesterdayNotifications.length > 0 && (
              <div>
                <h2 className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-lg font-semibold mb-4`}>Yesterday</h2>
                <div className="space-y-4">
                  {yesterdayNotifications.map(notification => (
                    <NotificationCard key={notification.id} notification={notification} isDarkMode={isDarkMode} />
                  ))}
                </div>
              </div>
            )}

            {filteredNotifications.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="relative mb-6">
                  <HiOutlineBell size={48} className={`${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                  <span className={`absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full ${isDarkMode ? 'bg-red-600' : 'bg-red-500'}`}>0</span>
                </div>
                <h2 className={`${isDarkMode ? 'text-gray-300' : 'text-gray-800'} text-xl font-semibold mb-2`}>
                  Currently, nothing to report!
                </h2>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-center max-w-sm`}>
                  This area will light up with new notifications once there's activity.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 