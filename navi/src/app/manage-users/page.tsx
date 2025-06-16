'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useTheme } from '../../context/ThemeContext';
import { HiOutlineMagnifyingGlass, HiOutlineUserPlus, HiLink, HiOutlinePlus, HiOutlineEnvelope, HiEllipsisHorizontal, HiOutlinePencil, HiOutlineKey, HiOutlineUserGroup, HiOutlineTrash, HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';
import Sidebar from '../components/Sidebar';
import AddMemberModal from '../components/AddMemberModal';

interface UserItem {
  id: number;
  name: string;
  email: string;
  avatar: string;
  access: 'Owner' | 'Admin' | 'Support Agent' | 'Team Lead' | 'Requested';
  group: 'Admin' | 'Tech Virtual Assistant' | 'Chat Support' | 'Not Assigned' | string;
  credit: 'Unlimited' | number;
  agents: string[];
  status?: 'pending' | 'active';
}

export default function ManageUsersPage() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState<'all' | 'unassigned' | 'groups'>('all');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isNaviModalOpen, setIsNaviModalOpen] = useState(false);
  const [isNaviDropdownOpen, setIsNaviDropdownOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNaviChatbotOpen, setIsNaviChatbotOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [creditLimit, setCreditLimit] = useState<number | ''>('');
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [users, setUsers] = useState<UserItem[]>([
    {
      id: 1,
      name: 'Oliver Thompson',
      email: 'oliverthompson@email.com',
      avatar: '/images/Oliver.jpg',
      access: 'Owner',
      group: 'Admin',
      credit: 'Unlimited',
      agents: ['N', 'P', 'C'],
    },
    {
      id: 2,
      name: 'Gretchen Schleifer',
      email: 'gretchen@email.com',
      avatar: '/images/Gretchen.jpg',
      access: 'Admin',
      group: 'Admin',
      credit: 'Unlimited',
      agents: ['N', 'P', 'C'],
    },
    {
      id: 3,
      name: 'Cristofer Stanton',
      email: 'cristoferpson@email.com',
      avatar: '/images/Cristofer.jpg',
      access: 'Support Agent',
      group: 'Tech Virtual Assistant',
      credit: 5000,
      agents: ['N', 'P', 'C', '+2'],
    },
    {
      id: 4,
      name: 'Hanna Kenter',
      email: 'hanna@email.com',
      avatar: '/images/Hanna.jpg',
      access: 'Team Lead',
      group: 'Tech Virtual Assistant',
      credit: 10000,
      agents: ['N', 'P', 'C'],
    },
    {
      id: 5,
      name: 'Jaxson Herwitz',
      email: 'jaxson@email.com',
      avatar: '/images/Jaxson.jpg',
      access: 'Support Agent',
      group: 'Tech Virtual Assistant',
      credit: 5000,
      agents: ['N', 'C'],
    },
    {
      id: 6,
      name: 'Marcus Korsgaard',
      email: 'marcus@email.com',
      avatar: '/images/Marcus.jpg',
      access: 'Team Lead',
      group: 'Chat Support',
      credit: 10000,
      agents: ['N', 'F'],
    },
    {
      id: 7,
      name: 'Martin Ekstrom Bothman',
      email: 'martin@email.com',
      avatar: '/images/Martin.jpg',
      access: 'Support Agent',
      group: 'Chat Support',
      credit: 5000,
      agents: ['N', 'C'],
    },
    {
      id: 8,
      name: 'Ann George',
      email: 'ann@email.com',
      avatar: '/images/Ann.jpg',
      access: 'Support Agent',
      group: 'Chat Support',
      credit: 5000,
      agents: ['N', 'C'],
    },
    {
      id: 9,
      name: 'Martin Torff',
      email: 'martintorff@email.com',
      avatar: '/images/Martin.jpg',
      access: 'Requested',
      group: 'Not Assigned',
      credit: 0,
      agents: [],
    },
    {
      id: 10,
      name: 'Carter Saris',
      email: 'cartersaris@email.com',
      avatar: '/images/Carter.jpg',
      access: 'Requested',
      group: 'Not Assigned',
      credit: 0,
      agents: [],
    },
    {
      id: 11,
      name: 'Charlie Press',
      email: 'charlie@email.com',
      avatar: '/images/Charlie.jpg',
      access: 'Requested',
      group: 'Not Assigned',
      credit: 0,
      agents: [],
      status: 'pending',
    },
    {
      id: 12,
      name: 'Cheyenne Bator',
      email: 'cheyenne@email.com',
      avatar: '/images/Cheyenne.jpg',
      access: 'Requested',
      group: 'Not Assigned',
      credit: 0,
      agents: [],
      status: 'pending',
    },
    {
      id: 13,
      name: 'James Levin',
      email: 'james@email.com',
      avatar: '/images/James.jpg',
      access: 'Requested',
      group: 'Not Assigned',
      credit: 0,
      agents: [],
      status: 'pending',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [selectedGroupForAddMember, setSelectedGroupForAddMember] = useState<string | null>(null);

  const unassignedCount = users.filter(user => user.group === 'Not Assigned').length;
  const allUsersCount = users.length;
  const groupsCount = [...new Set(users.map(user => user.group).filter(group => group !== 'Not Assigned'))].length;

  const groupedUsers = users.reduce((acc, user) => {
    if (user.group !== 'Not Assigned') {
      if (!acc[user.group]) {
        acc[user.group] = [];
      }
      acc[user.group].push(user);
    }
    return acc;
  }, {} as Record<string, UserItem[]>);

  const filteredUsers = activeTab === 'all'
    ? users
    : activeTab === 'unassigned'
      ? users.filter(user => user.group === 'Not Assigned')
      : users; // Placeholder for now, will be replaced with grouped rendering

  const getAccessTagClass = (access: UserItem['access']) => {
    switch (access) {
      case 'Owner':
        return 'bg-blue-100 text-blue-800';
      case 'Admin':
        return 'bg-purple-100 text-purple-800';
      case 'Support Agent':
        return 'bg-yellow-100 text-yellow-800';
      case 'Team Lead':
        return 'bg-green-100 text-green-800';
      case 'Requested':
        return 'bg-gray-100 text-gray-800';
      default:
        return '';
    }
  };

  const handleDeleteUser = (userId: number) => {
    setShowDeleteConfirm(userId);
  };

  const confirmDelete = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId));
    setShowDeleteConfirm(null);
    setOpenDropdownId(null);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(null);
  };

  const openAddMemberModal = (groupName: string) => {
    setSelectedGroupForAddMember(groupName);
    setShowAddMemberModal(true);
  };

  const closeAddMemberModal = () => {
    setShowAddMemberModal(false);
    setSelectedGroupForAddMember(null);
  };

  const handleAddMembersToGroup = (groupName: string, userIds: number[]) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        userIds.includes(user.id) ? { ...user, group: groupName } : user
      )
    );
    closeAddMemberModal();
  };

  const renderUserTable = () => (
    <div className="mt-8 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} sticky top-0 z-10`}>
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <input type="checkbox" className="form-checkbox h-4 w-4 text-teal-600 transition duration-150 ease-in-out" />
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Access</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credit</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agents</th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredUsers.map((user) => (
            <tr key={user.id} className={`${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors duration-200`}>
              <td className="px-6 py-4 whitespace-nowrap">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-teal-600 transition duration-150 ease-in-out" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <Image className="h-10 w-10 rounded-full object-cover" src={user.avatar} alt={user.name} width={40} height={40} />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{user.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${getAccessTagClass(user.access)}`}>
                  {user.access}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {user.group === 'Not Assigned' ? (
                  <select className={`block w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 ${isDarkMode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'bg-white text-gray-700 border-gray-300'}`}>
                    <option>Assign Group</option>
                    <option>Admin</option>
                    <option>Tech Virtual Assistant</option>
                    <option>Chat Support</option>
                  </select>
                ) : (
                  user.group
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {typeof user.credit === 'number' ? `$${user.credit.toLocaleString()}` : (
                  <div className="flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-teal-500 mr-2"></span>
                    {user.credit}
                  </div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {user.agents.length > 0 ? (
                  <div className="flex space-x-2">
                    {user.agents.slice(0, 2).map((agent, agentIndex) => (
                      <span key={agentIndex} className={`inline-flex items-center justify-center h-6 w-6 rounded-full text-xs font-medium ${isDarkMode ? 'bg-gray-600 text-gray-200' : 'bg-gray-200 text-gray-700'}`}>
                        {agent}
                      </span>
                    ))}
                    {user.agents.length > 2 && (
                      <span className={`inline-flex items-center justify-center h-6 w-6 rounded-full text-xs font-medium ${isDarkMode ? 'bg-gray-600 text-gray-200' : 'bg-gray-200 text-gray-700'}`}>
                        +{user.agents.length - 2}
                      </span>
                    )}
                  </div>
                ) : (
                  <span className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>-</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="relative inline-block text-right">
                  <button
                    onClick={() => setOpenDropdownId(openDropdownId === user.id ? null : user.id)}
                    className={`${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-100'} p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500`}
                    aria-expanded={openDropdownId === user.id}
                    aria-haspopup="true"
                  >
                    <span className="sr-only">Open options</span>
                    <HiEllipsisHorizontal size={20} />
                  </button>
                  <AnimatePresence>
                    {openDropdownId === user.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.1 }}
                        className={`${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10`}
                      >
                        <div className="py-1">
                          <button onClick={() => console.log('Edit')} className={`${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} flex items-center px-4 py-2 text-sm w-full text-left`}>
                            <HiOutlinePencil size={18} className="mr-2" />
                            Edit
                          </button>
                          <button onClick={() => console.log('Assign Access')} className={`${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} flex items-center px-4 py-2 text-sm w-full text-left`}>
                            <HiOutlineKey size={18} className="mr-2" />
                            Assign Access
                          </button>
                          <button onClick={() => console.log('Assign Group')} className={`${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} flex items-center px-4 py-2 text-sm w-full text-left`}>
                            <HiOutlineUserGroup size={18} className="mr-2" />
                            Assign Group
                          </button>
                          <button onClick={() => handleDeleteUser(user.id)} className={`${isDarkMode ? 'text-red-400 hover:bg-gray-700' : 'text-red-600 hover:bg-gray-100'} flex items-center px-4 py-2 text-sm w-full text-left`}>
                            <HiOutlineTrash size={18} className="mr-2" />
                            Delete
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <AnimatePresence>
                    {showDeleteConfirm === user.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.1 }}
                        className={`${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} origin-top-right absolute right-0 mt-2 w-96 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20`}
                      >
                        <div className="p-5">
                          <div className="flex items-center mb-4">
                            <div className={`flex-shrink-0 p-2 rounded-full ${isDarkMode ? 'bg-red-900/50' : 'bg-red-100'}`}>
                              <HiOutlineTrash size={20} className={`${isDarkMode ? 'text-red-400' : 'text-red-600'}`} />
                            </div>
                            <h3 className={`${isDarkMode ? 'text-gray-200' : 'text-gray-900'} text-base font-semibold ml-3`}>Delete User</h3>
                          </div>
                          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-sm mb-5 leading-relaxed`}>
                            Are you sure you want to delete <span className="font-medium">{user.name}</span>?
                          </p>
                          <div className="flex justify-end space-x-3">
                            <button
                              onClick={cancelDelete}
                              className={`${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'} px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200`}
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => confirmDelete(user.id)}
                              className={`${isDarkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200`}
                            >
                              Delete User
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderGroupedUsers = () => {
    const sortedGroupNames = Object.keys(groupedUsers).sort((a, b) => {
      // Custom sorting for group names as per the image (Admins, Tech Virtual Group, Chat Support Group)
      const order = {
        'Admin': 1,
        'Tech Virtual Assistant': 2,
        'Chat Support': 3,
      };
      const orderA = order[a as keyof typeof order] || 99;
      const orderB = order[b as keyof typeof order] || 99;
      return orderA - orderB;
    });

    return (
      <div className="mt-8 space-y-8">
        {sortedGroupNames.map(groupName => (
          <div key={groupName} className={`${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} rounded-lg shadow-sm overflow-hidden`}>
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className={`${isDarkMode ? 'text-gray-200' : 'text-gray-800'} text-lg font-semibold`}>{groupName}</h2>
              <div className="flex items-center space-x-4">
                <button className={`${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'} flex items-center space-x-2 text-sm font-medium p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700`} onClick={() => openAddMemberModal(groupName)}>
                  <HiOutlineUserPlus size={18} />
                  <span>Add Member</span>
                </button>
                <button className={`${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'} p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700`}>
                  <HiOutlineAdjustmentsHorizontal size={18} />
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <input type="checkbox" className="form-checkbox h-4 w-4 text-teal-600 transition duration-150 ease-in-out" />
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Access</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credit</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agents</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {groupedUsers[groupName].map((user) => (
                    <tr key={user.id} className={`${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors duration-200`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input type="checkbox" className="form-checkbox h-4 w-4 text-teal-600 transition duration-150 ease-in-out" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <Image className="h-10 w-10 rounded-full object-cover" src={user.avatar} alt={user.name} width={40} height={40} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{user.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${getAccessTagClass(user.access)}`}>
                          {user.access}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {typeof user.credit === 'number' ? `$${user.credit.toLocaleString()}` : (
                          <div className="flex items-center">
                            <span className="inline-block w-2 h-2 rounded-full bg-teal-500 mr-2"></span>
                            {user.credit}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {user.agents.length > 0 ? (
                          <div className="flex space-x-2">
                            {user.agents.slice(0, 2).map((agent, agentIndex) => (
                              <span key={agentIndex} className={`inline-flex items-center justify-center h-6 w-6 rounded-full text-xs font-medium ${isDarkMode ? 'bg-gray-600 text-gray-200' : 'bg-gray-200 text-gray-700'}`}>
                                {agent}
                              </span>
                            ))}
                            {user.agents.length > 2 && (
                              <span className={`inline-flex items-center justify-center h-6 w-6 rounded-full text-xs font-medium ${isDarkMode ? 'bg-gray-600 text-gray-200' : 'bg-gray-200 text-gray-700'}`}>
                                +{user.agents.length - 2}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="relative inline-block text-right">
                          <button
                            onClick={() => setOpenDropdownId(openDropdownId === user.id ? null : user.id)}
                            className={`${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-100'} p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500`}
                            aria-expanded={openDropdownId === user.id}
                            aria-haspopup="true"
                          >
                            <span className="sr-only">Open options</span>
                            <HiEllipsisHorizontal size={20} />
                          </button>
                          <AnimatePresence>
                            {openDropdownId === user.id && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.1 }}
                                className={`${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10`}
                              >
                                <div className="py-1">
                                  <button onClick={() => console.log('Edit')} className={`${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} flex items-center px-4 py-2 text-sm w-full text-left`}>
                                    <HiOutlinePencil size={18} className="mr-2" />
                                    Edit
                                  </button>
                                  <button onClick={() => console.log('Assign Access')} className={`${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} flex items-center px-4 py-2 text-sm w-full text-left`}>
                                    <HiOutlineKey size={18} className="mr-2" />
                                    Assign Access
                                  </button>
                                  <button onClick={() => console.log('Assign Group')} className={`${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} flex items-center px-4 py-2 text-sm w-full text-left`}>
                                    <HiOutlineUserGroup size={18} className="mr-2" />
                                    Assign Group
                                  </button>
                                  <button onClick={() => handleDeleteUser(user.id)} className={`${isDarkMode ? 'text-red-400 hover:bg-gray-700' : 'text-red-600 hover:bg-gray-100'} flex items-center px-4 py-2 text-sm w-full text-left`}>
                                    <HiOutlineTrash size={18} className="mr-2" />
                                    Delete
                                  </button>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                          <AnimatePresence>
                            {showDeleteConfirm === user.id && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.1 }}
                                className={`${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} origin-top-right absolute right-0 mt-2 w-96 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20`}
                              >
                                <div className="p-5">
                                  <div className="flex items-center mb-4">
                                    <div className={`flex-shrink-0 p-2 rounded-full ${isDarkMode ? 'bg-red-900/50' : 'bg-red-100'}`}>
                                      <HiOutlineTrash size={20} className={`${isDarkMode ? 'text-red-400' : 'text-red-600'}`} />
                                    </div>
                                    <h3 className={`${isDarkMode ? 'text-gray-200' : 'text-gray-900'} text-base font-semibold ml-3`}>Delete User</h3>
                                  </div>
                                  <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-sm mb-5 leading-relaxed`}>
                                    Are you sure you want to delete <span className="font-medium">{user.name}</span>?
                                  </p>
                                  <div className="flex justify-end space-x-3">
                                    <button
                                      onClick={cancelDelete}
                                      className={`${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'} px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200`}
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      onClick={() => confirmDelete(user.id)}
                                      className={`${isDarkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200`}
                                    >
                                      Delete User
                                    </button>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} flex font-poppins transition-colors duration-300`}>
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
      <div className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'ml-12' : 'ml-32'} p-4 sm:p-6 lg:p-8 overflow-x-auto`}>
        <div className="w-full max-w-6xl mx-auto">
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-500">Manage Users</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-base sm:text-lg mt-2`}>Manage your team members and their account permissions.</p>
              </div>
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-4 sm:mt-0">
                <div className={`relative flex items-center rounded-full pl-4 pr-3 py-2.5 ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-sm`}>
                  <HiOutlineMagnifyingGlass size={20} className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <input
                    type="text"
                    placeholder="Search user..."
                    className={`pl-2 bg-transparent focus:outline-none w-48 sm:w-64 ${isDarkMode ? 'text-gray-100 placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'}`}
                  />
                </div>
                <button className={`${isDarkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-white border-gray-200 hover:bg-gray-100'} border px-3 py-2.5 rounded-lg flex items-center justify-center shadow-sm`}>
                  <HiOutlineAdjustmentsHorizontal size={20} className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                </button>
                <button className={`${isDarkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-white border-gray-200 hover:bg-gray-100'} border px-4 py-2.5 rounded-lg text-sm font-medium flex items-center space-x-2 shadow-sm`} onClick={() => setShowCreateGroupModal(true)}>
                  <HiOutlinePlus size={20} className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <span>Create Groups</span>
                </button>
                <button className={`${isDarkMode ? 'bg-teal-600 hover:bg-teal-700 text-white' : 'bg-teal-500 hover:bg-teal-600 text-white'} px-4 py-2.5 rounded-lg text-sm font-medium flex items-center space-x-2 shadow-md`}>
                  <HiOutlineEnvelope size={20} />
                  <span>Invite User</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className={`flex rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} p-1 shadow-sm`}>
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 ${activeTab === 'all' ? (isDarkMode ? 'bg-teal-600 text-white' : 'bg-white text-gray-900 shadow-inner') : (isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-200')}`}
                >
                  All Users ({allUsersCount})
                </button>
                <button
                  onClick={() => setActiveTab('unassigned')}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 ${activeTab === 'unassigned' ? (isDarkMode ? 'bg-teal-600 text-white' : 'bg-white text-gray-900 shadow-inner') : (isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-200')}`}
                >
                  Unassigned ({unassignedCount})
                </button>
                <button
                  onClick={() => setActiveTab('groups')}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 ${activeTab === 'groups' ? (isDarkMode ? 'bg-teal-600 text-white' : 'bg-white text-gray-900 shadow-inner') : (isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-200')}`}
                >
                  Groups ({groupsCount})
                </button>
              </div>
            </div>
          </div>

          {activeTab === 'groups' ? renderGroupedUsers() : (filteredUsers.length > 0 ? renderUserTable() : (
            <div className="flex flex-col items-center justify-center py-12 text-center w-full max-w-md mx-auto">
              <div className="relative mb-6">
                <HiOutlineUserPlus size={48} className={`${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                <span className={`absolute bottom-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white ${isDarkMode ? 'bg-teal-600' : 'bg-teal-500'} rounded-full`}>
                  <HiOutlinePlus size={16} />
                </span>
              </div>
              <h2 className={`${isDarkMode ? 'text-gray-300' : 'text-gray-800'} text-xl font-semibold mb-2`}>Invite your first user</h2>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-center max-w-md`}>Add your team members and external users.</p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-6 w-full">
                <button className={`${isDarkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-white border-gray-200 hover:bg-gray-100'} border px-6 py-3 rounded-xl text-sm font-medium flex items-center space-x-2 shadow-sm w-full sm:w-auto`}>
                  <HiLink size={20} className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <span>Copy Share Link</span>
                </button>
                <button className={`${isDarkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-white border-gray-200 hover:bg-gray-100'} border px-6 py-3 rounded-xl text-sm font-medium flex items-center space-x-2 shadow-sm w-full sm:w-auto`}>
                  <HiOutlinePlus size={20} className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <span>Create Groups</span>
                </button>
                <button className={`${isDarkMode ? 'bg-teal-600 hover:bg-teal-700 text-white' : 'bg-teal-500 hover:bg-teal-600 text-white'} px-6 py-3 rounded-xl text-sm font-medium flex items-center space-x-2 shadow-md w-full sm:w-auto`}>
                  <HiOutlineEnvelope size={20} />
                  <span>Invite User</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Group Modal */}
      <AnimatePresence>
        {showCreateGroupModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 ${isDarkMode ? 'bg-gray-900/80' : 'bg-gray-500/80'} flex items-center justify-center z-50`}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'} rounded-2xl shadow-xl w-full max-w-lg mx-4 overflow-hidden`}
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-700">Create Group</h2>
                <button
                  onClick={() => setShowCreateGroupModal(false)}
                  className={`${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'} p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6 space-y-6">
                {/* Group Name */}
                <div>
                  <label htmlFor="group-name" className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-sm font-medium block mb-2`}>Group Name</label>
                  <input
                    type="text"
                    id="group-name"
                    placeholder="Virtual Assistant"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' : 'border-gray-300 text-gray-900 placeholder-gray-500'}`}
                  />
                </div>

                {/* Credit Limit */}
                <div>
                  <label htmlFor="credit-limit" className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-sm font-medium block mb-2`}>Credit Limit</label>
                  <input
                    type="number"
                    id="credit-limit"
                    placeholder="5,000"
                    value={creditLimit}
                    onChange={(e) => {
                      const value = e.target.value === '' ? '' : Number(e.target.value);
                      setCreditLimit(value);
                    }}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' : 'border-gray-300 text-gray-900 placeholder-gray-500'}`}
                  />
                </div>

                {/* AI Agents */}
                <div>
                  <label htmlFor="ai-agents" className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-sm font-medium block mb-2`}>AI Agents</label>
                  <div className={`relative w-full ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'} border rounded-lg focus-within:ring-2 focus-within:ring-teal-500`}>
                    <select
                      id="ai-agents"
                      multiple
                      value={selectedAgents}
                      onChange={(e) => setSelectedAgents(Array.from(e.target.options).filter(option => option.selected).map(option => option.value))}
                      className={`block w-full px-4 py-3 text-base rounded-lg cursor-pointer appearance-none ${isDarkMode ? 'bg-gray-700 text-gray-100' : 'bg-transparent text-gray-900'} focus:outline-none`}
                      style={{ minHeight: '50px' }}
                    >
                      <option value="" disabled>Select an agent</option>
                      <option value="N">Navi</option>
                      <option value="P">Phoebe</option>
                      <option value="C">Cody</option>
                      <option value="F">Finch</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9l4.95 4.95z"/></svg>
                    </div>
                  </div>
                  {selectedAgents.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedAgents.map(agent => (
                        <span key={agent} className={`${agent === 'N' ? 'bg-green-100 text-green-800' : 'bg-pink-100 text-pink-800'} px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1`}>
                          {agent === 'N' ? 'Navi' : 'Emmy'}
                          <button onClick={() => setSelectedAgents(selectedAgents.filter(a => a !== agent))} className="ml-1 text-sm font-bold text-gray-500 hover:text-gray-700">×</button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Add User */}
                <div>
                  <label htmlFor="add-user" className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-sm font-medium block mb-2`}>Add User</label>
                  <div className={`relative w-full ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'} border rounded-lg focus-within:ring-2 focus-within:ring-teal-500`}>
                    <input
                      type="text"
                      id="add-user"
                      placeholder="Search member"
                      className={`block w-full px-4 py-3 text-base rounded-lg cursor-pointer appearance-none ${isDarkMode ? 'bg-gray-700 text-gray-100' : 'bg-transparent text-gray-900'} focus:outline-none`}
                      style={{ minHeight: '50px' }}
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                      <svg className="fill-current h-4 w-4 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9l4.95 4.95z"/></svg>
                    </div>
                  </div>
                  {selectedUsers.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedUsers.map(userId => {
                        const user = users.find(u => u.id.toString() === userId);
                        return user ? (
                          <span key={user.id} className={`${isDarkMode ? 'bg-teal-700 text-teal-100' : 'bg-teal-100 text-teal-800'} px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1`}>
                            {user.name}
                            <button onClick={() => setSelectedUsers(selectedUsers.filter(id => id !== userId.toString()))} className="ml-1 text-sm font-bold text-gray-500 hover:text-gray-700">×</button>
                          </span>
                        ) : null;
                      })}
                    </div>
                  )}
                </div>
              </div>
              <div className="p-6 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-4">
                <button
                  onClick={() => setShowCreateGroupModal(false)}
                  className={`${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'} px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200`}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    console.log('Create Group:', { groupName, creditLimit, selectedAgents, selectedUsers });
                    setShowCreateGroupModal(false);
                    setGroupName('');
                    setCreditLimit('');
                    setSelectedAgents([]);
                    setSelectedUsers([]);
                  }}
                  className={`${isDarkMode ? 'bg-teal-600 hover:bg-teal-700 text-white' : 'bg-teal-500 hover:bg-teal-600 text-white'} px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200`}
                >
                  Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AddMemberModal
        isOpen={showAddMemberModal}
        onClose={closeAddMemberModal}
        isDarkMode={isDarkMode}
        groupName={selectedGroupForAddMember}
        users={users.filter(user => user.group !== selectedGroupForAddMember)}
        onAddMembers={handleAddMembersToGroup}
      />
    </div>
  );
}