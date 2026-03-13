import React, { useContext, useState } from 'react';
import { ConfigContext } from '../../context/ConfigContext';
import { 
  Plus, Trash2, ArrowUp, ArrowDown, ChevronDown, ChevronUp, 
  Settings, Eye, EyeOff, Move, Image as ImageIcon, 
  Type, AlignLeft, Layout, Globe, Search, MousePointer2, 
  Video, CheckSquare
} from 'lucide-react';

// DND Kit Imports
import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableSection = ({ section, idx, isExpanded, onToggle, onUpdate, onRemove }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: section.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : 0,
        position: 'relative',
        opacity: isDragging ? 0.3 : 1
    };

    const updateCTA = (ctaIdx, data) => {
        const newCtas = [...(section.ctas || [])];
        newCtas[ctaIdx] = { ...newCtas[ctaIdx], ...data };
        onUpdate({ ctas: newCtas });
    };

    const addCTA = () => {
        onUpdate({ ctas: [...(section.ctas || []), { label: 'New Action', link: '#', variant: 'secondary' }] });
    };

    const removeCTA = (ctaIdx) => {
        onUpdate({ ctas: (section.ctas || []).filter((_, i) => i !== ctaIdx) });
    };

    const toggleSubVisibility = (field) => {
        const visibility = section.visibility || {};
        onUpdate({ visibility: { ...visibility, [field]: visibility[field] === false ? true : false } });
    };

    const updateFormFields = (fieldName, visible) => {
        const contactForm = section.contactForm || { fields: [] };
        const newFields = (contactForm.fields || []).map(f => f.name === fieldName ? { ...f, visible } : f);
        onUpdate({ contactForm: { ...contactForm, fields: newFields } });
    };

    return (
        <div 
            ref={setNodeRef} 
            style={style} 
            className={`bg-[#1a1a1a] rounded-xl border transition-all ${isExpanded ? 'border-primary' : 'border-[#222222]'}`}
        >
            <div 
                className="p-4 flex items-center justify-between cursor-pointer group"
                onClick={onToggle}
            >
                <div className="flex items-center gap-3">
                    <div 
                        {...attributes} 
                        {...listeners}
                        className="p-1.5 bg-[#222] rounded text-gray-500 cursor-grab active:cursor-grabbing hover:bg-[#333] transition-colors"
                    >
                        <Move size={12} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-white truncate max-w-[140px]">{section.heading || 'Untitled Section'}</span>
                        <div className="flex items-center gap-2">
                             <span className="text-[9px] text-gray-500 uppercase font-bold">{section.type}</span>
                             {!section.visible && <span className="text-[8px] bg-orange-500/10 text-orange-500 px-1 rounded">Hidden</span>}
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-1 opacity-10 md:opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                        onClick={(e) => { e.stopPropagation(); onUpdate({ visible: !section.visible }); }}
                        className={`p-1.5 rounded hover:bg-[#333] ${section.visible ? 'text-gray-500' : 'text-orange-500'}`}
                    >
                        {section.visible ? <Eye size={12} /> : <EyeOff size={12} />}
                    </button>
                    <button 
                        onClick={(e) => { e.stopPropagation(); onRemove(); }}
                        className="p-1.5 hover:bg-red-500/10 text-red-500 rounded ml-1"
                    >
                        <Trash2 size={12} />
                    </button>
                </div>
            </div>

            {isExpanded && (
                <div className="p-4 border-t border-[#222222] bg-[#0d0d0d] rounded-b-xl space-y-5 max-h-[500px] overflow-y-auto scrollbar-hide">
                    {/* Basic Content */}
                    <div className="space-y-4">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <label className="text-[10px] text-gray-500 uppercase font-bold">Main Heading</label>
                                <button onClick={() => toggleSubVisibility('heading')} className="text-[10px] text-primary">
                                    {section.visibility?.heading === false ? 'Hidden' : 'Visible'}
                                </button>
                            </div>
                            <div className="relative">
                                <Type className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={12} />
                                <input 
                                    type="text" 
                                    value={section.heading}
                                    onChange={(e) => onUpdate({ heading: e.target.value })}
                                    className="w-full bg-[#1a1a1a] border border-[#222222] rounded-lg py-2 pl-9 pr-4 text-xs focus:border-primary outline-none"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                             <div className="flex items-center justify-between">
                                <label className="text-[10px] text-gray-500 uppercase font-bold">Description</label>
                                <button onClick={() => toggleSubVisibility('description')} className="text-[10px] text-primary">
                                     {section.visibility?.description === false ? 'Hidden' : 'Visible'}
                                </button>
                            </div>
                            <div className="relative">
                                <AlignLeft className="absolute left-3 top-3 text-gray-600" size={12} />
                                <textarea 
                                    value={section.description}
                                    onChange={(e) => onUpdate({ description: e.target.value })}
                                    className="w-full bg-[#1a1a1a] border border-[#222222] rounded-lg py-2 pl-9 pr-4 text-xs focus:border-primary outline-none h-20 resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Media Controls */}
                    <div className="p-4 bg-[#111] rounded-xl border border-[#222] space-y-4">
                        <div className="flex items-center justify-between">
                             <div className="flex items-center gap-2">
                                <ImageIcon size={14} className="text-primary" />
                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Media Settings</span>
                             </div>
                             <button onClick={() => toggleSubVisibility('media')} className="text-[10px] text-primary">
                                 {section.visibility?.media === false ? 'Hidden' : 'Visible'}
                             </button>
                        </div>
                        <div className="space-y-3">
                            <div className="space-y-1.5">
                                <label className="text-[10px] text-gray-500 uppercase font-bold">Media Type</label>
                                <div className="flex gap-1">
                                    {['image', 'video'].map(t => (
                                        <button
                                            key={t}
                                            onClick={() => onUpdate({ media: { ...section.media, mediaType: t } })}
                                            className={`flex-1 py-1.5 rounded-lg border text-[9px] uppercase font-bold transition-all flex items-center justify-center gap-2 ${
                                                (section.media?.mediaType || 'image') === t ? 'bg-primary border-primary text-white' : 'bg-[#1a1a1a] border-[#222] text-gray-500'
                                            }`}
                                        >
                                            {t === 'image' ? <ImageIcon size={10} /> : <Video size={10} />} {t}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] text-gray-500 uppercase font-bold">Position</label>
                                <div className="flex gap-1">
                                    {['left', 'right', 'top', 'bottom'].map(pos => (
                                        <button
                                            key={pos}
                                            onClick={() => onUpdate({ media: { ...section.media, position: pos } })}
                                            className={`flex-1 py-1.5 rounded-lg border text-[9px] uppercase font-bold transition-all ${
                                                section.media?.position === pos ? 'bg-primary border-primary text-white' : 'bg-[#1a1a1a] border-[#222] text-gray-500 hover:text-white'
                                            }`}
                                        >
                                            {pos}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] text-gray-500 uppercase font-bold">Source URL</label>
                                <input 
                                    type="text" 
                                    value={section.media?.url || ''}
                                    onChange={(e) => onUpdate({ media: { ...section.media, url: e.target.value } })}
                                    className="w-full bg-[#1a1a1a] border border-[#222222] rounded-lg py-2 px-3 text-xs focus:border-primary outline-none"
                                    placeholder="https://..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Contact Form Management (Special for 'contact' type) */}
                    {section.type === 'contact' && (
                        <div className="p-4 bg-[#111] rounded-xl border border-[#222] space-y-4">
                            <div className="flex items-center gap-2">
                                <CheckSquare size={14} className="text-primary" />
                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Form Fields</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                {['fullName', 'email', 'subject', 'message'].map(field => {
                                    const isVisible = section.contactForm?.fields?.find(f => f.name === field)?.visible !== false;
                                    return (
                                        <button
                                            key={field}
                                            onClick={() => updateFormFields(field, !isVisible)}
                                            className={`p-2 rounded-lg border text-[9px] uppercase font-bold transition-all flex items-center justify-between ${
                                                isVisible ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-[#0a0a0a] border-[#222] text-gray-600'
                                            }`}
                                        >
                                            {field}
                                            {isVisible ? <Eye size={10} /> : <EyeOff size={10} />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* CTA Management */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <MousePointer2 size={14} className="text-primary" />
                                <label className="text-[10px] text-gray-500 uppercase font-bold">Call to Actions</label>
                            </div>
                            <button onClick={addCTA} className="text-[10px] text-primary hover:underline flex items-center gap-1">
                                <Plus size={10} /> Add Button
                            </button>
                        </div>
                        <div className="space-y-3">
                            {(section.ctas || []).map((cta, cIdx) => (
                                <div key={cIdx} className="p-3 bg-[#111] rounded-lg border border-[#222] space-y-3 relative group/cta">
                                    <button 
                                        onClick={() => removeCTA(cIdx)}
                                        className="absolute top-2 right-2 p-1 text-gray-600 hover:text-red-500 opacity-0 group-hover/cta:opacity-100 transition-opacity"
                                    >
                                        <Trash2 size={10} />
                                    </button>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="space-y-1">
                                            <label className="text-[9px] text-gray-600 uppercase font-bold">Label</label>
                                            <input 
                                                type="text" 
                                                value={cta.label}
                                                onChange={(e) => updateCTA(cIdx, { label: e.target.value })}
                                                className="w-full bg-[#0a0a0a] border border-[#222] rounded py-1.5 px-2 text-[10px] text-white outline-none"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[9px] text-gray-600 uppercase font-bold">Link</label>
                                            <input 
                                                type="text" 
                                                value={cta.link}
                                                onChange={(e) => updateCTA(cIdx, { link: e.target.value })}
                                                className="w-full bg-[#0a0a0a] border border-[#222] rounded py-1.5 px-2 text-[10px] text-white outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        {['primary', 'secondary', 'outline'].map(v => (
                                            <button 
                                                key={v}
                                                onClick={() => updateCTA(cIdx, { variant: v })}
                                                className={`flex-1 py-1 text-[9px] rounded uppercase font-bold border transition-all ${
                                                    cta.variant === v ? 'bg-[#333] border-[#444] text-white' : 'bg-[#0a0a0a] border-[#222] text-gray-600'
                                                }`}
                                            >
                                                {v}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const PageManagement = () => {
  const { config, updatePageData } = useContext(ConfigContext);
  const [activePageName, setActivePageName] = useState('home');
  const [expandedSectionId, setExpandedSectionId] = useState(null);
  const [activeTab, setActiveTab] = useState('sections'); // 'sections' | 'seo' | 'settings'

  const activePage = config.pages[activePageName] || {};
  const sections = activePage.sections || [];

  const sensors = useSensors(
    useSensor(PointerSensor, {
        activationConstraint: {
            delay: 100,
            tolerance: 5,
        },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handlePageUpdate = (data) => {
    updatePageData(activePageName, data);
  };

  const updateSection = (idx, data) => {
    const newSections = [...sections];
    newSections[idx] = { ...newSections[idx], ...data };
    handlePageUpdate({ sections: newSections });
  };

  const addSection = (type = 'content') => {
    const newSection = {
        id: `section-${Date.now()}`,
        type,
        visible: true,
        heading: 'New ' + type,
        description: 'Edit your section content here.',
        visibility: { heading: true, description: true, media: true },
        media: {
            url: '',
            mediaType: 'image',
            position: 'left'
        },
        ctas: [{ label: 'Action 1', link: '#', variant: 'primary' }],
        settings: { padding: 'py-20', background: 'bg-white' }
    };
    
    if (type === 'contact') {
        newSection.contactForm = {
            fields: [
                { name: 'fullName', type: 'text', visible: true, required: true },
                { name: 'email', type: 'email', visible: true, required: true },
                { name: 'subject', type: 'text', visible: true, required: true },
                { name: 'message', type: 'textarea', visible: true, required: true }
            ]
        };
    }

    handlePageUpdate({ sections: [...sections, newSection] });
    setExpandedSectionId(newSection.id);
  };

  const removeSection = (idx) => {
    const newSections = sections.filter((_, i) => i !== idx);
    handlePageUpdate({ sections: newSections });
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
        const oldIndex = sections.findIndex((s) => s.id === active.id);
        const newIndex = sections.findIndex((s) => s.id === over.id);
        handlePageUpdate({ sections: arrayMove(sections, oldIndex, newIndex) });
    }
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Dynamic Navigation Management */}
      <div className="flex flex-col gap-4 p-4 bg-[#1a1a1a] rounded-xl border border-[#222222]">
        <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Active Page</h3>
            <div className="flex gap-2">
                <button className="p-1.5 hover:bg-[#222] rounded text-gray-500" title="Page Settings">
                    <Settings size={14} />
                </button>
            </div>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {Object.keys(config.pages).map((p) => (
            <button
              key={p}
              onClick={() => { setActivePageName(p); setExpandedSectionId(null); }}
              className={`whitespace-nowrap px-4 py-2 text-[10px] uppercase tracking-widest font-bold rounded-lg transition-all border ${
                activePageName === p 
                    ? 'bg-primary border-primary text-white' 
                    : 'bg-[#0a0a0a] border-[#222] text-gray-500 hover:text-white'
              }`}
            >
              {config.pages[p].navigationLabel || p}
            </button>
          ))}
          <button className="p-2 border border-dashed border-[#333] rounded-lg text-gray-600 hover:text-primary hover:border-primary transition-colors">
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* Editor Tabs */}
      <div className="flex bg-[#0a0a0a] p-1 rounded-lg border border-[#222222]">
        {[
            { id: 'sections', label: 'Builder', icon: Layout },
            { id: 'seo', label: 'SEO', icon: Search },
            { id: 'settings', label: 'Info', icon: Globe }
        ].map(tab => (
            <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md transition-all ${
                    activeTab === tab.id ? 'bg-[#222] text-white' : 'text-gray-500 hover:text-white'
                }`}
            >
                <tab.icon size={12} />
                <span className="text-[10px] uppercase font-bold tracking-tighter">{tab.label}</span>
            </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto space-y-6 pb-20 pr-1">
        
        {activeTab === 'sections' && (
            <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                    <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Page Sections</span>
                    <div className="flex gap-2">
                        {['hero', 'content', 'contact'].map(type => (
                            <button 
                                key={type}
                                onClick={() => addSection(type)}
                                className="px-2 py-1 bg-primary/10 text-primary border border-primary/20 rounded text-[9px] uppercase font-bold hover:bg-primary/20"
                            >
                                + {type}
                            </button>
                        ))}
                    </div>
                </div>

                <DndContext 
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext 
                        items={sections.map(s => s.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        <div className="space-y-3">
                            {sections.map((section, idx) => (
                                <SortableSection 
                                    key={section.id}
                                    section={section}
                                    idx={idx}
                                    isExpanded={expandedSectionId === section.id}
                                    onToggle={() => setExpandedSectionId(expandedSectionId === section.id ? null : section.id)}
                                    onUpdate={(data) => updateSection(idx, data)}
                                    onRemove={() => removeSection(idx)}
                                />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
                
                {sections.length === 0 && (
                     <div className="p-12 border border-dashed border-[#222] rounded-2xl flex flex-col items-center justify-center text-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#111] flex items-center justify-center text-gray-600">
                            <Plus size={20} />
                        </div>
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">No sections yet</p>
                     </div>
                )}
            </div>
        )}

        {activeTab === 'seo' && (
            <div className="bg-[#1a1a1a] rounded-xl border border-[#222222] p-4 space-y-4">
                <div className="space-y-1.5">
                    <label className="text-[10px] text-gray-500 uppercase font-bold">Meta Title</label>
                    <input 
                        type="text" 
                        value={activePage.seo?.title || ''}
                        onChange={(e) => handlePageUpdate({ seo: { ...activePage.seo, title: e.target.value } })}
                        className="w-full bg-[#0a0a0a] border border-[#222222] rounded-lg py-2 px-3 text-sm focus:border-primary outline-none"
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-[10px] text-gray-500 uppercase font-bold">Meta Description</label>
                    <textarea 
                        value={activePage.seo?.description || ''}
                        onChange={(e) => handlePageUpdate({ seo: { ...activePage.seo, description: e.target.value } })}
                        className="w-full bg-[#0a0a0a] border border-[#222222] rounded-lg py-2 px-3 text-sm focus:border-primary outline-none h-24 resize-none"
                    />
                </div>
            </div>
        )}

        {activeTab === 'settings' && (
            <div className="bg-[#1a1a1a] rounded-xl border border-[#222222] p-4 space-y-4">
                <div className="space-y-1.5">
                    <label className="text-[10px] text-gray-500 uppercase font-bold">Navigation Label</label>
                    <input 
                        type="text" 
                        value={activePage.navigationLabel || ''}
                        onChange={(e) => handlePageUpdate({ navigationLabel: e.target.value })}
                        className="w-full bg-[#0a0a0a] border border-[#222222] rounded-lg py-2 px-3 text-sm focus:border-primary outline-none"
                    />
                    <p className="text-[9px] text-gray-500 italic">This is how the page appears in the Navbar.</p>
                </div>
                <div className="space-y-1.5">
                    <label className="text-[10px] text-gray-500 uppercase font-bold">Route Path</label>
                    <input 
                        type="text" 
                        value={activePage.route || ''}
                        onChange={(e) => handlePageUpdate({ route: e.target.value })}
                        className="w-full bg-[#0a0a0a] border border-[#222222] rounded-lg py-2 px-3 text-sm focus:border-primary outline-none"
                    />
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default PageManagement;
