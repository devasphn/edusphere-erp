import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { Students } from './pages/Students';
import { Teachers } from './pages/Teachers';
import { Courses } from './pages/Courses';
import { AIAdvisor } from './pages/AIAdvisor';
import { FloatingChatbot } from './components/FloatingChatbot';
import { NavigationTab } from './types';
import { Bell, Search, UserCircle } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavigationTab>(NavigationTab.DASHBOARD);

  const renderContent = () => {
    switch (activeTab) {
      case NavigationTab.DASHBOARD:
        return <Dashboard />;
      case NavigationTab.STUDENTS:
        return <Students />;
      case NavigationTab.TEACHERS:
        return <Teachers />;
      case NavigationTab.COURSES:
        return <Courses />;
      case NavigationTab.FINANCE:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-red-400 animate-fade-in">
             <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-4xl">💰</span>
             </div>
             <h2 className="text-2xl font-bold text-red-700">Finance Module</h2>
             <p>Detailed ledgers coming in next update.</p>
          </div>
        );
      case NavigationTab.AI_ADVISOR:
        return <AIAdvisor />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#fef2f2]">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 ml-64 p-8 transition-all duration-300">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-xl border border-red-100 shadow-sm w-96">
            <Search className="w-5 h-5 text-red-400" />
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="bg-transparent border-none outline-none text-red-700 placeholder:text-red-300 w-full text-sm"
            />
            <div className="flex items-center gap-1 text-xs text-red-400 bg-red-50 px-2 py-1 rounded border border-red-200">
              <span>⌘</span>
              <span>K</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-red-400 hover:text-red-600 transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-red-200 mx-2"></div>
            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-red-900">Jane Doe</p>
                <p className="text-xs text-red-500">Super Admin</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center border-2 border-white shadow-sm text-red-600">
                <UserCircle className="w-6 h-6" />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="animate-fade-in relative z-0">
          {renderContent()}
        </div>
      </main>

      {/* Intelligent Floating Chatbot */}
      <FloatingChatbot onNavigate={setActiveTab} />
    </div>
  );
};

export default App;