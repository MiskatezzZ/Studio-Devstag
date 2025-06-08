"use client";

import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVrCardboard, faFilm, faGamepad, faPaintBrush } from '@fortawesome/free-solid-svg-icons';

const GridBackground = () => {
  return (
    <div className="fixed inset-0 w-screen h-screen pointer-events-none z-0 overflow-hidden bg-black">
      <div className="absolute inset-0 bg-black z-0"></div>
      <div className="absolute inset-0 flex items-center justify-center z-1">
        <div className="w-[80vw] h-[80vw] max-w-[900px] max-h-[900px] bg-purple-700/40 rounded-full blur-3xl opacity-70 absolute top-[-20vw] left-[-20vw]"></div>
        <div className="w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] bg-blue-600/30 rounded-full blur-2xl opacity-60 absolute bottom-[-15vw] right-[-15vw]"></div>
      </div>
      <div className="absolute inset-0 z-2" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='400' height='400' viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h400v400H0z' fill='none'/%3E%3Cpath d='M0 0h400v400H0z' fill='none' stroke='%23ffffff' stroke-width='0.5' stroke-dasharray='5,5'/%3E%3C/svg%3E")`,
        backgroundSize: "400px 400px",
        opacity: 0.15
      }} />
    </div>
  );
};

const FloatingVRElements = () => {
  return (
    <>
      <motion.div 
        className="absolute top-1/4 left-1/4 w-16 h-16 bg-blue-500/10 rounded-full blur-xl"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute top-1/3 right-1/4 w-24 h-24 bg-purple-500/10 rounded-full blur-lg"
        animate={{
          y: [0, 15, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
    </>
  );
};

const ServicePill = ({ icon, title, description, color }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`p-6 rounded-2xl bg-gradient-to-br from-${color}-500/10 to-${color}-600/10 border border-${color}-500/20 backdrop-blur-sm`}
    >
      <div className={`w-12 h-12 bg-${color}-500/20 rounded-lg flex items-center justify-center mb-4`}>
        <FontAwesomeIcon icon={icon} className={`text-${color}-400 text-xl`} />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <Navbar />
      <GridBackground />
      <FloatingVRElements />
      
      <div className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-6">
            IMMERSIVE DIGITAL CREATION
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Studio Devstag
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Where artistic vision meets real-time performance in immersive digital experiences
          </p>
        </motion.div>

        {/* Studio Philosophy */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-28"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">VR-First Design Philosophy</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                At Devstag, we don't just create visuals—we engineer immersive experiences. Every project begins with spatial thinking, considering how users will navigate and interact in three-dimensional environments.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Our approach combines cinematic storytelling with game-engine technology, resulting in digital experiences that are as functional as they are breathtaking.
              </p>
            </div>
            <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden border border-white/10">
              {/* Placeholder for VR environment preview */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 flex items-center justify-center">
                <div className="text-center">
                  <FontAwesomeIcon icon={faVrCardboard} className="w-12 h-12 text-white/50 mb-4" />
                  <p className="text-white/70">VR Environment Preview</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Services Showcase */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-28"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Full-Service Digital Production</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <ServicePill 
              icon={faPaintBrush}
              title="Concept Art & Design"
              description="Original artistic direction tailored to your project's unique identity"
              color="purple"
            />
            <ServicePill 
              icon={faFilm}
              title="Cinematic Production"
              description="From storyboarding to final render for films and commercials"
              color="blue"
            />
            <ServicePill 
              icon={faVrCardboard}
              title="Immersive Experiences"
              description="VR/AR environments with interactive hotspots and navigation"
              color="indigo"
            />
            <ServicePill 
              icon={faGamepad}
              title="Real-Time Applications"
              description="Game-engine powered solutions for all platforms"
              color="violet"
            />
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mb-28"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Creative Visionaries</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {['Lead VR Designer', 'Cinematic Director', 'Technical Artist', 'Real-Time Developer'].map((role, i) => (
              <motion.div
                key={role}
                whileHover={{ y: -5 }}
                className="bg-white/5 rounded-xl p-6 border border-white/10 backdrop-blur-sm text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-xl font-bold text-white/80">D{++i}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{role}</h3>
                <p className="text-sm text-gray-400">Specialized in {role.split(' ')[0].toLowerCase()} systems</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-2xl p-12 border border-white/10 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Create Something Extraordinary?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Film directors, VFX supervisors, and game studios—let's discuss your next immersive project.
          </p>
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-8 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300">
            Contact Our Studio
          </button>
        </motion.div>
      </div>
    </div>
  );
}