import React from 'react';
import { Settings, Palette, Layers, Save, Inbox } from 'lucide-react';
import GeneralSettings from './GeneralSettings';
import GlobalStyling from './GlobalStyling';
import PageManagement from './PageManagement';
import InquiryList from './InquiryList';
import { useContext } from 'react';
import { ConfigContext } from '../../context/ConfigContext';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { saveConfig } = useContext(ConfigContext);

  const tabs = [
    { id: 'settings', icon: Settings, label: 'General' },
    { id: 'styling', icon: Palette, label: 'Styling' },
    { id: 'pages', icon: Layers, label: 'Pages' },
    { id: 'inbox', icon: Inbox, label: 'Inquiries' },
  ];

  return (
    <div className="w-[400px] h-full bg-[#111111] border-r border-[#222222] flex flex-col">
      <div className="p-6 border-b border-[#222222] flex justify-between items-center">
        <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
          WebBuilder
        </h1>
        <button 
          onClick={saveConfig}
          className="p-2 bg-primary hover:bg-blue-600 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
        >
          <Save size={16} /> Save
        </button>
      </div>

      <div className="flex bg-[#0a0a0a] p-1 mx-6 mt-6 rounded-xl border border-[#222222]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[10px] font-bold uppercase tracking-tighter transition-all ${
              activeTab === tab.id 
                ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'
            }`}
          >
            <tab.icon size={12} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
        {activeTab === 'settings' && <GeneralSettings />}
        {activeTab === 'styling' && <GlobalStyling />}
        {activeTab === 'pages' && <PageManagement />}
        {activeTab === 'inbox' && <InquiryList />}
      </div>
    </div>
  );
};

export default Sidebar;
