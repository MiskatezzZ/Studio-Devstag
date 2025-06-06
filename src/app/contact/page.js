"use client";

import Navbar from '@/components/Navbar';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

// Reusing your GridBackground component for consistency
const GridBackground = () => {
  return (
    <div className="fixed inset-0 w-screen h-screen pointer-events-none z-0 overflow-hidden bg-black">
      <div className="absolute inset-0 bg-black z-0"></div>
      <div className="absolute inset-0 flex items-center justify-center z-1">
        <div className="w-[80vw] h-[80vw] max-w-[900px] max-h-[900px] bg-purple-700/40 rounded-full blur-3xl opacity-70 absolute top-[-20vw] left-[-20vw]"></div>
        <div className="w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] bg-blue-600/30 rounded-full blur-2xl opacity-60 absolute bottom-[-15vw] right-[-15vw]"></div>
        <div className="w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] bg-indigo-600/30 rounded-full blur-2xl opacity-50 absolute top-[30vh] left-[20vw]"></div>
      </div>
      <div
        className="absolute inset-0 z-2"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='400' height='400' viewBox='0 0 400 400' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='400' height='400' fill='none'/%3E%3Cpath d='M0 0 H400 M0 400 H400 M0 0 V400 M400 0 V400' stroke='%23ffffff' stroke-width='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: "400px 400px",
          opacity: 0.4,
          filter: "drop-shadow(0 0 1px rgba(255, 255, 255, 0.4))"
        }}
      />
      <div
        className="absolute inset-0 z-3"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='400' height='400' viewBox='0 0 400 400' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='0' cy='0' r='2' fill='%23ffffff'/%3E%3Ccircle cx='0' cy='400' r='2' fill='%23ffffff'/%3E%3Ccircle cx='400' cy='0' r='2' fill='%23ffffff'/%3E%3Ccircle cx='400' cy='400' r='2' fill='%23ffffff'/%3E%3C/svg%3E")`,
          backgroundSize: "400px 400px",
          opacity: 0.7,
          filter: "drop-shadow(0 0 3px rgba(255, 255, 255, 0.7))"
        }}
      />
    </div>
  );
};

// Floating orbs component (reused from services page)
const FloatingOrbs = () => {
  return (
    <>
      <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute top-40 right-32 w-24 h-24 bg-purple-500/5 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-indigo-500/5 rounded-full blur-2xl animate-pulse" style={{animationDelay: '4s'}}></div>
      <div className="absolute bottom-20 right-20 w-28 h-28 bg-violet-500/5 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
    </>
  );
};

// Glassmorphism card component (modified for contact info)
const ContactCard = ({ icon, title, info, link, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="group relative backdrop-blur-sm bg-transparent rounded-2xl p-8 transition-all duration-500 hover:scale-[1.02]"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.03)",
        border: '1px solid rgba(255, 255, 255, 0.05)',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)'
      }}
    >
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
      <div className="relative z-10">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-xl flex items-center justify-center mb-6 mx-auto">
          <FontAwesomeIcon icon={icon} className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-bold text-center mb-3 text-white">{title}</h3>
        {link ? (
          <a href={link} className="text-center block text-blue-300 hover:text-blue-400 transition-colors">
            {info}
          </a>
        ) : (
          <p className="text-center text-gray-300">{info}</p>
        )}
      </div>
    </motion.div>
  );
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <Navbar />
      <GridBackground />
      
      <div className="relative z-10 pt-32 pb-20">
        <FloatingOrbs />
        
        {/* Header Section */}
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-8"
          >
            <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
            GET IN TOUCH
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-8 glow-text heading-font"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed"
          >
            Have questions or want to discuss a project? Reach out to our team anytime.
          </motion.p>
        </div>

        {/* Contact Cards Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 mb-20"
        >
          <ContactCard 
            icon={faEnvelope} 
            title="Email Us" 
            info="info@devstag.studio" 
            link="mailto:info@devstag.studio"
            delay={0.4}
          />
          <ContactCard 
            icon={faPhone} 
            title="Call Us" 
            info="+1 (555) 123-4567" 
            link="tel:+15551234567"
            delay={0.5}
          />
          <ContactCard 
            icon={faMapMarkerAlt} 
            title="Visit Us" 
            info="123 Design Street, Creative City" 
            delay={0.6}
          />
        </motion.div>

        {/* Contact Form Section */}
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="backdrop-blur-sm bg-transparent rounded-2xl p-8 md:p-12 border border-white/10 relative overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  ></textarea>
                </div>
                
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 cursor-pointer"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Map Section */}
        <div className="max-w-7xl mx-auto px-6 mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="rounded-2xl overflow-hidden border border-white/10 h-96 relative"
          >
            {/* Placeholder for map - replace with your actual map component */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 flex items-center justify-center">
              <div className="text-center">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="w-12 h-12 text-white mb-4" />
                <p className="text-white text-xl font-medium">Interactive Map Would Appear Here</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}