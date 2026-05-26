import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { CheckCircle2 } from 'lucide-react';

const Experience: React.FC = () => {
  const { ref, isInView } = useInView();

  const experiences = [
    {
      company: 'Educerns Technologies Pvt. Ltd.',
      position: 'Front-End Developer Intern',
      period: 'Aug 2025 – May 2026',
      highlights: [
        'Developed responsive and reusable UI components using React.js, TypeScript, Tailwind CSS',
        'Collaborated with backend developers and designers for seamless user experiences',
        'Improved application performance by optimizing component rendering',
        'Integrated REST APIs and handled asynchronous state updates',
        'Worked with Git-based workflows and Agile sprint cycles',
      ],
    },
  ];

  const education = [
    {
      institution: 'Madhav Institute of Technology and Science, Gwalior',
      degree: 'Computer Science and Engineering',
      period: 'Nov 2022 – May 2026',
      details: 'GPA: 8+',
      coursework: [
        'Data Structures & Algorithms',
        'Operating Systems',
        'DBMS',
        'Distributed Systems',
        'Computer Networks',
        'OOP',
        'Web Development',
      ],
    },
  ];

  return (
    <section
      id="experience"
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
            Experience
          </span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-blue-600 mx-auto" />
      </motion.div>

      <div className="mb-16">
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-2xl font-bold mb-8 text-gray-900 dark:text-white"
        >
          Professional Experience
        </motion.h3>

        {experiences.map((exp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 * idx }}
            className="p-8 rounded-xl bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 shadow-lg hover:shadow-xl transition-all group"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
              <div>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {exp.position}
                </h4>
                <p className="text-primary-600 dark:text-primary-400 font-semibold">
                  {exp.company}
                </p>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400 mt-2 md:mt-0">
                {exp.period}
              </span>
            </div>

            <div className="space-y-3">
              {exp.highlights.map((highlight, hIdx) => (
                <motion.div
                  key={hIdx}
                  whileHover={{ x: 4 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2
                    size={20}
                    className="text-primary-500 flex-shrink-0 mt-1"
                  />
                  <p className="text-gray-700 dark:text-gray-300">{highlight}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div>
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-2xl font-bold mb-8 text-gray-900 dark:text-white"
        >
          Education
        </motion.h3>

        {education.map((edu, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 + 0.1 * idx }}
            className="p-8 rounded-xl bg-gradient-to-br from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 border border-primary-200 dark:border-primary-800"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
              <div>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {edu.degree}
                </h4>
                <p className="text-primary-600 dark:text-primary-400 font-semibold">
                  {edu.institution}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {edu.details}
                </p>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400 mt-2 md:mt-0">
                {edu.period}
              </span>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Relevant Coursework:
              </p>
              <div className="flex flex-wrap gap-2">
                {edu.coursework.map((course, cIdx) => (
                  <motion.span
                    key={cIdx}
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1 bg-white dark:bg-neutral-800 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300 border border-primary-200 dark:border-primary-700"
                  >
                    {course}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
