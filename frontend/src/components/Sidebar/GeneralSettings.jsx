import React, { useContext, useState } from 'react';
import { ConfigContext } from '../../context/ConfigContext';
import { 
  Mail, MapPin, Link2, Type, Hash, 
  ChevronDown, ChevronUp, Facebook, Twitter, 
  Instagram, Linkedin, Layout, ShieldCheck,
  Image as ImageIcon, Globe
} from 'lucide-react';

const GeneralSettings = () => {
  const { global, updateGeneralSettings } = useContext(ConfigContext);
  const { generalSettings, navbar, footer } = global;

  const [expandedFolder, setExpandedFolder] = useState('branding');

  const handleChange = (e) => {
    updateGeneralSettings({ [e.target.name]: e.target.value });
  };

  const handleNestedChange = (folder, field, value) => {
    // This helper will be expanded in ConfigContext if needed, 
    // for now we use updateGeneralSettings for flat fields under generalSettings
    updateGeneralSettings({ [field]: value });
  };

  const handleSocialChange = (index, field, value) => {
    const newSocial = [...generalSettings.socialIcons];
    newSocial[index][field] = value;
    updateGeneralSettings({ socialIcons: newSocial });
  };

  const addSocial = () => {
    updateGeneralSettings({ 
      socialIcons: [...(generalSettings.socialIcons || []), { platform: '', url: '' }] 
    });
  };

  const Folder = ({ id, label, icon: Icon, children }) => (
    <div className={`rounded-xl border transition-all ${expandedFolder === id ? 'bg-[#1a1a1a] border-primary/30' : 'bg-[#111] border-[#222]'}`}>
      <button 
        onClick={() => setExpandedFolder(expandedFolder === id ? null : id)}
        className="w-full p-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${expandedFolder === id ? 'bg-primary/10 text-primary' : 'bg-[#0a0a0a] text-gray-500'}`}>
            <Icon size={16} />
          </div>
          <span className={`text-xs font-bold uppercase tracking-widest ${expandedFolder === id ? 'text-white' : 'text-gray-400'}`}>{label}</span>
        </div>
        {expandedFolder === id ? <ChevronUp size={16} className="text-gray-500" /> : <ChevronDown size={16} className="text-gray-500" />}
      </button>

      {expandedFolder === id && (
        <div className="p-4 pt-0 space-y-4 border-t border-[#222222]/50 animate-in fade-in slide-in-from-top-1 duration-200">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col gap-3">
      {/* Branding & Master Fields */}
      <Folder id="branding" label="Branding & Master Fields" icon={ShieldCheck}>
        <div className="space-y-4">
            <div className="space-y-1.5">
                <label className="text-[10px] text-gray-500 uppercase font-bold">Site Name</label>
                <div className="relative">
                    <Type className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={12} />
                    <input
                        type="text"
                        name="siteName"
                        value={generalSettings.siteName || ''}
                        onChange={handleChange}
                        className="w-full bg-[#0a0a0a] border border-[#222222] rounded-lg py-2 pl-9 pr-4 text-xs focus:border-primary outline-none"
                    />
                </div>
            </div>
            <div className="space-y-1.5">
                <label className="text-[10px] text-gray-500 uppercase font-bold">Logo URL</label>
                <div className="relative">
                    <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={12} />
                    <input
                        type="text"
                        name="logo"
                        value={generalSettings.logo || ''}
                        onChange={handleChange}
                        className="w-full bg-[#0a0a0a] border border-[#222222] rounded-lg py-2 pl-9 pr-4 text-xs focus:border-primary outline-none"
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 gap-3 pt-2">
                <div className="space-y-1.5">
                    <label className="text-[10px] text-gray-500 uppercase font-bold">Master Email</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={12} />
                        <input
                            type="email"
                            name="email"
                            value={generalSettings.email || ''}
                            onChange={handleChange}
                            className="w-full bg-[#0a0a0a] border border-[#222222] rounded-lg py-2 pl-9 pr-4 text-xs focus:border-primary outline-none"
                        />
                    </div>
                </div>
                <div className="space-y-1.5">
                    <label className="text-[10px] text-gray-500 uppercase font-bold">Master Phone</label>
                    <div className="relative">
                        <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={12} />
                        <input
                            type="text"
                            name="phone"
                            value={generalSettings.phone || ''}
                            onChange={handleChange}
                            className="w-full bg-[#0a0a0a] border border-[#222222] rounded-lg py-2 pl-9 pr-4 text-xs focus:border-primary outline-none"
                        />
                    </div>
                </div>
            </div>
        </div>
      </Folder>

      {/* Header Settings */}
      <Folder id="header" label="Header Configuration" icon={Layout}>
         <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-[#0a0a0a] rounded-lg border border-[#222]">
                <span className="text-[10px] text-gray-400 font-bold uppercase">Sticky Navbar</span>
                <button 
                    className={`w-8 h-4 rounded-full relative transition-colors ${navbar?.sticky ? 'bg-primary' : 'bg-gray-700'}`}
                    onClick={() => updateGeneralSettings({ navbar: { ...navbar, sticky: !navbar?.sticky } })}
                >
                    <div className={`absolute top-1 w-2 h-2 bg-white rounded-full transition-all ${navbar?.sticky ? 'right-1' : 'left-1'}`}></div>
                </button>
            </div>
            <p className="text-[9px] text-gray-500 italic pb-2 text-center">Navigation links are managed automatically in Page Management.</p>
         </div>
      </Folder>

      {/* Footer Settings */}
      <Folder id="footer" label="Footer & Social" icon={ShieldCheck}>
         <div className="space-y-4">
            <div className="space-y-1.5">
                <label className="text-[10px] text-gray-500 uppercase font-bold">Copyright Text</label>
                <input
                    type="text"
                    name="copyright"
                    value={generalSettings.copyright || ''}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a0a] border border-[#222222] rounded-lg py-2 px-3 text-xs focus:border-primary outline-none"
                />
            </div>

            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <label className="text-[10px] text-gray-500 uppercase font-bold">Social Media</label>
                    <button onClick={addSocial} className="text-[10px] text-primary hover:underline">+ Add</button>
                </div>
                {(generalSettings.socialIcons || []).map((social, idx) => (
                    <div key={idx} className="flex gap-2 group">
                        <input
                            type="text"
                            placeholder="Platform"
                            value={social.platform}
                            onChange={(e) => handleSocialChange(idx, 'platform', e.target.value)}
                            className="w-1/3 bg-[#0a0a0a] border border-[#222222] rounded-lg py-2 px-3 text-[10px] focus:border-primary outline-none"
                        />
                        <input
                            type="text"
                            placeholder="URL"
                            value={social.url}
                            onChange={(e) => handleSocialChange(idx, 'url', e.target.value)}
                            className="flex-1 bg-[#0a0a0a] border border-[#222222] rounded-lg py-2 px-3 text-[10px] focus:border-primary outline-none"
                        />
                    </div>
                ))}
            </div>
         </div>
      </Folder>

      {/* Analytics & SEO (Global) */}
      <Folder id="analytics" label="Global SEO & Assets" icon={Globe}>
         <div className="space-y-4">
            <div className="p-8 border border-dashed border-[#333] rounded-xl flex flex-col items-center justify-center text-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#0a0a0a] flex items-center justify-center text-gray-600">
                    <ImageIcon size={18} />
                </div>
                <div className="space-y-1">
                    <p className="text-[10px] font-bold text-gray-400">Favicon Management</p>
                    <p className="text-[9px] text-gray-600">Coming soon in Phase 3</p>
                </div>
            </div>
         </div>
      </Folder>
    </div>
  );
};

export default GeneralSettings;
