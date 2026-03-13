import React, { useContext } from 'react';
import { ConfigContext } from '../../context/ConfigContext';
import { Pipette, Type } from 'lucide-react';

const GlobalStyling = () => {
  const { config, updateGlobalStyling } = useContext(ConfigContext);
  const { globalStyling } = config;

  const handleChange = (e) => {
    updateGlobalStyling({ [e.target.name]: e.target.value });
  };

  const colors = [
    { label: 'Primary Color', name: 'primaryColor', value: globalStyling.primaryColor },
    { label: 'Secondary Color', name: 'secondaryColor', value: globalStyling.secondaryColor },
  ];

  const fonts = ['Inter', 'Roboto', 'Outfit', 'Playfair Display', 'Space Grotesk'];

  return (
    <div className="space-y-8">
      <section>
        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Color Palette</label>
        <div className="grid grid-cols-1 gap-4">
          {colors.map((color) => (
            <div key={color.name} className="flex justify-between items-center bg-[#0a0a0a] p-3 rounded-xl border border-[#222222]">
              <div className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded-lg border border-[#333]" 
                  style={{ backgroundColor: color.value }}
                ></div>
                <div>
                  <p className="text-xs font-medium">{color.label}</p>
                  <p className="text-[10px] text-gray-500 uppercase">{color.value}</p>
                </div>
              </div>
              <input
                type="color"
                name={color.name}
                value={color.value}
                onChange={handleChange}
                className="opacity-0 absolute w-10 h-10 cursor-pointer"
              />
              <Pipette size={14} className="text-gray-400" />
            </div>
          ))}
        </div>
      </section>

      <section>
        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Typography</label>
        <div className="grid grid-cols-1 gap-2">
          {fonts.map((font) => (
            <button
              key={font}
              onClick={() => updateGlobalStyling({ fontFamily: font })}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                globalStyling.fontFamily === font 
                  ? 'border-primary bg-primary/5 text-primary' 
                  : 'border-[#222222] bg-[#0a0a0a] text-gray-400 hover:border-[#333]'
              }`}
            >
              <span style={{ fontFamily: font }} className="text-sm">{font}</span>
              {globalStyling.fontFamily === font && <div className="w-1.5 h-1.5 rounded-full bg-primary ring-4 ring-primary/20"></div>}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default GlobalStyling;
