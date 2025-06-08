"use client";

import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt, faHeadset } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const GridBackground = () => {
  return (
    <div className="fixed inset-0 w-screen h-screen pointer-events-none z-0 overflow-hidden bg-black">
      <div className="absolute inset-0 bg-black z-0"></div>
      <div className="absolute inset-0 flex items-center justify-center z-1">
        <div className="w-[80vw] h-[80vw] max-w-[900px] max-h-[900px] bg-purple-700/40 rounded-full blur-3xl opacity-70 absolute top-[-20vw] left-[-20vw]"></div>
        <div className="w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] bg-blue-600/30 rounded-full blur-2xl opacity-60 absolute bottom-[-15vw] right-[-15vw]"></div>
      </div>
      <div className="absolute inset-0 z-2" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='400' height='400' viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h400v400H0z' fill='none'/%3E%3Cpath d='M0 0h400v400H0z' fill='none' stroke='%23ffffff' stroke-width='0.3' stroke-dasharray='2,6'/%3E%3C/svg%3E")`,
        backgroundSize: "400px 400px",
        opacity: 0.15
      }} />
    </div>
  );
};

const ContactMethod = ({ icon, title, info, link, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="group relative backdrop-blur-sm bg-white/5 rounded-2xl p-8 transition-all duration-500 hover:bg-white/10 border border-white/10"
    >
      <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-xl flex items-center justify-center mb-6">
        <FontAwesomeIcon icon={icon} className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      {link ? (
        <a href={link} className="text-blue-300 hover:text-blue-400 transition-colors block">
          {info}
        </a>
      ) : (
        <p className="text-gray-300">{info}</p>
      )}
    </motion.div>
  );
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: ''
  });

  const projectTypes = [
    "VR/AR Experience",
    "Cinematic Production",
    "Game Development",
    "3D Visualization",
    "Interactive Installation",
    "Other"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic
    console.log('Form submitted:', formData);
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <Navbar />
      <GridBackground />
      
      <div className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-6">
            CONNECT WITH OUR STUDIO
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Let&apos;s Create Together
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Film directors, VFX supervisors, and game studios—reach out to discuss your next immersive project.
          </p>
        </motion.div>

        {/* Contact Methods */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          <ContactMethod 
            icon={faEnvelope}
            title="Studio Email"
            info="contact@devstag.studio"
            link="mailto:contact@devstag.studio"
            delay={0.4}
          />
          <ContactMethod 
            icon={faPhone}
            title="Production Line"
            info="+1 (555) 765-4321"
            link="tel:+15557654321"
            delay={0.5}
          />
          <ContactMethod 
            icon={faHeadset}
            title="VR Demo Requests"
            info="demos@devstag.studio"
            link="mailto:demos@devstag.studio"
            delay={0.6}
          />
          <ContactMethod 
            icon={faMapMarkerAlt}
            title="Studio Location"
            info="Virtual Reality District, Creative City"
            delay={0.7}
          />
        </motion.div>

        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-2xl p-8 md:p-12 border border-white/10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Project Inquiry</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="projectType" className="block text-sm font-medium text-gray-300 mb-2">Project Type</label>
              <select
                id="projectType"
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
                required
              >
                <option value="">Select project type</option>
                {projectTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Project Details</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Tell us about your project goals, timeline, and any specific requirements..."
                required
              ></textarea>
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
              >
                Submit Inquiry
              </button>
            </div>
          </form>
        </motion.div>

        {/* Social Links */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center mt-20"
        >
          <h3 className="text-xl font-medium text-gray-300 mb-6">Connect With Us</h3>
          <div className="flex justify-center space-x-6">
            {['ArtStation', 'LinkedIn', 'Instagram', 'Vimeo'].map((platform) => (
              <motion.a
                key={platform}
                whileHover={{ y: -3 }}
                href="#"
                className="w-12 h-12 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center border border-white/10 transition-all"
              >
                <span className="text-sm font-medium">{platform.charAt(0)}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}