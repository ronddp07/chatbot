"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar";
import { useTheme } from "../../../context/ThemeContext";

const cards = [
  {
    brand: "Visa",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png",
    number: "****1234",
    expiry: "01/29",
    isDefault: true,
  },
  {
    brand: "Mastercard",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png",
    number: "****1234",
    expiry: "05/32",
    isDefault: false,
  },
];

export default function CardDetailsPage() {
  const router = useRouter();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);
  const [isNaviModalOpen, setIsNaviModalOpen] = React.useState(false);
  const [isNaviDropdownOpen, setIsNaviDropdownOpen] = React.useState(false);
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const [showModal, setShowModal] = useState(false);

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
      <div className="flex-1 flex flex-col items-center p-10">
        <div className="w-full max-w-5xl">
          <div className="flex items-start justify-between mb-8 w-full">
            <div>
              <button onClick={() => router.back()} className="text-gray-500 hover:text-gray-700 text-base font-medium mb-1">&lt; Back</button>
              <h1 className="text-2xl font-bold mb-1">Billing & Subscription</h1>
              <div className="text-sm text-gray-500">
                <span className="text-blue-600 cursor-pointer hover:underline" onClick={() => router.push('/billing')}>Billing & Subscription</span>
                <span className="mx-1">&gt;</span>
                <span className="text-blue-600 cursor-pointer hover:underline" onClick={() => router.push('/billing/cards')}>Card Details</span>
              </div>
            </div>
            <button className="bg-sky-500 text-white px-5 py-2 rounded font-medium hover:bg-sky-600 h-12 self-start" onClick={() => setShowModal(true)}>+ Add Payment Method</button>
          </div>
          <div className="flex gap-8 flex-wrap">
            {cards.map((card, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col min-w-[320px] max-w-[340px] flex-1 relative items-start">
                <div className="flex items-center gap-3 mb-2">
                  <img src={card.logo} alt={card.brand} className="w-12 h-8 object-contain" />
                  <div className="font-semibold text-lg">{card.brand} {card.number}</div>
                  {card.isDefault && <span className="ml-2 text-sky-500" title="Default">&#10003;</span>}
                </div>
                <div className="text-gray-500 text-sm mb-4">Expires {card.expiry}</div>
                <div className="flex gap-6 mt-auto">
                  <button className="text-sky-600 hover:underline font-medium">Remove</button>
                  <button className="text-sky-600 hover:underline font-medium">Edit</button>
                </div>
              </div>
            ))}
          </div>
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
              <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative animate-fadeIn">
                <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-600">&times;</button>
                <h2 className="text-2xl font-bold mb-6">Add Payment Method</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Cardholder Name</label>
                    <input className="w-full border rounded px-3 py-2 text-gray-900 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-400" defaultValue="Troy Teeples" />
                  </div>
                  <div className="relative">
                    <input className="w-full border rounded px-3 py-2 text-gray-900 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-400 pr-28" placeholder="**** **** **** 1234" />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" className="w-7 h-5 object-contain" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" alt="Mastercard" className="w-7 h-5 object-contain" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/American_Express_logo_%282018%29.svg" alt="Amex" className="w-7 h-5 object-contain" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Discover_Card_logo.svg" alt="Discover" className="w-7 h-5 object-contain" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="block text-xs text-gray-400 mb-1">Expiration Date</label>
                      <input className="w-full border rounded px-3 py-2 text-gray-900 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-400" placeholder="01/29" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs text-gray-400 mb-1">CVV</label>
                      <input className="w-full border rounded px-3 py-2 text-gray-900 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-400" placeholder="CVV" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="block text-xs text-gray-400 mb-1">Zip Code</label>
                      <input className="w-full border rounded px-3 py-2 text-gray-900 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-400" placeholder="0000" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs text-gray-400 mb-1">Country</label>
                      <select className="w-full border rounded px-3 py-2 text-gray-900 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-400">
                        <option>United States</option>
                        <option>Canada</option>
                        <option>United Kingdom</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <label className="text-gray-700 text-sm">Set as default</label>
                    <input type="checkbox" className="toggle toggle-info" style={{ accentColor: '#38bdf8', width: '40px', height: '20px' }} />
                  </div>
                  <div className="flex justify-end gap-2 mt-6">
                    <button type="button" className="px-4 py-2 rounded border border-gray-300 text-gray-700 bg-white hover:bg-gray-100" onClick={() => setShowModal(false)}>Cancel</button>
                    <button type="submit" className="px-4 py-2 rounded bg-sky-500 text-white font-medium hover:bg-sky-600">Save</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 