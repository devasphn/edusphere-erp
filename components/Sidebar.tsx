import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  DollarSign, 
  BrainCircuit, 
  LogOut,
  Settings,
  BookOpen,
  GraduationCap
} from 'lucide-react';
import { NavigationTab } from '../types';

interface SidebarProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: NavigationTab.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: NavigationTab.STUDENTS, label: 'Students', icon: Users },
    { id: NavigationTab.TEACHERS, label: 'Teachers', icon: GraduationCap },
    { id: NavigationTab.COURSES, label: 'Courses', icon: BookOpen },
    { id: NavigationTab.FINANCE, label: 'Finance', icon: DollarSign },
    { id: NavigationTab.AI_ADVISOR, label: 'Strategic Advisor', icon: BrainCircuit, special: true },
  ];

  return (
    <div className="w-64 bg-red-950 text-white flex flex-col h-full fixed left-0 top-0 shadow-xl z-10">
      <div className="p-6 border-b border-red-800 flex items-center gap-3">
        <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
          <span className="font-bold text-lg text-white">E</span>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white">EduSphere</h1>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-red-700 text-white shadow-lg shadow-red-900/50' 
                  : 'text-red-300 hover:bg-red-900 hover:text-white'
              } ${item.special ? 'mt-6 border border-red-500/30' : ''}`}
            >
              <Icon className={`w-5 h-5 ${item.special && !isActive ? 'text-red-400' : ''}`} />
              <span className="font-medium">{item.label}</span>
              {item.special && (
                <span className="ml-auto flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-red-800 space-y-2">
        <button className="w-full flex items-center gap-3 px-4 py-2 text-red-300 hover:text-white transition-colors">
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:text-red-200 transition-colors">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};