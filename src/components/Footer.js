"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FloatingDock } from "@/components/ui/floating-dock";
import { IconBrandYoutube, IconBrandLinkedin, IconMail } from "@tabler/icons-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const [iconSizes, setIconSizes] = useState({ min: 32, max: 56 });

  useEffect(() => {
    const toPx = (val) => {
      if (!val) return null;
      const s = String(val).trim();
      if (s.endsWith('vw')) return (parseFloat(s) / 100) * window.innerWidth;
      if (s.endsWith('vh')) return (parseFloat(s) / 100) * window.innerHeight;
      if (s.endsWith('px')) return parseFloat(s);
      const n = parseFloat(s);
      return isNaN(n) ? null : n; // fallback
    };

    const computeFromVars = () => {
      const scope = document.querySelector('.responsive-footer') || document.documentElement;
      const styles = getComputedStyle(scope);
      const maxVar = styles.getPropertyValue('--icon-max-size');
      const minVar = styles.getPropertyValue('--icon-min-size');
      const maxPx = toPx(maxVar) ?? 56;
      const minPx = toPx(minVar) ?? 32;
      setIconSizes({ min: Math.round(minPx), max: Math.round(maxPx) });
    };
    computeFromVars();
    window.addEventListener('resize', computeFromVars);
    return () => window.removeEventListener('resize', computeFromVars);
  }, []);
  
  return (
    <footer className="responsive-footer relative w-full backdrop-blur-lg overflow-hidden" style={{ padding: 'var(--footer-padding)', background: '#000000' }} >
      {/* Top radial gradient to blend with testimonial section */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: 'var(--gradient-top)',
        transform: 'translateX(-50%)',
        width: 'var(--gradient-size)',
        height: 'var(--gradient-size)',
        pointerEvents: 'none',
        zIndex: 1,
        background: 'radial-gradient(circle, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 70%)'
      }} />
      <div className="relative z-10" style={{ padding: '0 var(--container-px)', width: '100%', maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <div className="relative flex flex-col md:flex-row md:justify-start md:items-start justify-between items-center w-full" style={{ gap: 'var(--section-gap)' }}>
          {/* Logo and Copyright */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="responsive-logo"
          >
            <div className="flex items-center">
              <h2 className="font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent" style={{ fontSize: 'var(--logo-size)' }}>
                DevStag Studio
              </h2>
            </div>
            <p className="text-white/60" style={{ marginTop: 'var(--text-margin)', fontSize: 'var(--copyright-size)' }}>
              © {currentYear} DevStag Studio. All rights reserved.
            </p>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="responsive-links grid grid-cols-2 md:grid-cols-3" style={{ gap: 'var(--links-gap)', marginLeft: 'var(--links-margin-left)' }}
          >
            <div>
              <h3 className="text-white font-semibold" style={{ marginBottom: 'var(--heading-margin)', fontSize: 'var(--heading-size)' }}>Services</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--list-gap)' }}>
                <li><Link href="#" className="text-white/60 hover:text-white transition-colors duration-300" style={{ fontSize: 'var(--link-size)' }}>Web Design</Link></li>
                <li><Link href="#" className="text-white/60 hover:text-white transition-colors duration-300" style={{ fontSize: 'var(--link-size)' }}>Development</Link></li>
                <li><Link href="#" className="text-white/60 hover:text-white transition-colors duration-300" style={{ fontSize: 'var(--link-size)' }}>Branding</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold" style={{ marginBottom: 'var(--heading-margin)', fontSize: 'var(--heading-size)' }}>Company</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--list-gap)' }}>
                <li><Link href="#" className="text-white/60 hover:text-white transition-colors duration-300" style={{ fontSize: 'var(--link-size)' }}>About</Link></li>
                <li><Link href="#" className="text-white/60 hover:text-white transition-colors duration-300" style={{ fontSize: 'var(--link-size)' }}>Portfolio</Link></li>
                <li><Link href="#" className="text-white/60 hover:text-white transition-colors duration-300" style={{ fontSize: 'var(--link-size)' }}>Contact</Link></li>
              </ul>
            </div>
            
            <div className="col-span-2 md:col-span-1 flex flex-col items-center md:items-end md:absolute md:right-0 md:top-0" >
              <h3 className="text-white font-semibold" style={{ marginBottom: 'var(--heading-margin)', fontSize: 'var(--heading-size)' }}>Connect</h3>
              {/* Reserve space for FloatingDock at max hover size so layout never shifts */}
              <div className="w-full flex items-center justify-center" style={{ maxWidth: 'var(--dock-max-width)', height: 'var(--dock-height)' }}>
                <FloatingDock
                  items={[
                    {
                      title: "YouTube",
                      icon: <IconBrandYoutube className="text-white" />,
                      href: "https://youtube.com/",
                    },
                    {
                      title: "LinkedIn",
                      icon: <IconBrandLinkedin className="text-white" />,
                      href: "https://linkedin.com/",
                    },
                    {
                      title: "Email",
                      icon: <IconMail className="text-white" />,
                      href: "mailto:hello@example.com",
                    },
                  ]}
                  desktopClassName="bg-[#18181b] border border-white/10 shadow-lg w-full"
                  mobileClassName="bg-[#18181b] border border-white/10 shadow-lg w-full"
                  maxIconSize={iconSizes.max}
                  minIconSize={iconSizes.min}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-white/5 text-center text-white/40" style={{ marginTop: 'var(--bottom-margin)', paddingTop: 'var(--bottom-padding)', fontSize: 'var(--bottom-text-size)' }}
        >
          <p>Designed with passion by DevStag Studio</p>
        </motion.div>
      </div>
      <style jsx>{`
        .responsive-footer {
          /* XL ≥ 1441px (default) */
          --footer-padding: 3.5vw;
          --gradient-top: -34vw;
          --gradient-size: 44vw;
          --container-px: 2vw;
          --container-max: 80vw;
          --section-gap: 3vw;
          --logo-size: 1.8vw;
          --copyright-size: 0.9vw;
          --text-margin: 1vh;
          --links-gap: 3vw;
          --links-margin-left: 6vw;
          --heading-size: 1.2vw;
          --heading-margin: 1.5vh;
          --link-size: 1vw;
          --list-gap: 1vh;
          --dock-max-width: 20vw;
          --dock-height: 8vh;
          --icon-max-size: 3.5vw;
          --icon-min-size: 2vw;
          --bottom-margin: 2.5vh;
          --bottom-padding: 1.5vh;
          --bottom-text-size: 0.9vw;
        }

        .responsive-logo {
          margin-bottom: 1.5vh;
        }

        @media (max-width: 90em) {
          .responsive-footer {
            --footer-padding: 4vw;
            --gradient-size: 48vw;
            --container-px: 2.5vw;
            --container-max: 85vw;
            --section-gap: 4vw;
            --logo-size: 2.2vw;
            --copyright-size: 1.1vw;
            --links-gap: 4vw;
            --links-margin-left: 7vw;
            --heading-size: 1.4vw;
            --link-size: 1.2vw;
            --dock-max-width: 24vw;
            --dock-height: 9vh;
            --icon-max-size: 4vw;
            --icon-min-size: 2.4vw;
            --bottom-text-size: 1.1vw;
          }
        }

        @media (max-width: 64em) {
          .responsive-footer {
            --footer-padding: 5vw;
            --gradient-size: 55vw;
            --container-px: 3vw;
            --container-max: 92vw;
            --section-gap: 5vw;
            --logo-size: 3vw;
            --copyright-size: 1.5vw;
            --links-gap: 5vw;
            --links-margin-left: 0;
            --heading-size: 1.8vw;
            --link-size: 1.6vw;
            --dock-max-width: 35vw;
            --dock-height: 10vh;
            --icon-max-size: 5.5vw;
            --icon-min-size: 3.2vw;
            --bottom-text-size: 1.5vw;
          }

          .responsive-logo {
            margin-bottom: 2vh;
            text-align: center;
          }

          .responsive-links {
            text-align: center;
          }
        }

        @media (max-width: 40em) {
          .responsive-footer {
            --footer-padding: 6vw;
            --gradient-size: 70vw;
            --container-px: 4vw;
            --container-max: 94vw;
            --section-gap: 6vw;
            --logo-size: 5vw;
            --copyright-size: 2.5vw;
            --links-gap: 8vw;
            --heading-size: 3vw;
            --link-size: 2.8vw;
            --dock-max-width: 60vw;
            --dock-height: 12vh;
            --icon-max-size: 8vw;
            --icon-min-size: 5vw;
            --bottom-margin: 4vh;
            --bottom-padding: 3vh;
            --bottom-text-size: 2.5vw;
          }

          .responsive-logo {
            margin-bottom: 3vh;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
