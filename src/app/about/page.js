"use client";

import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faUsers, faChartLine, faLightbulb } from '@fortawesome/free-solid-svg-icons';

// Reusing your GridBackground component
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

// Floating orbs component
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

// Team member card component
const TeamCard = ({ name, role, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="group relative backdrop-blur-sm bg-transparent rounded-2xl p-8 transition-all duration-500 hover:scale-[1.02]"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.03)",
        border: '1px solid rgba(255, 255, 255, 0.05)'
      }}
    >
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full mb-6 overflow-hidden">
          {/* Placeholder for team member image */}
          <div className="w-full h-full bg-gray-700 flex items-center justify-center">
            <span className="text-4xl text-white/50">{name.charAt(0)}</span>
          </div>
        </div>
        <h3 className="text-xl font-bold text-center mb-1 text-white">{name}</h3>
        <p className="text-blue-300 text-sm font-medium mb-4">{role}</p>
        <div className="flex space-x-4">
          {['twitter', 'linkedin', 'github'].map((social) => (
            <button key={social} className="w-8 h-8 rounded-full bg-gray-800/50 hover:bg-blue-500/20 transition-colors flex items-center justify-center">
              <span className="text-white/70 hover:text-white text-sm">{social.charAt(0).toUpperCase()}</span>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Milestone component
const Milestone = ({ year, title, description, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      className="relative pl-10 pb-8 border-l-2 border-blue-500/30"
    >
      <div className="absolute -left-2.5 top-0 w-5 h-5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full"></div>
      <div className="text-blue-400 font-bold mb-1">{year}</div>
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
      
      <div className="relative z-10 pt-32 pb-20">
        <FloatingOrbs />
        
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-8"
          >
            <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
            OUR STORY
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-8 glow-text heading-font"
          >
            Crafting Digital Excellence
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed"
          >
            We're a passionate team of designers, developers, and strategists dedicated to creating transformative digital experiences.
          </motion.p>
        </div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-6 mb-20"
        >
          {[
            { icon: faRocket, value: "150+", label: "Projects Completed" },
            { icon: faUsers, value: "40+", label: "Happy Clients" },
            { icon: faChartLine, value: "95%", label: "Retention Rate" },
            { icon: faLightbulb, value: "10+", label: "Industry Awards" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="backdrop-blur-sm bg-transparent rounded-2xl p-6 border border-white/10 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <FontAwesomeIcon icon={stat.icon} className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-300 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission Section */}
        <div className="max-w-7xl mx-auto px-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="backdrop-blur-sm bg-transparent rounded-2xl p-8 md:p-12 border border-white/10 relative overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  To empower businesses through innovative digital solutions that drive growth, enhance engagement, and create meaningful connections with their audiences.
                </p>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  We believe in the transformative power of technology when combined with thoughtful design and strategic thinking.
                </p>
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300">
                  Learn About Our Process
                </button>
              </div>
              <div className="relative h-64 md:h-96 rounded-xl overflow-hidden">
                {/* Placeholder for mission image/video */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center">
                  <span className="text-white/50 text-lg">Mission Visual</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Team Section */}
        <div className="max-w-7xl mx-auto px-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 glow-text">Meet The Team</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              The brilliant minds behind our success - a diverse team of experts passionate about delivering exceptional results.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Alex Johnson", role: "Founder & CEO" },
              { name: "Sarah Chen", role: "Creative Director" },
              { name: "Michael Rodriguez", role: "Lead Developer" },
              { name: "Emily Wilson", role: "UX Designer" },
              { name: "David Kim", role: "Marketing Strategist" },
              { name: "Jessica Brown", role: "Project Manager" }
            ].map((member, index) => (
              <TeamCard 
                key={member.name}
                name={member.name}
                role={member.role}
                delay={0.7 + index * 0.1}
              />
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="backdrop-blur-sm bg-transparent rounded-2xl p-8 md:p-12 border border-white/10"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Journey</h2>
            
            <div className="space-y-1">
              <Milestone 
                year="2015" 
                title="Company Founded" 
                description="Started in a small office with just 3 team members and big dreams."
                delay={0.9}
              />
              <Milestone 
                year="2017" 
                title="First Major Client" 
                description="Landed our first enterprise client, marking our entry into the big leagues."
                delay={1.0}
              />
              <Milestone 
                year="2019" 
                title="Product Suite Launched" 
                description="Introduced our first proprietary software solutions to the market."
                delay={1.1}
              />
              <Milestone 
                year="2021" 
                title="Global Expansion" 
                description="Opened international offices in Europe and Asia."
                delay={1.2}
              />
              <Milestone 
                year="2023" 
                title="Award-Winning Year" 
                description="Recognized with multiple industry awards for innovation and design."
                delay={1.3}
              />
            </div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto px-6 mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.4 }}
            className="backdrop-blur-sm bg-transparent rounded-2xl p-8 md:p-12 border border-white/10 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 glow-text">Ready to Start Your Project?</h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Let's create something amazing together. Get in touch with our team today.
            </p>
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-8 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300">
              Contact Us
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}