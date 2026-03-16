import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Zap, Shield } from 'lucide-react';

const About = () => {
  const stats = [
    { label: 'Active Users', value: '10k+' },
    { label: 'Sites Deployed', value: '25k+' },
    { label: 'Templates', value: '100+' },
    { label: 'Support Rate', value: '99.9%' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-gray-900 mb-6"
          >
            Empowering Digital Innovation
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            We provide the tools and templates you need to build stunning websites in minutes.
            Our mission is to democratize web development for everyone.
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
              <div className="text-gray-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Choose Tekunik?</h2>
              <div className="space-y-6">
                <ValueItem 
                  icon={<Zap className="w-6 h-6 text-yellow-500" />}
                  title="Lightning Fast"
                  description="Deploy your project in seconds with our optimized build process."
                />
                <ValueItem 
                  icon={<Shield className="w-6 h-6 text-green-500" />}
                  title="Secure by Default"
                  description="We prioritize your data security with enterprise-grade protection."
                />
                <ValueItem 
                  icon={<Users className="w-6 h-6 text-blue-500" />}
                  title="Community Driven"
                  description="Join thousands of developers sharing templates and tips."
                />
              </div>
            </div>
            <div className="bg-gray-100 rounded-3xl aspect-square flex items-center justify-center">
              <Target className="w-32 h-32 text-gray-300" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ValueItem = ({ icon, title, description }) => (
  <div className="flex gap-4">
    <div className="flex-shrink-0 w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center">
      {icon}
    </div>
    <div>
      <h3 className="font-bold text-lg mb-1">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

export default About;
