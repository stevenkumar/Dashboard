import React from 'react';

const SectionRenderer = ({ section, styles }) => {
  const { heading, subheading, imageUrl, layout } = section;
  const isRight = layout === 'image-right';

  return (
    <section className="py-20 px-12 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors group relative">
      <div className={`flex flex-col md:flex-row items-center gap-12 ${isRight ? 'md:flex-row-reverse' : ''}`}>
        <div className="flex-1 space-y-6">
          <div 
            className="inline-block px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider mb-2"
            style={{ backgroundColor: `${styles.primaryColor}15`, color: styles.primaryColor }}
          >
            Digital Experience
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-[1.1] tracking-tight">
            {heading}
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed max-w-lg">
            {subheading}
          </p>
          <div className="pt-4 flex gap-4">
             <button 
                className="px-8 py-3 rounded-full text-sm font-bold text-white uppercase tracking-widest transition-transform hover:scale-105"
                style={{ backgroundColor: styles.primaryColor }}
            >
                Learn More
            </button>
            <button className="px-8 py-3 rounded-full text-sm font-bold text-gray-400 border border-gray-200 uppercase tracking-widest hover:bg-gray-50 transition-colors">
                Contact
            </button>
          </div>
        </div>
        <div className="flex-1 w-full relative">
            <div className="absolute inset-0 bg-primary/10 rounded-3xl -rotate-2 -z-10 blur-2xl opacity-50"></div>
            <img 
                src={imageUrl || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085'} 
                alt={heading} 
                className="w-full h-[400px] object-cover rounded-3xl shadow-2xl ring-1 ring-black/5"
            />
        </div>
      </div>
    </section>
  );
};

export default SectionRenderer;
