import React, { useContext, useState } from 'react';
import { ConfigContext } from '../../context/ConfigContext';
import { Monitor, Smartphone, Globe, ExternalLink } from 'lucide-react';
import SectionRenderer from './SectionRenderer';

const Preview = () => {
  const { config } = useContext(ConfigContext);
  const [viewMode, setViewMode] = useState('desktop');
  const [activePage, setActivePage] = useState('home');

  const { globalStyling, generalSettings, pages } = config;

  return (
    <div className="flex-1 h-full flex flex-col bg-[#0a0a0a]">
      {/* Preview Toolbar */}
      <div className="p-4 border-b border-[#222222] flex justify-between items-center bg-[#111]">
        <div className="flex bg-[#0a0a0a] p-1 rounded-lg border border-[#222222]">
          <button
            onClick={() => setViewMode('desktop')}
            className={`p-1.5 rounded-md transition-all ${viewMode === 'desktop' ? 'bg-[#222] text-primary' : 'text-gray-500 hover:text-white'}`}
          >
            <Monitor size={16} />
          </button>
          <button
            onClick={() => setViewMode('mobile')}
            className={`p-1.5 rounded-md transition-all ${viewMode === 'mobile' ? 'bg-[#222] text-primary' : 'text-gray-500 hover:text-white'}`}
          >
            <Smartphone size={16} />
          </button>
        </div>

        <div className="flex gap-4 items-center">
            <div className="flex gap-2">
                {['home', 'about', 'services', 'contact'].map(p => (
                    <button 
                        key={p} 
                        onClick={() => setActivePage(p)}
                        className={`text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded transition-colors ${activePage === p ? 'text-primary bg-primary/10' : 'text-gray-500 hover:text-white'}`}
                    >
                        {p}
                    </button>
                ))}
            </div>
            <div className="h-4 w-px bg-[#222]"></div>
            <button className="flex items-center gap-2 text-[10px] font-bold text-gray-400 hover:text-white tracking-widest uppercase">
                Preview <ExternalLink size={12} />
            </button>
        </div>
      </div>

      {/* Viewport Container */}
      <div className="flex-1 overflow-auto p-8 flex justify-center items-start bg-dot-pattern">
        <div 
          className={`bg-white transition-all duration-500 shadow-2xl relative overflow-hidden ${
            viewMode === 'mobile' ? 'w-[375px] h-[667px]' : 'w-full max-w-[1200px] min-h-screen'
          }`}
          style={{ 
            fontFamily: globalStyling.fontFamily,
          }}
        >
          {/* Site Navigation Preview */}
          <nav className="p-6 flex justify-between items-center border-b border-gray-100 bg-white sticky top-0 z-10">
            <div className="flex items-center gap-3">
              {generalSettings.logo ? (
                <img src={generalSettings.logo} alt="Logo" className="h-8 w-auto object-contain" />
              ) : (
                <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white font-bold">L</div>
              )}
              {/* <span className="font-bold text-black uppercase tracking-tight">BRAND</span> */}
            </div>
            <div className="hidden md:flex gap-8">
                {['About', 'Services', 'Contact'].map(item => (
                    <a key={item} href="#" className="text-xs font-semibold text-gray-500 hover:text-primary uppercase tracking-widest">{item}</a>
                ))}
            </div>
            <button 
                className="px-5 py-2 rounded-full text-xs font-bold text-white uppercase tracking-widest shadow-lg shadow-primary/30"
                style={{ backgroundColor: globalStyling.primaryColor }}
            >
                Get Started
            </button>
          </nav>

          {/* Render Active Page Sections */}
          <div className="pb-20">
            {pages[activePage] && pages[activePage].length > 0 ? (
                pages[activePage].map((section, idx) => (
                    <SectionRenderer key={idx} section={section} styles={globalStyling} />
                ))
            ) : (
                <div className="h-[400px] flex flex-col items-center justify-center text-gray-400 p-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                        <Globe size={32} className="text-gray-200" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">No sections yet</h3>
                    <p className="text-sm">Start building your {activePage} page by adding sections in the editor.</p>
                </div>
            )}
          </div>

          {/* Site Footer Preview */}
          <footer className="bg-gray-900 text-white p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-b border-gray-800 pb-12 mb-12">
                <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Connect</h4>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed max-w-xs">{generalSettings.address}</p>
                    <p className="text-primary text-sm font-bold">{generalSettings.mail}</p>
                </div>
                <div className="flex flex-wrap gap-4 h-fit">
                    {generalSettings.socialIcons.map((social, idx) => (
                        <a key={idx} href={social.url} className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                            <span className="text-[10px] uppercase font-bold">{social.platform.substring(0, 2)}</span>
                        </a>
                    ))}
                </div>
            </div>
            <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">{generalSettings.copyright}</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Preview;
