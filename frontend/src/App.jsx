import React, { useContext, useState } from 'react';
import { ConfigContext } from './context/ConfigContext.jsx';
import Sidebar from './components/Sidebar/Sidebar';
import Preview from './components/Preview/Preview';
import { LoadingSpinner } from './components/LoadingSpinner';

function App() {
  const { loading } = useContext(ConfigContext);
  const [activeTab, setActiveTab] = useState('settings');

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#0a0a0a]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white overflow-hidden font-inter">
      {/* Left Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Right Main Area / Live Preview */}
      <Preview />
    </div>
  );
}

export default App;
