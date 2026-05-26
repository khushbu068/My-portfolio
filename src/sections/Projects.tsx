import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { ExternalLink, Github } from 'lucide-react';

const Projects: React.FC = () => {
  const { ref, isInView } = useInView();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'fullstack' | 'frontend'>('all');

  const projects = [
    {
      id: 1,
      title: 'Dev-Tinder',
      description: 'Full-stack MERN chat and networking platform with real-time messaging using Socket.IO',
      category: 'fullstack',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=crop',
      technologies: [
        'React.js',
        'Node.js',
        'Express',
        'MongoDB',
        'Socket.IO',
        'Redux',
        'JWT',
      ],
      features: [
        'Real-time chat with Socket.IO',
        'JWT authentication & authorization',
        'User profiles & matching',
        'Redux state management',
        'Cloudinary media uploads',
        'Responsive design',
      ],
      links: {
        github: 'https://github.com/khushbu-chacholiya',
      },
    },
    {
      id: 2,
      title: 'Config-Driven Food Ordering App',
      description: 'Responsive food ordering application with Firebase integration and dynamic UI configuration',
      category: 'frontend',
      image: 'https://images.unsplash.com/photo-1585521537230-24454d92e807?w=500&h=300&fit=crop',
      technologies: ['React.js', 'Firebase', 'Tailwind CSS', 'Redux', 'Axios'],
      features: [
        'Config-driven UI components',
        'Firebase authentication',
        'Real-time database',
        'Order management',
        'Responsive UI',
        'Search & filtering',
      ],
      links: {
        github: 'https://github.com/khushbu-chacholiya',
      },
    },
    {
      id: 3,
      title: 'Personal Portfolio',
      description: 'Modern portfolio website with animations, dark mode, and responsive design',
      category: 'frontend',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
      technologies: ['React.js', 'Tailwind CSS', 'Framer Motion', 'Vite'],
      features: [
        'Smooth animations',
        'Dark/light theme',
        'Responsive layout',
        'SEO optimized',
        'Performance optimized',
        'Vercel deployment',
      ],
      links: {
        live: '#',
        github: 'https://github.com/khushbu-chacholiya',
      },
    },
  ];

  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const categories = [
    { label: 'All Projects', value: 'all' },
    { label: 'Full-Stack', value: 'fullstack' },
    { label: 'Frontend', value: 'frontend' },
  ];

  return (
    <section
      id="projects"
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
            Featured Projects
          </span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-blue-600 mx-auto" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-wrap justify-center gap-4 mb-12"
      >
        {categories.map((cat) => (
          <motion.button
            key={cat.value}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              setSelectedCategory(cat.value as 'all' | 'fullstack' | 'frontend')
            }
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              selectedCategory === cat.value
                ? 'bg-primary-500 text-white shadow-lg'
                : 'bg-gray-200 dark:bg-neutral-800 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-neutral-700'
            }`}
          >
            {cat.label}
          </motion.button>
        ))}
      </motion.div>

      <motion.div
        layout
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {filteredProjects.map((project, idx) => (
          <motion.div
            key={project.id}
            layoutId={project.id.toString()}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 * idx }}
            whileHover={{ y: -8 }}
            className="group h-full"
          >
            <div className="h-full rounded-xl overflow-hidden bg-white dark:bg-neutral-800 shadow-lg hover:shadow-2xl transition-all border border-gray-200 dark:border-neutral-700 flex flex-col">
              <div className="relative w-full h-48 overflow-hidden bg-gray-300 dark:bg-neutral-700">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                  {project.links.live && (
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      href={project.links.live}
                      className="p-2 bg-white rounded-full text-gray-900 hover:bg-primary-500 hover:text-white transition-all"
                    >
                      <ExternalLink size={20} />
                    </motion.a>
                  )}
                  {project.links.github && (
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      href={project.links.github}
                      className="p-2 bg-white rounded-full text-gray-900 hover:bg-primary-500 hover:text-white transition-all"
                    >
                      <Github size={20} />
                    </motion.a>
                  )}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-grow">
                  {project.description}
                </p>

                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
                    Key Features
                  </p>
                  <ul className="space-y-1">
                    {project.features.slice(0, 3).map((feature, fIdx) => (
                      <li key={fIdx} className="text-xs text-gray-600 dark:text-gray-400">
                        • {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((tech, tIdx) => (
                    <motion.span
                      key={tIdx}
                      whileHover={{ scale: 1.05 }}
                      className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded text-xs font-semibold"
                    >
                      {tech}
                    </motion.span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2 py-1 text-xs text-gray-500 dark:text-gray-400">
                      +{project.technologies.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Projects;
