import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setVisible(false);
            setTimeout(onComplete, 600);
          }, 300);
          return 100;
        }
        return prev + Math.random() * 12 + 4;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  const letters = 'KHUSHBU'.split('');

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-neutral-950"
        >
          {/* Radial glow background */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(14,165,233,0.12) 0%, transparent 70%)',
            }}
          />

          {/* Animated ring */}
          <div className="relative mb-10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
              className="w-20 h-20 rounded-full"
              style={{
                border: '2px solid transparent',
                borderTopColor: '#0ea5e9',
                borderRightColor: '#38bdf8',
              }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'linear' }}
              className="absolute inset-2 rounded-full"
              style={{
                border: '2px solid transparent',
                borderBottomColor: '#0284c7',
                borderLeftColor: '#7dd3fc',
              }}
            />
            {/* Center dot */}
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-sky-400" />
            </motion.div>
          </div>

          {/* Name letters with staggered animation */}
          <div className="flex gap-1.5 mb-2">
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: i * 0.08,
                  duration: 0.5,
                  ease: 'easeOut',
                }}
                className="text-3xl font-bold tracking-widest text-white"
                style={{ fontFamily: 'system-ui, sans-serif' }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.6 }}
            className="text-xs tracking-[0.3em] text-sky-400 uppercase mb-10"
          >
            Portfolio
          </motion.p>

          {/* Progress bar */}
          <div className="w-48 h-[2px] bg-neutral-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${Math.min(progress, 100)}%`,
                background: 'linear-gradient(90deg, #0ea5e9, #38bdf8)',
                boxShadow: '0 0 8px rgba(14,165,233,0.8)',
              }}
              transition={{ ease: 'easeOut' }}
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.4 }}
            className="text-xs text-neutral-500 mt-3 tabular-nums"
          >
            {Math.min(Math.round(progress), 100)}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;