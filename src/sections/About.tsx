import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { Award, Briefcase, GraduationCap } from 'lucide-react';

const About: React.FC = () => {
  const { ref, isInView } = useInView();

  const stats = [
    {
      icon: Briefcase,
      label: 'Experience',
      value: '9 Months',
      desc: 'at Educerns Technologies',
    },
    {
      icon: Award,
      label: 'Specialization',
      value: 'Full-Stack',
      desc: 'MERN Stack Development',
    },
    {
      icon: GraduationCap,
      label: 'Education',
      value: 'CSE',
      desc: 'Madhav Institute (GPA: 8+)',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-20 px-4 md:px-8 max-w-6xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            About Me
          </span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-blue-600 mx-auto" />
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-6"
        >
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
          >
            I'm a full-stack developer with 9 months of hands-on experience building scalable web applications using the MERN stack. I'm passionate about creating beautiful, performant user experiences and writing clean, maintainable code.
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
          >
            During my internship at Educerns Technologies, I've developed responsive UI components, integrated REST APIs, and optimized application performance. I love collaborating with teams and continuously learning new technologies.
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
          >
            My expertise spans frontend architecture, state management, authentication, real-time features, and modern deployment practices. I'm always eager to tackle challenging problems and contribute to meaningful projects.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 gap-6"
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-6 rounded-xl bg-white dark:bg-neutral-800 shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-neutral-700"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary-100 dark:bg-primary-900/30">
                    <Icon className="text-primary-600 dark:text-primary-400" size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {stat.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="p-8 rounded-xl bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 border border-primary-200 dark:border-primary-800"
      >
        <h3 className="text-2xl font-bold mb-4">My Journey</h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          I started my development journey focusing on understanding data structures and algorithms. During my studies at Madhav Institute, I built solid fundamentals in computer science. My transition to full-stack development came naturally as I combined these fundamentals with modern web technologies, resulting in the creation of several production-ready projects including Dev-Tinder (MERN chat platform), a config-driven food ordering app, and this portfolio.
        </p>
      </motion.div>
    </section>
  );
};

export default About;
