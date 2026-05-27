import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import Ballpit from './Ballpit';
import img from '../assets/img.jpeg';

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
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden bg-neutral-900"
    >
      {/* ── Ballpit 3D background ── */}
      <div className="absolute inset-0 z-0">
        <Ballpit
          count={120}
          gravity={0.0}
          friction={0.9975}
          wallBounce={0.95}
          followCursor={true}
          colors={[0x38bdf8, 0x818cf8, 0xa78bfa, 0x34d399, 0x60a5fa, 0x38bdf8]}
          lightIntensity={180}
          minSize={0.28}
          maxSize={0.72}
          size0={1.1}
          maxVelocity={0.12}
          materialParams={{ metalness: 0.6, roughness: 0.25 }}
        />
      </div>

      {/* Dark overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(10,10,26,0.45) 0%, rgba(10,10,26,0.72) 100%)',
        }}
      />

      {/* ── Content ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto px-4 text-center"
      >
        {/* ── Avatar ── */}
        <motion.div variants={itemVariants} className="mb-6 flex justify-center">
          <motion.div
            whileHover={{ scale: 1.06 }}
            className="relative"
            style={{ width: 116, height: 116 }}
          >
            {/* Spinning conic gradient ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, #38bdf8, #818cf8, #a78bfa, #34d399, #38bdf8)',
                padding: 3,
              }}
            />
            {/* Dark gap between ring and photo */}
            <div
              className="absolute rounded-full bg-neutral-900"
              style={{ inset: 3 }}
            />
            {/* Photo — perfectly circular */}
            <img
              src={img}
              alt="Khushbu Chacholiya"
              className="absolute rounded-full object-cover object-top"
              style={{
                inset: 5,
                width: 'calc(100% - 10px)',
                height: 'calc(100% - 10px)',
              }}
            />
            {/* Online indicator */}
            <span
              className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-neutral-900 z-10"
              title="Available for opportunities"
            />
          </motion.div>
        </motion.div>

        {/* Name */}
        <motion.h1 variants={itemVariants} className="mb-4">
          <span className="text-5xl md:text-7xl font-bold">
            <span
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #94a3b8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Hi, I'm Khushbu
            </span>
          </span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          variants={itemVariants}
          className="mb-8 h-12 flex items-center justify-center"
        >
          <span className="text-2xl md:text-3xl font-semibold" style={{ color: '#38bdf8' }}>
            {displayedText}
            <span className="animate-pulse">|</span>
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          style={{ color: 'rgba(148,163,184,0.85)' }}
        >
          Building beautiful, performant web experiences with React, TypeScript, and modern
          web technologies. Currently a Frontend Developer at Educerns Technologies.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <motion.a
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(56,189,248,0.35)' }}
            whileTap={{ scale: 0.95 }}
            href="#projects"
            className="px-8 py-4 rounded-lg font-semibold shadow-lg transition-all flex items-center gap-2 text-white"
            style={{ background: 'linear-gradient(135deg, #38bdf8, #818cf8)' }}
          >
            View Projects <ArrowRight size={20} />
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/Chacholiya_khushbu_26May2026.pdf"
            download
            className="px-8 py-4 rounded-lg font-semibold transition-all flex items-center gap-2"
            style={{
              border: '1.5px solid rgba(56,189,248,0.35)',
              color: '#cbd5e1',
              background: 'rgba(56,189,248,0.06)',
            }}
          >
            <Download size={20} /> Resume
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div variants={itemVariants} className="flex justify-center gap-8">
          {[
            { label: '9M+', desc: 'Experience' },
            { label: '3+', desc: 'Projects' },
            { label: '10+', desc: 'Technologies' },
          ].map((stat, idx) => (
            <motion.div key={idx} whileHover={{ y: -5 }} className="text-center">
              <p className="text-2xl font-bold" style={{ color: '#38bdf8' }}>
                {stat.label}
              </p>
              <p className="text-sm" style={{ color: 'rgba(148,163,184,0.7)' }}>
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        style={{ color: 'rgba(56,189,248,0.5)' }}
      >
        ↓
      </motion.div>
    </section>
  );
};

export default Hero;