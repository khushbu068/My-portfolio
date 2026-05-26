import React from 'react';
import { motion } from 'framer-motion';

const FloatingShapes: React.FC = () => {
  const shapes = [
    {
      id: 1,
      size: 'w-72 h-72',
      color: 'bg-primary-500/30',
      blur: 'blur-3xl',
      duration: 8,
      delay: 0,
      x: [-50, 50],
      y: [-50, 50],
    },
    {
      id: 2,
      size: 'w-96 h-96',
      color: 'bg-blue-500/20',
      blur: 'blur-3xl',
      duration: 10,
      delay: 2,
      x: [50, -50],
      y: [50, -50],
    },
    {
      id: 3,
      size: 'w-64 h-64',
      color: 'bg-cyan-500/25',
      blur: 'blur-2xl',
      duration: 12,
      delay: 4,
      x: [-30, 30],
      y: [30, -30],
    },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className={`absolute rounded-full ${shape.size} ${shape.color} ${shape.blur}`}
          animate={{
            x: shape.x,
            y: shape.y,
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingShapes;
