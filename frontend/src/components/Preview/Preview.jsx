import React, { useContext, useState } from 'react';
import { ConfigContext } from '../../context/ConfigContext';
import { Monitor, Smartphone, Globe, ExternalLink, Mail, Smartphone as PhoneIcon } from 'lucide-react';
import SectionRenderer from './SectionRenderer';

const Preview = () => {
  const { config } = useContext(ConfigContext);
  const [viewMode, setViewMode] = useState('desktop');
  
  // pages is an object: { home: { ... }, about: { ... } }
  const pageKeys = Object.keys(config.pages);
  const [activePageKey, setActivePageKey] = useState(pageKeys[0] || 'home');

  const { globalStyling, generalSettings, pages } = config;
  const activePage = pages[activePageKey] || {};
  const sections = activePage.sections || [];

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
                {pageKeys.map(key => (
                    <button 
                        key={key} 
                        onClick={() => setActivePageKey(key)}
                        className={`text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded transition-colors ${activePageKey === key ? 'text-primary bg-primary/10' : 'text-gray-500 hover:text-white'}`}
                    >
                        {pages[key].navigationLabel || key}
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
          className={`bg-white transition-all duration-500 shadow-2xl relative overflow-hidden flex flex-col ${
            viewMode === 'mobile' ? 'w-[375px] h-[667px]' : 'w-full max-w-[1200px] min-h-screen'
          }`}
          style={{ 
            fontFamily: globalStyling.fontFamily,
          }}
        >
          {/* Site Navigation Preview */}
          <nav className="p-6 flex justify-between items-center border-b border-gray-100 bg-white sticky top-0 z-10 shrink-0">
            <div className="flex items-center gap-3">
              {generalSettings.logo ? (
                <img src={generalSettings.logo} alt="Logo" className="h-8 w-auto object-contain" />
              ) : (
                <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white font-bold" style={{ backgroundColor: globalStyling.primaryColor }}>{generalSettings.siteName?.charAt(0) || 'L'}</div>
              )}
              <span className="font-bold text-black uppercase tracking-tight text-sm">{generalSettings.siteName}</span>
            </div>
            <div className="hidden md:flex gap-8">
                {pageKeys.filter(k => k !== 'home').map(key => (
                    <a 
                        key={key} 
                        href="#" 
                        onClick={(e) => { e.preventDefault(); setActivePageKey(key); }}
                        className="text-[10px] font-bold text-gray-400 hover:text-primary uppercase tracking-widest"
                    >
                        {pages[key].navigationLabel || key}
                    </a>
                ))}
            </div>
            <button 
                className="px-5 py-2 rounded-full text-[10px] font-bold text-white uppercase tracking-widest shadow-lg shadow-primary/30"
                style={{ backgroundColor: globalStyling.primaryColor }}
            >
                Get Started
            </button>
          </nav>

          {/* Render Active Page Content */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide">
            <div className="pb-20">
                {sections.length > 0 ? (
                    sections.map((section) => (
                        <SectionRenderer key={section.id} section={section} styles={globalStyling} />
                    ))
                ) : (
                    <div className="h-[400px] flex flex-col items-center justify-center text-gray-400 p-12 text-center">
                        <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                            <Globe size={32} className="text-gray-200" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Empty Page</h3>
                        <p className="text-sm">Start building your {activePageKey} page by adding sections in the editor.</p>
                    </div>
                )}
            </div>

            {/* Site Footer Preview */}
            <footer className="bg-gray-900 text-white p-12 shrink-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-b border-gray-800 pb-12 mb-12">
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest mb-6 opacity-50">Connect</h4>
                        <p className="text-gray-400 text-sm mb-4 leading-relaxed max-w-xs">{generalSettings.address}</p>
                        <p className="text-primary text-sm font-bold" style={{ color: globalStyling.primaryColor }}>{generalSettings.email}</p>
                    </div>
                    <div className="flex flex-wrap gap-4 h-fit">
                        {generalSettings.socialIcons?.map((social, idx) => (
                            <a key={idx} href={social.url} className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                                <span className="text-[10px] uppercase font-bold">{social.platform?.substring(0, 2)}</span>
                            </a>
                        ))}
                    </div>
                </div>
                <div className="flex justify-between items-center text-gray-500 text-[9px] uppercase font-bold tracking-widest">
                    <p>{generalSettings.copyright}</p>
                    <div className="flex gap-6">
                        {generalSettings.legalLinks?.map((link, idx) => (
                            <a key={idx} href={link.url} className="hover:text-white">{link.label}</a>
                        ))}
                    </div>
                </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
