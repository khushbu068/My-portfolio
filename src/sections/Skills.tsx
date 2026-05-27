import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

// ── Skill icons as inline SVGs / emoji fallbacks ──────────────────────────────
// Using devicon-style colored SVG paths via simple components
const SkillBadge: React.FC<{ name: string; icon: string; color: string }> = ({ name, icon, color }) => (
  <motion.div
    whileHover={{ scale: 1.08, y: -3 }}
    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 shadow-sm hover:shadow-md transition-all cursor-default"
  >
    <span className="text-lg leading-none" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.15))' }}>{icon}</span>
    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{name}</span>
    <div className="ml-auto w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color }} />
  </motion.div>
);

const skillCategories = [
  {
    title: 'Frontend',
    gradient: 'from-sky-500 to-indigo-500',
    bg: 'from-sky-500/10 to-indigo-500/10',
    border: 'border-sky-200 dark:border-sky-800',
    glow: 'rgba(56,189,248,0.15)',
    skills: [
      { name: 'React.js',       icon: '⚛️', color: '#61dafb' },
      { name: 'TypeScript',     icon: '🔷', color: '#3178c6' },
      { name: 'Redux Toolkit',  icon: '🔮', color: '#764abc' },
      { name: 'Tailwind CSS',   icon: '🌊', color: '#38bdf8' },
      { name: 'ShadCN UI',      icon: '🖤', color: '#18181b' },
      { name: 'Daisy UI',       icon: '🌸', color: '#ff69b4' },
    ],
  },
  {
    title: 'Backend',
    gradient: 'from-emerald-500 to-teal-500',
    bg: 'from-emerald-500/10 to-teal-500/10',
    border: 'border-emerald-200 dark:border-emerald-800',
    glow: 'rgba(52,211,153,0.15)',
    skills: [
      { name: 'Node.js',         icon: '🟢', color: '#8cc84b' },
      { name: 'Express.js',      icon: '🚂', color: '#000000' },
      { name: 'REST APIs',       icon: '🔗', color: '#ff6c37' },
      { name: 'JWT Auth',        icon: '🔐', color: '#d63aff' },
      { name: 'Middleware',      icon: '⚙️', color: '#6b7280' },
      { name: 'MVC',             icon: '🏗️', color: '#f59e0b' },
    ],
  },
  {
    title: 'Database & Cloud',
    gradient: 'from-orange-500 to-red-500',
    bg: 'from-orange-500/10 to-red-500/10',
    border: 'border-orange-200 dark:border-orange-800',
    glow: 'rgba(249,115,22,0.15)',
    skills: [
      { name: 'MongoDB',         icon: '🍃', color: '#4db33d' },
      { name: 'Firebase',        icon: '🔥', color: '#ffca28' },
      { name: 'Cloudinary',      icon: '☁️', color: '#3448c5' },
      { name: 'Supabase',        icon: '⚡', color: '#3ecf8e' },
      { name: 'Real-time DB',    icon: '📡', color: '#ff6d00' },
      { name: 'Storage',         icon: '💾', color: '#60a5fa' },
    ],
  },
  {
    title: 'Tools',
    gradient: 'from-pink-500 to-rose-500',
    bg: 'from-pink-500/10 to-rose-500/10',
    border: 'border-pink-200 dark:border-pink-800',
    glow: 'rgba(244,114,182,0.15)',
    skills: [
      { name: 'Git',             icon: '🌿', color: '#f05032' },
      { name: 'GitHub',          icon: '🐙', color: '#181717' },
      { name: 'Postman',         icon: '📮', color: '#ff6c37' },
      { name: 'Axios',           icon: '📦', color: '#5a29e4' },
      { name: 'Socket.IO',       icon: '🔌', color: '#010101' },
      { name: 'Vercel',          icon: '▲', color: '#000000' },
    ],
  },
  {
    title: 'Languages',
    gradient: 'from-purple-500 to-indigo-500',
    bg: 'from-purple-500/10 to-indigo-500/10',
    border: 'border-purple-200 dark:border-purple-800',
    glow: 'rgba(168,85,247,0.15)',
    skills: [
      { name: 'JavaScript',      icon: '🟨', color: '#f7df1e' },
      { name: 'TypeScript',      icon: '🔷', color: '#3178c6' },
      { name: 'C++',             icon: '⚙️', color: '#00599c' },
      { name: 'Python',          icon: '🐍', color: '#3572a5' },
      { name: 'HTML5',           icon: '🧱', color: '#e34f26' },
      { name: 'CSS3',            icon: '🎨', color: '#1572b6' },
    ],
  },
  {
    title: 'CS Fundamentals',
    gradient: 'from-cyan-500 to-blue-500',
    bg: 'from-cyan-500/10 to-blue-500/10',
    border: 'border-cyan-200 dark:border-cyan-800',
    glow: 'rgba(6,182,212,0.15)',
    skills: [
      { name: 'DSA',             icon: '🧩', color: '#f59e0b' },
      { name: 'DBMS',            icon: '🗄️', color: '#3b82f6' },
      { name: 'OS',              icon: '💻', color: '#6b7280' },
      { name: 'CN',              icon: '🌐', color: '#10b981' },
      { name: 'OOP',             icon: '🧬', color: '#8b5cf6' },
      { name: 'Distributed Sys', icon: '🕸️', color: '#ec4899' },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Skills: React.FC = () => {
  const { ref, isInView } = useInView();

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-24 px-4 md:px-8 max-w-6xl mx-auto"
    >
      {/* ── Heading ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Skills & Expertise
          </span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-blue-600 mx-auto rounded-full mb-4" />
        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-sm">
          Technologies I work with daily, organized by domain.
        </p>
      </motion.div>

      {/* ── Skill cards ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {skillCategories.map((cat, idx) => (
          <motion.div
            key={idx}
            variants={cardVariants}
            whileHover={{ y: -6, boxShadow: `0 20px 60px ${cat.glow}` }}
            className={`relative p-6 rounded-2xl bg-gradient-to-br ${cat.bg} border ${cat.border} overflow-hidden transition-all duration-300`}
          >
            {/* glow orb */}
            <div
              className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-40 pointer-events-none"
              style={{ background: `linear-gradient(135deg, ${cat.glow.replace('0.15', '0.6')}, transparent)` }}
            />

            {/* header */}
            <div className="flex items-center gap-3 mb-5">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.gradient} shadow-lg flex items-center justify-center`}>
                <span className="text-white font-bold text-xs">{cat.title.slice(0, 2).toUpperCase()}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{cat.title}</h3>
              <span className="ml-auto text-xs text-gray-400 dark:text-gray-500">{cat.skills.length} skills</span>
            </div>

            {/* skill badges */}
            <div className="grid grid-cols-1 gap-2">
              {cat.skills.map((skill) => (
                <SkillBadge key={skill.name} {...skill} />
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Currently learning banner ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-14 p-8 rounded-2xl bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 border border-primary-200 dark:border-primary-800"
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">🚀</span>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Currently Exploring</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {['Next.js 15', 'Advanced TypeScript', 'Web3', 'AI/ML in Web', 'Three.js', 'Docker'].map(t => (
            <span key={t} className="text-sm px-3 py-1.5 rounded-full bg-white dark:bg-neutral-800 border border-primary-200 dark:border-primary-700 text-primary-600 dark:text-primary-400 font-medium shadow-sm">
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;