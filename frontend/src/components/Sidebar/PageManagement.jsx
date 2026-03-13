import React, { useContext, useState } from 'react';
import { ConfigContext } from '../../context/ConfigContext';
import { Plus, Trash2, ArrowUp, ArrowDown, Layout, ChevronDown, ChevronUp } from 'lucide-react';

const PageManagement = () => {
  const { config, updatePageSections } = useContext(ConfigContext);
  const [activePage, setActivePage] = useState('home');
  const [expandedSection, setExpandedSection] = useState(null);

  const pages = ['home', 'about', 'services', 'contact'];
  const sections = config.pages[activePage] || [];

  const addSection = () => {
    const newSection = {
      heading: 'New Section',
      subheading: 'Enter your subheading here',
      imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
      layout: 'image-left'
    };
    updatePageSections(activePage, [...sections, newSection]);
    setExpandedSection(sections.length);
  };

  const updateSection = (index, field, value) => {
    const updated = [...sections];
    updated[index][field] = value;
    updatePageSections(activePage, updated);
  };

  const removeSection = (index) => {
    const updated = sections.filter((_, i) => i !== index);
    updatePageSections(activePage, updated);
    if (expandedSection === index) setExpandedSection(null);
  };

  const moveSection = (index, direction) => {
    const updated = [...sections];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= updated.length) return;
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    updatePageSections(activePage, updated);
    setExpandedSection(newIndex);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2 p-1 bg-[#0a0a0a] rounded-lg border border-[#222222]">
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => { setActivePage(p); setExpandedSection(null); }}
            className={`flex-1 py-1.5 text-[10px] uppercase tracking-widest font-bold rounded-md transition-all ${
              activePage === p ? 'bg-[#222] text-white' : 'text-gray-500 hover:text-white'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {sections.map((section, idx) => (
          <div key={idx} className="bg-[#1a1a1a] rounded-xl border border-[#222222] overflow-hidden">
            <div 
              className="p-4 flex items-center justify-between cursor-pointer hover:bg-[#222] transition-colors"
              onClick={() => setExpandedSection(expandedSection === idx ? null : idx)}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#222] flex items-center justify-center text-[10px] text-gray-500 font-bold font-mono">
                  #{idx + 1}
                </div>
                <span className="text-sm font-medium truncate max-w-[150px]">{section.heading}</span>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={(e) => { e.stopPropagation(); moveSection(idx, 'up'); }}
                  disabled={idx === 0}
                  className="p-1 hover:bg-[#333] rounded disabled:opacity-30"
                >
                  <ArrowUp size={12} />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); moveSection(idx, 'down'); }}
                  disabled={idx === sections.length - 1}
                  className="p-1 hover:bg-[#333] rounded disabled:opacity-30"
                >
                  <ArrowDown size={12} />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); removeSection(idx); }}
                  className="p-1 hover:bg-red-500/20 text-red-500 rounded ml-2"
                >
                  <Trash2 size={12} />
                </button>
                {expandedSection === idx ? <ChevronUp size={14} className="ml-2 text-gray-500" /> : <ChevronDown size={14} className="ml-2 text-gray-500" />}
              </div>
            </div>

            {expandedSection === idx && (
              <div className="p-4 border-t border-[#222222] space-y-4 bg-[#0d0d0d]">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-gray-500 uppercase font-bold">Heading</label>
                  <input
                    type="text"
                    value={section.heading}
                    onChange={(e) => updateSection(idx, 'heading', e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-[#222222] rounded-lg py-2 px-3 text-sm focus:border-primary outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] text-gray-500 uppercase font-bold">Subheading</label>
                  <textarea
                    value={section.subheading}
                    onChange={(e) => updateSection(idx, 'subheading', e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-[#222222] rounded-lg py-2 px-3 text-sm focus:border-primary outline-none h-20 resize-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] text-gray-500 uppercase font-bold">Image URL</label>
                  <input
                    type="text"
                    value={section.imageUrl}
                    onChange={(e) => updateSection(idx, 'imageUrl', e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-[#222222] rounded-lg py-2 px-3 text-sm focus:border-primary outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] text-gray-500 uppercase font-bold">Layout</label>
                  <div className="flex gap-2">
                    {['image-left', 'image-right'].map((l) => (
                      <button
                        key={l}
                        onClick={() => updateSection(idx, 'layout', l)}
                        className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                          section.layout === l ? 'border-primary bg-primary/5 text-primary' : 'border-[#222222] bg-[#1a1a1a] text-gray-500'
                        }`}
                      >
                        <Layout size={16} />
                        <span className="text-[10px] capitalize">{l.replace('-', ' ')}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={addSection}
        className="w-full py-4 border-2 border-dashed border-[#222222] rounded-2xl flex items-center justify-center gap-2 text-gray-500 hover:border-primary hover:text-primary transition-all group"
      >
        <Plus size={18} className="group-hover:rotate-90 transition-transform" />
        <span className="text-sm font-semibold italic">Add New Section</span>
      </button>
    </div>
  );
};

export default PageManagement;
