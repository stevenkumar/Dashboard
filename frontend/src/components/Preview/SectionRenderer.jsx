import React from 'react';

const SectionRenderer = ({ section, styles }) => {
  if (!section.visible) return null;

  const { heading, description, media, ctas = [], type, visibility = {}, contactForm } = section;
  const isHero = type === 'hero';
  
  // Media configuration
  const mediaPos = media?.position || 'left';
  const mediaType = media?.mediaType || 'image';
  const isHorizontal = mediaPos === 'left' || mediaPos === 'right';
  const isReverse = mediaPos === 'right' || mediaPos === 'bottom';

  // Sub-element visibility
  const showHeading = visibility.heading !== false && heading;
  const showDescription = visibility.description !== false && description;
  const showMedia = visibility.media !== false && media?.url;

  const renderMedia = () => {
    if (mediaType === 'video') {
        return (
            <video 
                src={media.url} 
                autoPlay loop muted playsInline
                className={`w-full ${isHorizontal ? 'h-[400px]' : 'h-[500px]'} object-cover rounded-3xl shadow-2xl ring-1 ring-black/5`}
            />
        );
    }
    return (
        <img 
            src={media.url || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085'} 
            alt={heading} 
            className={`w-full ${isHorizontal ? 'h-[400px]' : 'h-[500px]'} object-cover rounded-3xl shadow-2xl ring-1 ring-black/5`}
        />
    );
  };

  return (
    <section className={`py-20 px-12 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors group relative ${isHero ? 'bg-gradient-to-br from-white to-gray-50' : ''}`}>
      <div className={`flex gap-12 ${isHorizontal ? 'flex-col md:flex-row' : 'flex-col'} ${isReverse ? (isHorizontal ? 'md:flex-row-reverse' : 'flex-col-reverse') : ''} items-center`}>
        
        {/* Content Side */}
        <div className={`flex-1 space-y-6 ${!isHorizontal ? 'text-center max-w-4xl mx-auto' : ''}`}>
          {showHeading && (
            <>
                <div 
                    className="inline-block px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider mb-2"
                    style={{ backgroundColor: `${styles.primaryColor}15`, color: styles.primaryColor }}
                >
                    {isHero ? 'Welcome' : 'Digital Experience'}
                </div>
                <h2 className={`${isHero ? 'text-5xl md:text-7xl' : 'text-4xl md:text-5xl'} font-black text-gray-900 leading-[1.1] tracking-tight`}>
                    {heading}
                </h2>
            </>
          )}

          {showDescription && (
            <p className={`text-lg text-gray-500 leading-relaxed max-w-lg ${!isHorizontal ? 'mx-auto' : 'mx-0'}`}>
                {description}
            </p>
          )}

          {/* Contact Form Rendering */}
          {type === 'contact' && contactForm && (
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl space-y-4 max-w-lg mx-auto md:mx-0">
                <div className="grid grid-cols-1 gap-4">
                    {contactForm.fields?.filter(f => f.visible !== false).map((field, fIdx) => (
                        <div key={fIdx} className="space-y-1.5 text-left">
                            <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{field.name}</label>
                            {field.type === 'textarea' ? (
                                <div className="h-24 bg-gray-50 rounded-xl border border-gray-100"></div>
                            ) : (
                                <div className="h-10 bg-gray-50 rounded-xl border border-gray-100"></div>
                            )}
                        </div>
                    ))}
                </div>
                <button 
                    className="w-full py-3 rounded-full text-white text-xs font-bold uppercase tracking-widest shadow-lg"
                    style={{ backgroundColor: styles.primaryColor }}
                >
                    Send Message
                </button>
            </div>
          )}
          
          {/* CTA Buttons */}
          <div className={`pt-4 flex flex-wrap gap-4 ${!isHorizontal ? 'justify-center' : ''}`}>
            {ctas.map((cta, idx) => (
                <button 
                    key={idx}
                    className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-transform hover:scale-105 ${
                        cta.variant === 'primary' ? 'text-white shadow-lg' : 'text-gray-400 border border-gray-200 hover:bg-gray-50'
                    }`}
                    style={cta.variant === 'primary' ? { backgroundColor: styles.primaryColor, boxShadow: `0 10px 20px -10px ${styles.primaryColor}80` } : {}}
                    onClick={() => console.log('Link to:', cta.link)}
                >
                    {cta.label}
                </button>
            ))}
          </div>
        </div>

        {/* Media Side */}
        {showMedia && (
            <div className={`flex-1 w-full relative ${!isHorizontal ? 'max-w-4xl' : ''}`}>
                <div className="absolute inset-0 rounded-3xl -rotate-2 -z-10 blur-2xl opacity-20" style={{ backgroundColor: styles.primaryColor }}></div>
                {renderMedia()}
            </div>
        )}
      </div>
    </section>
  );
};

export default SectionRenderer;
