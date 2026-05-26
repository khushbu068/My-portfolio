import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

const Skills: React.FC = () => {
  const { ref, isInView } = useInView();

  const skillCategories = [
    {
      title: 'Frontend',
      skills: [
        'React.js',
        'TypeScript',
        'Redux Toolkit',
        'Tailwind CSS',
        'ShadCN UI',
        'Daisy UI',
      ],
      color: 'from-primary-500 to-blue-500',
    },
    {
      title: 'Backend',
      skills: [
        'Node.js',
        'Express.js',
        'REST APIs',
        'JWT Authentication',
        'Middleware',
        'MVC Architecture',
      ],
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Database & Cloud',
      skills: ['MongoDB', 'Firebase', 'Cloudinary', 'Supabase', 'Real-time DB', 'Storage'],
      color: 'from-orange-500 to-red-500',
    },
    {
      title: 'Tools & Technologies',
      skills: ['Git', 'GitHub', 'Postman', 'Axios', 'Socket.IO', 'Vercel'],
      color: 'from-pink-500 to-rose-500',
    },
    {
      title: 'Languages',
      skills: ['JavaScript', 'TypeScript', 'C++', 'Python', 'HTML5', 'CSS3'],
      color: 'from-purple-500 to-indigo-500',
    },
    {
      title: 'CS Fundamentals',
      skills: ['DSA', 'DBMS', 'OS', 'CN', 'OOP', 'Distributed Systems'],
      color: 'from-cyan-500 to-blue-500',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      id="skills"
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
            Skills & Expertise
          </span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-blue-600 mx-auto" />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {skillCategories.map((category, idx) => (
          <motion.div key={idx} variants={itemVariants}>
            <motion.div
              whileHover={{ scale: 1.05, y: -8 }}
              className="h-full p-6 rounded-xl bg-white dark:bg-neutral-800 shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-neutral-700 group"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} mb-4 group-hover:scale-110 transition-transform`} />
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                {category.title}
              </h3>
              <div className="space-y-2">
                {category.skills.map((skill, skillIdx) => (
                  <motion.div
                    key={skillIdx}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary-500 to-blue-500" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm">
                      {skill}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-16 p-8 rounded-xl bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 border border-primary-200 dark:border-primary-800"
      >
        <h3 className="text-2xl font-bold mb-4">Continuous Learning</h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          I'm constantly learning and exploring new technologies. Currently interested in Next.js for full-stack development, advanced TypeScript patterns, Web3 technologies, and AI/ML integration in web applications.
        </p>
      </motion.div>
    </section>
  );
};

export default Skills;
