"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar";
import { useTheme } from "../../../context/ThemeContext";

const plans = [
  {
    name: "Personal",
    description: "Great for steady personal use with rollover and solid credit limits.",
    price: 19,
    color: "text-pink-500",
    button: "Upgrade Plan",
    buttonColor: "bg-pink-500 text-white hover:bg-pink-600",
    border: "border-pink-200",
    additionalCredits: "$0.20",
    isCurrent: false,
    features: [
      "200 credits per month",
      "Users: N/A"
    ],
  },
  {
    name: "Family",
    description: "Flexible plan for families or small teams with shared credits.",
    price: 39,
    color: "text-yellow-500",
    button: "Upgrade Plan",
    buttonColor: "bg-yellow-400 text-white hover:bg-yellow-500",
    border: "border-yellow-200",
    isCurrent: false,
    features: [
      "500 credits per month",
      "Users: 4"
    ],
  },
  {
    name: "Family Plus",
    description: "A solid starting point for businesses with scalable credits.",
    price: 99,
    color: "text-blue-500",
    button: "Current Plan",
    buttonColor: "bg-white text-blue-500 border border-blue-500 cursor-default",
    border: "border-blue-400",
    isCurrent: true,
    features: [
      "1500 credits per month",
      "Users: 6"
    ],
  },
];

const businessPlans = [
  {
    name: "Launch",
    description: "Ideal for starting your teams needing more credits, storage and BYOK.",
    price: 99,
    color: "text-red-500",
    button: "Upgrade Plan",
    buttonColor: "bg-red-500 text-white hover:bg-red-600",
    border: "border-red-200",
    features: [
      "1500 credits per month",
      "Users: 6"
    ],
  },
  {
    name: "Growth",
    description: "Ideal for growing teams needing more credits, storage and BYOK.",
    price: 299,
    color: "text-purple-500",
    button: "Upgrade Plan",
    buttonColor: "bg-purple-500 text-white hover:bg-purple-600",
    border: "border-purple-200",
    features: [
      "5000 credits per month",
      "Users: unlimited (includes free 50 personal credits, up to 20 users)"
    ],
  },
  {
    name: "Pro",
    description: "Full-featured plan for pro teams with max credits, storage and BYOK.",
    price: 699,
    color: "text-orange-500",
    button: "Upgrade Plan",
    buttonColor: "bg-orange-500 text-white hover:bg-orange-600",
    border: "border-orange-200",
    features: [
      "15000 credits per month",
      "Users: unlimited (includes free 50 personal credits, up to 40 users)"
    ],
  },
  {
    name: "Human Digital Manager",
    description: "Full-featured plan for pro teams with max credits, storage and BYOK.",
    price: 2500,
    color: "text-cyan-500",
    button: "Upgrade Plan",
    buttonColor: "bg-cyan-500 text-white hover:bg-cyan-600",
    border: "border-cyan-200",
    features: [
      "50000 credits per month",
      "Users: unlimited (includes free 50 personal credits, up to 40 users)"
    ],
  },
  {
    name: "Founder's Club",
    description: "Exclusive plan for local small business owners.",
    price: 2500,
    color: "text-teal-500",
    button: "Upgrade Plan",
    buttonColor: "bg-gradient-to-r from-teal-400 to-green-400 text-white hover:from-teal-500 hover:to-green-500",
    border: "border-teal-200",
    features: [
      "+20% Bonus Credits for Life",
      "Access to Community & Training",
      "Early Feature Access & Direct Feedback Loop",
      "Locked Pricing - No Future Increase"
    ],
  },
];

export default function PlanSelectionPage() {
  const router = useRouter();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isNaviModalOpen, setIsNaviModalOpen] = useState(false);
  const [isNaviDropdownOpen, setIsNaviDropdownOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [tab, setTab] = useState("Personal");

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
      <div className={`flex-1 p-10 max-w-6xl mx-auto`}>
        <button onClick={() => router.back()} className="text-gray-500 hover:text-gray-700 text-base font-medium mb-1">&lt; Back</button>
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold">Billing & Subscription</h1>
          <button className="bg-red-500 text-white px-5 py-2 rounded font-medium hover:bg-red-600">Cancel Subscription</button>
        </div>
        <div className="mb-8 text-sm text-gray-500">
          <span className="text-blue-600 cursor-pointer hover:underline" onClick={() => router.push('/billing')}>Billing & Subscription</span>
          <span className="mx-1">&gt;</span>
          <span className="text-blue-600 cursor-pointer hover:underline" onClick={() => router.push('/billing/plan')}>Your Plan</span>
        </div>
        <div className="flex gap-2 mb-8">
          <button
            className={`px-5 py-2 rounded font-medium text-base ${tab === 'Personal' ? 'bg-gray-200 text-gray-900' : 'bg-white text-gray-500 border border-gray-200'}`}
            onClick={() => setTab('Personal')}
          >
            Personal
          </button>
          <button
            className={`px-5 py-2 rounded font-medium text-base ${tab === 'Business' ? 'bg-gray-200 text-gray-900' : 'bg-white text-gray-500 border border-gray-200'}`}
            onClick={() => setTab('Business')}
          >
            Business
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-6 flex-wrap">
          {(tab === 'Personal' ? plans : businessPlans).map((plan, idx) => {
            const isCurrent = (plan as any).isCurrent ?? false;
            return (
              <div
                key={plan.name}
                className={`flex-1 bg-white rounded-2xl border ${plan.border} shadow-sm p-8 flex flex-col items-center relative min-w-[320px] max-w-[420px] ${isCurrent ? 'ring-2 ring-blue-200' : ''}`}
                style={{flexBasis: 'calc(33% - 1.5rem)'}}
              >
                <div className={`text-lg font-bold mb-1 ${plan.color}`}>{plan.name}</div>
                <div className="text-gray-500 text-sm mb-4 text-center">{plan.description}</div>
                <div className={`text-3xl font-bold mb-1 ${plan.color}`}>${plan.price} <span className="text-base font-medium text-gray-500">per month</span></div>
                <button
                  className={`mt-4 w-full py-2 rounded font-semibold text-base transition ${plan.buttonColor}`}
                  disabled={isCurrent}
                >
                  {plan.button}
                </button>
                <ul className="mt-6 w-full text-sm text-gray-700 space-y-2">
                  {plan.features?.map((feature: string, i: number) => (
                    <li key={i} className="flex items-center gap-2">✓ {feature} <span className="ml-1 text-gray-400" title="Info">{feature.includes('per month') || feature.includes('users') ? 'ℹ️' : ''}</span></li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 