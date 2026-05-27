import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { Award, Briefcase, GraduationCap, Code2, Heart } from 'lucide-react';

const About: React.FC = () => {
  const { ref, isInView } = useInView();

  const timeline = [
    {
      icon: Briefcase,
      period: 'Oct 2024 – Present',
      role: 'Frontend Developer',
      company: 'Educerns Technologies',
      type: 'Full-time',
      color: 'from-sky-500 to-indigo-500',
      desc: 'Building production-grade frontend systems, responsive UI components, and integrating REST APIs in a full-time capacity.',
    },
    {
      icon: Briefcase,
      period: 'Jan 2024 – Sep 2024',
      role: 'Front-End Developer Intern',
      company: 'Educerns Technologies',
      type: 'Internship',
      color: 'from-indigo-500 to-violet-500',
      desc: 'Developed responsive UI, optimized performance, and collaborated with cross-functional teams on the MERN stack.',
    },
    {
      icon: GraduationCap,
      period: '2020 – 2024',
      role: 'B.Tech — Computer Science',
      company: 'Madhav Institute of Technology',
      type: 'GPA: 8+',
      color: 'from-emerald-500 to-teal-500',
      desc: 'Built strong CS fundamentals in data structures, algorithms, DBMS, OS, and computer networks.',
    },
    {
      icon: Code2,
      period: 'Side Projects',
      role: 'Open Source & Personal',
      company: 'Dev-Tinder · Food App · Portfolio',
      type: 'Self-driven',
      color: 'from-pink-500 to-rose-500',
      desc: 'Created production-ready apps including a MERN chat platform, config-driven food ordering app, and this portfolio.',
    },
  ];

  const values = [
    { icon: '⚡', label: 'Performance-first', desc: 'Every ms counts' },
    { icon: '🎨', label: 'Design-aware', desc: 'Pixel-perfect UIs' },
    { icon: '🤝', label: 'Team player', desc: 'Loves collaboration' },
    { icon: '📚', label: 'Always learning', desc: 'Growth mindset' },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 px-4 md:px-8 max-w-6xl mx-auto"
    >
      {/* ── Heading ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            About Me
          </span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-blue-600 mx-auto rounded-full" />
      </motion.div>

      {/* ── Alternating intro rows ── */}
      {/* Row 1: text left, card right */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-5"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            Hi, I'm <span className="text-primary-500">Khushbu</span> 👋
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
            I'm a full-stack developer with 9+ months of hands-on experience building scalable
            web applications using the MERN stack. I'm passionate about creating beautiful,
            performant user experiences and writing clean, maintainable code.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
            After completing my internship at Educerns Technologies, I transitioned into a
            <strong className="text-primary-500"> full-time Frontend Developer</strong> role at
            the same company — a testament to the quality and impact of my work.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="relative p-6 rounded-2xl bg-gradient-to-br from-primary-500/10 to-blue-500/10 border border-primary-200 dark:border-primary-800 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">KC</div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">Khushbu Chacholiya</p>
                <p className="text-xs text-primary-500">Frontend Developer · Educerns Technologies</p>
              </div>
              <span className="ml-auto text-xs bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 px-2 py-1 rounded-full font-medium">● Full-time</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                ['💼', 'MERN Stack'], ['⚛️', 'React + TS'],
                ['🗄️', 'MongoDB'], ['🎨', 'Tailwind CSS'],
              ].map(([icon, tech]) => (
                <div key={tech} className="flex items-center gap-2 bg-white dark:bg-neutral-800 rounded-lg px-3 py-2 shadow-sm border border-gray-100 dark:border-neutral-700">
                  <span>{icon}</span>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Row 2: card left, text right */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 gap-4"
        >
          {values.map((v) => (
            <div
              key={v.label}
              className="p-4 rounded-xl bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 shadow-sm hover:shadow-md transition-all text-center"
            >
              <div className="text-2xl mb-1">{v.icon}</div>
              <p className="font-semibold text-sm text-gray-900 dark:text-white">{v.label}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{v.desc}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-5"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">What drives me</h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
            During my time at Educerns Technologies, I've developed responsive UI components,
            integrated REST APIs, and optimized application performance — growing from intern
            to full-time developer in under a year.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
            My expertise spans frontend architecture, state management, JWT authentication,
            real-time features with Socket.IO, and modern deployment practices.
          </p>
        </motion.div>
      </div>

      {/* ── Timeline ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h3 className="text-2xl font-bold text-center mb-10 text-gray-900 dark:text-white">
          My Journey
        </h3>
        <div className="relative">
          {/* vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-violet-500 to-pink-500 hidden md:block" />

          <div className="space-y-6">
            {timeline.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.35 + idx * 0.1 }}
                  className="flex gap-6 items-start"
                >
                  {/* dot */}
                  <div className={`hidden md:flex shrink-0 w-12 h-12 rounded-full bg-gradient-to-br ${item.color} items-center justify-center shadow-lg z-10`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <div className="flex-1 p-5 rounded-xl bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 shadow-sm hover:shadow-md transition-all">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-bold text-gray-900 dark:text-white">{item.role}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full bg-gradient-to-r ${item.color} text-white font-medium`}>{item.type}</span>
                    </div>
                    <p className="text-sm text-primary-500 font-medium mb-1">{item.company}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">{item.period}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;