import React, { useState } from "react";
import { Link } from "../types";
import {
  LinkIcon,
  BarChart3,
  Settings,
  LogOut,
  Layout,
  Users,
  Star,
  Palette,
  Menu,
  X
} from "lucide-react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  links: Link[];
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, links, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 bg-indigo-700 rounded-md text-white focus:outline-none"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Logo */}
      <div className="md:hidden fixed top-4 left-0 right-0 flex justify-center z-40">
        <div className="flex items-center">
          <LinkIcon className="h-6 w-6 mr-2 text-indigo-700" />
          <h1 className="text-xl font-bold text-indigo-700">MiniLink</h1>
        </div>
      </div>

      {/* Sidebar - Desktop: Always visible, Mobile: Conditional */}
      <div className={`fixed left-0 top-0 h-screen bg-indigo-700 text-white flex flex-col p-4 overflow-y-auto shadow-lg transition-all duration-300 ease-in-out z-40
        ${isMobileMenuOpen ? 'w-64' : 'w-0 md:w-64'}`}>
        
        {/* Logo */}
        <div className="flex items-center mb-8 mt-[60px]">
          <LinkIcon className={`h-6 w-6 mr-2 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 md:opacity-100'}`} />
          <h1 className={`text-xl font-bold transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>MiniLink</h1>
        </div>

        {/* Dashboard Section */}
        <div className={`mb-4 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
          <p className="text-indigo-200 text-sm mb-2">DASHBOARD</p>
          <button
            onClick={() => handleTabChange("links")}
            className={`w-full text-left py-2 px-3 rounded flex items-center ${
              activeTab === "links" ? "bg-indigo-800" : "hover:bg-indigo-600"
            }`}
          >
            <LinkIcon className="h-4 w-4 mr-2" />
            <span>Links</span>
            <span className="ml-auto bg-indigo-500 text-xs px-2 py-1 rounded-full">{links.length}</span>
          </button>

          <button
            onClick={() => handleTabChange("appearance")}
            className={`w-full text-left py-2 px-3 rounded flex items-center ${
              activeTab === "appearance" ? "bg-indigo-800" : "hover:bg-indigo-600"
            }`}
          >
            <Layout className="h-4 w-4 mr-2" />
            <span>Appearance</span>
          </button>

          <button
            onClick={() => handleTabChange("theme")}
            className={`w-full text-left py-2 px-3 rounded flex items-center ${
              activeTab === "theme" ? "bg-indigo-800" : "hover:bg-indigo-600"
            }`}
          >
            <Palette className="h-4 w-4 mr-2" />
            <span>Theme</span>
          </button>

          <button
            onClick={() => handleTabChange("analytics")}
            className={`w-full text-left py-2 px-3 rounded flex items-center ${
              activeTab === "analytics" ? "bg-indigo-800" : "hover:bg-indigo-600"
            }`}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            <span>Analytics</span>
          </button>
        </div>

        {/* Account Section */}
        <div className={`mb-4 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
          <p className="text-indigo-200 text-sm mb-2">ACCOUNT</p>
          <button
            onClick={() => handleTabChange("profile")}
            className={`w-full text-left py-2 px-3 rounded flex items-center ${
              activeTab === "profile" ? "bg-indigo-800" : "hover:bg-indigo-600"
            }`}
          >
            <Users className="h-4 w-4 mr-2" />
            <span>Profile</span>
          </button>

          <button
            onClick={() => handleTabChange("settings")}
            className={`w-full text-left py-2 px-3 rounded flex items-center ${
              activeTab === "settings" ? "bg-indigo-800" : "hover:bg-indigo-600"
            }`}
          >
            <Settings className="h-4 w-4 mr-2" />
            <span>Settings</span>
          </button>

          <button
            onClick={() => handleTabChange("pro")}
            className={`w-full text-left py-2 px-3 rounded flex items-center ${
              activeTab === "pro" ? "bg-indigo-800" : "hover:bg-indigo-600"
            }`}
          >
            <Star className="h-4 w-4 mr-2" />
            <span>Upgrade to Pro</span>
          </button>
        </div>

        {/* Logout Button - Stays at the Bottom */}
        <div className={`mt-auto transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
          <button
            onClick={onLogout}
            className="w-full text-left py-2 px-3 rounded flex items-center hover:bg-indigo-600"
          >
            <LogOut className="h-4 w-4 mr-2" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Content Padding for Desktop */}
      <div className="hidden md:block w-64"></div>
    </>
  );
};

export default Navbar;