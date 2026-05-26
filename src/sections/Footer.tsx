import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const [showTopButton, setShowTopButton] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-blue-600 bg-clip-text text-transparent mb-4">
              KC
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Building beautiful web experiences with modern technologies. Let's create something amazing together!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="font-bold mb-4 text-gray-900 dark:text-white">Quick Links</h3>
            <ul className="space-y-2">
              {['About', 'Skills', 'Projects', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 text-sm transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="font-bold mb-4 text-gray-900 dark:text-white">Connect</h3>
            <div className="space-y-2">
              {[
                { label: 'LinkedIn', url: 'https://www.linkedin.com/in/khushbu-chacholiya-073569262' },
                { label: 'GitHub', url: 'https://github.com/khushbu-chacholiya' },
                { label: 'Email', url: 'mailto:khushbuchacholiya68@gmail.com' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 text-sm transition-colors"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="border-t border-gray-200 dark:border-neutral-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <p>
              &copy; {currentYear} Khushbu Chacholiya. All rights reserved.
            </p>
            <p>
              Crafted with passion using React, TypeScript, and Tailwind CSS
            </p>
          </div>
        </div>
      </div>

      {showTopButton && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-gradient-to-r from-primary-500 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all z-40 hover:scale-110"
        >
          <ArrowUp size={24} />
        </motion.button>
      )}
    </footer>
  );
};

export default Footer;
