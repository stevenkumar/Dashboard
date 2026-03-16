import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Code, Globe, PenTool, Database, Layout } from 'lucide-react';

const Services = () => {
  const services = [
    { 
      icon: <Layout className="w-8 h-8 text-blue-600" />, 
      title: 'Web Builder', 
      description: 'Drag and drop interface to build professional websites without coding.' 
    },
    { 
      icon: <PenTool className="w-8 h-8 text-purple-600" />, 
      title: 'UI/UX Design', 
      description: 'Premium curated templates designed by industry professionals.' 
    },
    { 
      icon: <Globe className="w-8 h-8 text-green-600" />, 
      title: 'Rapid Hosting', 
      description: 'Global CDN and edge computing to ensure your site is fast everywhere.' 
    },
    { 
      icon: <Code className="w-8 h-8 text-orange-600" />, 
      title: 'Custom Integration', 
      description: 'Connect your favorite tools and APIs with our robust plugin system.' 
    },
    { 
      icon: <Database className="w-8 h-8 text-red-600" />, 
      title: 'Data Management', 
      description: 'Integrated databases and form handling for all your business needs.' 
    },
    { 
      icon: <Monitor className="w-8 h-8 text-cyan-600" />, 
      title: 'Analytics', 
      description: 'Built-in tracking and insights to monitor your site performance.' 
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to build, launch, and scale your digital presence in one unified platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-24 bg-blue-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Ready to bring your idea to life?</h2>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors">
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Services;
