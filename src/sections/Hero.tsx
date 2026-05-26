import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';

const Hero: React.FC = () => {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = 'Full-Stack Developer & Digital Creator';

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 30);
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-50/5 to-transparent dark:via-primary-900/10" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto px-4 text-center"
      >
        <motion.div
          variants={itemVariants}
          className="mb-6 flex justify-center"
        >
          <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-primary-500 to-blue-600 p-1 shadow-2xl">
            <div className="w-full h-full rounded-full bg-white dark:bg-neutral-900 flex items-center justify-center">
              <span className="text-3xl font-bold bg-gradient-to-r from-primary-500 to-blue-600 bg-clip-text text-transparent">
                KC
              </span>
            </div>
          </div>
        </motion.div>

        <motion.h1 variants={itemVariants} className="mb-4">
          <span className="text-5xl md:text-7xl font-bold">
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Hi, I'm Khushbu
            </span>
          </span>
        </motion.h1>

        <motion.div
          variants={itemVariants}
          className="mb-8 h-12 flex items-center justify-center"
        >
          <span className="text-2xl md:text-3xl text-primary-500 font-semibold">
            {displayedText}
            <span className="animate-pulse">|</span>
          </span>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Building beautiful, performant web experiences with React, TypeScript, and modern web technologies. Currently a Front-End Developer Intern at Educerns Technologies.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <motion.a
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(14, 165, 233, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            href="#projects"
            className="px-8 py-4 bg-gradient-to-r from-primary-500 to-blue-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
          >
            View Projects <ArrowRight size={20} />
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/Chacholiya_khushbu_26May2026.pdf"
            download
            className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-neutral-800 transition-all flex items-center gap-2"
          >
            <Download size={20} /> Resume
          </motion.a>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex justify-center gap-8"
        >
          {[
            { label: '9M+', desc: 'Experience' },
            { label: '3+', desc: 'Projects' },
            { label: '10+', desc: 'Technologies' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="text-center"
            >
              <p className="text-2xl font-bold text-primary-500">{stat.label}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{stat.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="text-gray-400 dark:text-gray-600">↓</div>
      </motion.div>
    </section>
  );
};

export default Hero;
