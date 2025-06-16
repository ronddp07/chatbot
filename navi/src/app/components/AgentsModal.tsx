'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { HiXMark, HiChevronDown } from 'react-icons/hi2';

interface AgentItem {
  name: string;
  image: string | null;
  bgColor: string;
  description: string;
  mood: string;
  aiModel: string;
  customTraits: string;
}

interface AgentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  agent: AgentItem | null;
}

const AgentsModal: React.FC<AgentsModalProps> = ({ isOpen, onClose, isDarkMode, agent }) => {
  const [mood, setMood] = useState('Business Casual');
  const [aiModel, setAiModel] = useState('GPT-4');
  const [customTraits, setCustomTraits] = useState('');

  useEffect(() => {
    if (agent) {
      setMood(agent.mood);
      setAiModel(agent.aiModel);
      setCustomTraits(agent.customTraits);
    }
  }, [agent]);

  const handleSaveChanges = () => {
    // In a real application, you would send these changes to your backend
    console.log('Saved changes for', agent?.name, { mood, aiModel, customTraits });
    onClose();
  };

  if (!isOpen || !agent) return null;

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
            className="bg-white rounded-3xl shadow-xl w-full max-w-2xl mx-4 overflow-hidden"
          >
            <div className={`relative h-40 rounded-t-3xl overflow-hidden ${agent.bgColor} flex items-center justify-between p-8`}>
              <div className="flex flex-col">
                <h2 className="text-white text-3xl font-bold">{agent.name}</h2>
                <p className="text-white text-opacity-90 mt-1 pr-16">{agent.description}</p>
              </div>
              {agent.image && (
                <Image
                  src={agent.image}
                  alt={agent.name}
                  width={160}
                  height={160}
                  className="absolute -bottom-8 right-6"
                />
              )}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white"
              >
                <HiXMark size={24} />
              </button>
            </div>

            <div className="p-8 space-y-6">
              {/* Mood */}
              <div>
                <label className="block text-lg font-semibold mb-2 text-gray-700">Mood</label>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => setMood('Strictly Professional')}
                    className={`py-2 px-4 rounded-full text-base font-semibold transition-colors duration-200
                    ${mood === 'Strictly Professional' ? 'bg-white text-teal-700 border-teal-500 shadow-sm' : 'bg-white text-gray-800 border-gray-300 hover:border-gray-400'} border`}
                  >
                    Strictly Professional
                  </button>
                  <button
                    onClick={() => setMood('Business Casual')}
                    className={`py-2 px-4 rounded-full text-base font-semibold transition-colors duration-200
                    ${mood === 'Business Casual' ? 'bg-white text-teal-700 border-teal-500 shadow-sm' : 'bg-white text-gray-800 border-gray-300 hover:border-gray-400'} border`}
                  >
                    Business Casual
                  </button>
                  <button
                    onClick={() => setMood('Friendly and Relaxed')}
                    className={`py-2 px-4 rounded-full text-base font-semibold transition-colors duration-200
                    ${mood === 'Friendly and Relaxed' ? 'bg-white text-teal-700 border-teal-500 shadow-sm' : 'bg-white text-gray-800 border-gray-300 hover:border-gray-400'} border`}
                  >
                    Friendly and Relaxed
                  </button>
                </div>
              </div>

              {/* AI Model */}
              <div>
                <label className="block text-lg font-semibold mb-2 text-gray-700">AI Model</label>
                <div className="relative">
                  <select
                    value={aiModel}
                    onChange={(e) => setAiModel(e.target.value)}
                    className="block w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:border-teal-500 focus:ring-0 text-gray-900 h-[50px]"
                    style={{ minHeight: '50px' }}
                  >
                    <option value="GPT-4">GPT-4</option>
                    <option value="GPT-3">GPT-3</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <HiChevronDown className="text-gray-500" size={20} />
                  </div>
                </div>
              </div>

              {/* Custom Traits */}
              <div>
                <label htmlFor="custom-traits" className="block text-lg font-semibold mb-2 text-gray-700">Custom Traits</label>
                <textarea
                  id="custom-traits"
                  value={customTraits}
                  onChange={(e) => setCustomTraits(e.target.value)}
                  placeholder="Describe what will your agent will do specifically"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-0 text-gray-900 h-32 resize-y"
                  style={{ minHeight: '120px' }}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="p-8 border-t border-gray-200 flex justify-end">
              <button
                onClick={handleSaveChanges}
                className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-8 rounded-xl transition-colors duration-200"
              >
                Save Changes
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AgentsModal; 