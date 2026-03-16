import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Play, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ConfigContext } from '../context/ConfigContext';
import { useContext } from 'react';

const TEMPLATES = [
  {
    id: 1,
    name: 'Modern Portfolio',
    category: 'Portfolio',
    image: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?q=80&w=600&auto=format&fit=crop',
    description: 'A sleek, dark-themed portfolio for creative professionals.',
    previewUrl: '#',
  },
  {
    id: 2,
    name: 'SaaS Landing Page',
    category: 'Landing Page',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop',
    description: 'High-converting landing page for software products.',
    previewUrl: '#',
  },
  {
    id: 3,
    name: 'E-commerce Store',
    category: 'E-commerce',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600&auto=format&fit=crop',
    description: 'Minimalist shop layout with integrated cart views.',
    previewUrl: '#',
  },
  {
    id: 4,
    name: 'Agency Dashboard',
    category: 'Dashboard',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop',
    description: 'Clean admin panel with charts and data visualization.',
    previewUrl: '#',
  },
];

const CATEGORIES = ['All', 'Portfolio', 'Landing Page', 'E-commerce', 'Dashboard'];

const Template = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [showSignIn, setShowSignIn] = useState(false);
  const { isAuthenticated } = useAuth(); // ADDED

  const filteredTemplates = activeCategory === 'All' 
    ? TEMPLATES 
    : TEMPLATES.filter(t => t.category === activeCategory);

  const { applyTemplatePreset } = useContext(ConfigContext);

  const handleUseTemplate = async (id) => {
    // Correctly apply the preset (and save to DB) before navigating
    const success = await applyTemplatePreset(id);
    
    if (success) {
      if (!isAuthenticated) {
        setShowSignIn(true);
      } else {
        window.open(`/builder`, '_blank');
      }
    } else {
      alert("Failed to initialize template. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Templates</h1>
          <p className="text-gray-600">Choose a starting point for your next big project.</p>
        </div>

        {/* Tech Logos Section */}
        <div className="mb-20">
          <p className="text-center text-gray-500 font-medium mb-8 uppercase tracking-widest text-xs">Built with modern technology</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
            <TechLogo name="React" url="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" />
            <TechLogo name="Node.js" url="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" />
            <TechLogo name="Tailwind" url="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" />
            <TechLogo name="Framer Motion" url="https://www.vectorlogo.zone/logos/framer/framer-icon.svg" />
            <TechLogo name="Vite" url="https://raw.githubusercontent.com/devicons/devicon/master/icons/vitejs/vitejs-original.svg" />
            <TechLogo name="MongoDB" url="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg" />
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-4 mb-10 cursor-pointer">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 cursor-pointer">
          <AnimatePresence mode='popLayout'>
            {filteredTemplates.map((template) => (
              <motion.div
                key={template.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-gray-100"
              >
                {/* Image Container */}
                <div className="relative group aspect-video overflow-hidden bg-gray-200">
                  <img 
                    src={template.image} 
                    alt={template.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button className="bg-white p-3 rounded-full hover:bg-gray-100 transition-colors">
                      <ExternalLink className="w-5 h-5 text-gray-900" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{template.name}</h3>
                    <span className="text-xs font-semibold bg-gray-100 px-2 py-1 rounded text-gray-500 uppercase tracking-wider">
                      {template.category}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                    {template.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <Play className="w-4 h-4" /> Preview
                    </button>
                    <button 
                      onClick={() => handleUseTemplate(template.id)}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
                    >
                      Use This Template
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Simple Sign-In Modal Overlay */}
      {showSignIn && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full text-center relative"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Sign in Required</h2>
            <p className="text-gray-600 mb-8">Please sign in to your account to start using this template and deploy your site.</p>
            <Link to="/SignInPage"  >

            <button 
              className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors mb-4"
              onClick={() => {
                
                // Here you would redirect to your actual login page
                console.log("Redirecting to Sign In...");
              }}
            >
              Continue to Sign In
            </button>
            </Link>
            <button 
              onClick={() => setShowSignIn(false)}
              className="text-gray-500 text-sm hover:underline "
            >
              Maybe later
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

const TechLogo = ({ name, url }) => (
  <div className="flex flex-col items-center gap-2 group cursor-pointer">
    <img src={url} alt={name} className="w-10 h-10 group-hover:scale-110 transition-transform" />
    <span className="text-[10px] font-bold text-gray-400 group-hover:text-blue-600 transition-colors">{name}</span>
  </div>
);

export default Template;
