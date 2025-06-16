import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { HiXMark, HiOutlineMagnifyingGlass } from 'react-icons/hi2';

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

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  groupName: string | null;
  users: UserItem[];
  onAddMembers: (groupName: string, userIds: number[]) => void;
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({
  isOpen,
  onClose,
  isDarkMode,
  groupName,
  users,
  onAddMembers,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsersToAdd, setSelectedUsersToAdd] = useState<number[]>([]);

  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
      setSelectedUsersToAdd([]);
    }
  }, [isOpen]);

  const handleAddClick = () => {
    if (groupName) {
      onAddMembers(groupName, selectedUsersToAdd);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUserSelect = (userId: number) => {
    setSelectedUsersToAdd((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  };

  if (!isOpen || !groupName) return null;

  return (
    <AnimatePresence>
      {isOpen && (
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
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-700">Add Member to {groupName}</h2>
              <button
                onClick={onClose}
                className={`${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'} p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
              >
                <HiXMark size={24} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Search User */}
              <div>
                <label htmlFor="search-user" className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-sm font-medium block mb-2`}>Search and Select Users</label>
                <div className={`relative flex items-center rounded-lg pl-4 pr-3 py-2.5 ${isDarkMode ? 'bg-gray-700 border border-gray-600' : 'bg-white border border-gray-300'} shadow-sm`}>
                  <HiOutlineMagnifyingGlass size={20} className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <input
                    type="text"
                    id="search-user"
                    placeholder="Search user..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`pl-2 bg-transparent focus:outline-none w-full ${isDarkMode ? 'text-gray-100 placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'}`}
                  />
                </div>
              </div>

              {/* User List */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg max-h-60 overflow-y-auto">
                {filteredUsers.length > 0 ? (
                  <ul>
                    {filteredUsers.map((user) => (
                      <li key={user.id} className={`${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} cursor-pointer px-4 py-3 flex items-center justify-between border-b last:border-b-0 border-gray-200 dark:border-gray-700`} onClick={() => handleUserSelect(user.id)}>
                        <div className="flex items-center space-x-3">
                          <Image src={user.avatar} alt={user.name} width={32} height={32} className="rounded-full" />
                          <div>
                            <div className={`${isDarkMode ? 'text-gray-100' : 'text-gray-900'} font-medium`}>{user.name}</div>
                            <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>{user.email}</div>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={selectedUsersToAdd.includes(user.id)}
                          onChange={() => handleUserSelect(user.id)}
                          className="form-checkbox h-4 w-4 text-teal-600 transition duration-150 ease-in-out"
                        />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-center py-4`}>No users found.</p>
                )}
              </div>

              {/* Selected Users Preview */}
              {selectedUsersToAdd.length > 0 && (
                <div>
                  <label className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-sm font-medium block mb-2`}>Selected Users</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedUsersToAdd.map(userId => {
                      const user = users.find(u => u.id === userId);
                      return user ? (
                        <span key={user.id} className={`${isDarkMode ? 'bg-teal-700 text-teal-100' : 'bg-teal-100 text-teal-800'} px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1`}>
                          {user.name}
                          <button onClick={() => handleUserSelect(user.id)} className="ml-1 text-sm font-bold text-gray-500 hover:text-gray-700">×</button>
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
            </div>
            <div className="p-6 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-4">
              <button
                onClick={onClose}
                className={`${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'} px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200`}
              >
                Cancel
              </button>
              <button
                onClick={handleAddClick}
                className={`${isDarkMode ? 'bg-teal-600 hover:bg-teal-700 text-white' : 'bg-teal-500 hover:bg-teal-600 text-white'} px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200`}
              >
                Add Member(s)
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddMemberModal; 