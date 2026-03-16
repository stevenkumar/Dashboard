import React, { useContext, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ConfigContext } from './context/ConfigContext.jsx';
import Sidebar from './components/Sidebar/Sidebar';
import Preview from './components/Preview/Preview';
import { LoadingSpinner } from './components/LoadingSpinner';

// Pages
import Template from './pages/Template.jsx';
import SignInPage from './pages/SignInPage.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx';
import Home from './pages/Home.jsx';
import Navbar from './components/Navbar/Navbar.jsx';

// Protected Route wrapper for builder
import { useAuth } from './context/AuthContext';

function ProtectedBuilder() {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('settings');

  if (!isAuthenticated) {
    return <Navigate to="/SignInPage" replace />;
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

function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-inter">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}

function App() {
  const { loading } = useContext(ConfigContext);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#0a0a0a]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<MainLayout><Home /></MainLayout>} />
      <Route path="/templates" element={<MainLayout><Template /></MainLayout>} />
      <Route path="/SignInPage" element={<MainLayout><SignInPage /></MainLayout>} />
      <Route path="/about" element={<MainLayout><About /></MainLayout>} />
      <Route path="/services" element={<MainLayout><Services /></MainLayout>} />
      <Route path="/builder" element={<ProtectedBuilder />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
