import React, { useContext } from 'react';
import { ConfigContext } from '../../context/ConfigContext';
import { Mail, MapPin, Link2, Type, Hash } from 'lucide-react';

const GeneralSettings = () => {
  const { config, updateGeneralSettings } = useContext(ConfigContext);
  const { generalSettings } = config;

  const handleChange = (e) => {
    updateGeneralSettings({ [e.target.name]: e.target.value });
  };

  const handleSocialChange = (index, field, value) => {
    const newSocial = [...generalSettings.socialIcons];
    newSocial[index][field] = value;
    updateGeneralSettings({ socialIcons: newSocial });
  };

  const addSocial = () => {
    updateGeneralSettings({ 
      socialIcons: [...generalSettings.socialIcons, { platform: '', url: '' }] 
    });
  };

  return (
    <div className="space-y-6">
      <section>
        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Logo URL</label>
        <div className="relative">
          <Type className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
          <input
            type="text"
            name="logo"
            value={generalSettings.logo}
            onChange={handleChange}
            placeholder="https://example.com/logo.png"
            className="w-full bg-[#0a0a0a] border border-[#222222] rounded-lg py-2 pl-10 pr-4 text-sm focus:border-primary outline-none transition-colors"
          />
        </div>
      </section>

      <section>
        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Contact Info</label>
        <div className="space-y-3">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
            <input
              type="email"
              name="mail"
              value={generalSettings.mail}
              onChange={handleChange}
              placeholder="hello@company.com"
              className="w-full bg-[#0a0a0a] border border-[#222222] rounded-lg py-2 pl-10 pr-4 text-sm focus:border-primary outline-none"
            />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
            <input
              type="text"
              name="address"
              value={generalSettings.address}
              onChange={handleChange}
              placeholder="123 Design St, SF"
              className="w-full bg-[#0a0a0a] border border-[#222222] rounded-lg py-2 pl-10 pr-4 text-sm focus:border-primary outline-none"
            />
          </div>
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Social Icons</label>
          <button onClick={addSocial} className="text-[10px] text-primary hover:underline">Add New</button>
        </div>
        <div className="space-y-3">
          {generalSettings.socialIcons.map((social, idx) => (
            <div key={idx} className="flex gap-2">
              <input
                type="text"
                placeholder="Platform"
                value={social.platform}
                onChange={(e) => handleSocialChange(idx, 'platform', e.target.value)}
                className="w-1/3 bg-[#0a0a0a] border border-[#222222] rounded-lg py-2 px-3 text-xs focus:border-primary outline-none"
              />
              <input
                type="text"
                placeholder="URL"
                value={social.url}
                onChange={(e) => handleSocialChange(idx, 'url', e.target.value)}
                className="flex-1 bg-[#0a0a0a] border border-[#222222] rounded-lg py-2 px-3 text-xs focus:border-primary outline-none"
              />
            </div>
          ))}
        </div>
      </section>

      <section>
        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Copyright</label>
        <div className="relative">
          <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
          <input
            type="text"
            name="copyright"
            value={generalSettings.copyright}
            onChange={handleChange}
            className="w-full bg-[#0a0a0a] border border-[#222222] rounded-lg py-2 pl-10 pr-4 text-sm focus:border-primary outline-none"
          />
        </div>
      </section>
    </div>
  );
};

export default GeneralSettings;
