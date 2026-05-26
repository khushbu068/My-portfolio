import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { Send, Mail, MapPin, Phone } from 'lucide-react';

const Contact: React.FC = () => {
  const { ref, isInView } = useInView();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
const apiUrl: string =
  import.meta.env.VITE_API_URL || 'http://localhost:3001';
        const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitStatus('idle'), 3000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'khushbuchacholiya68@gmail.com',
      link: 'mailto:khushbuchacholiya68@gmail.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 8962610173',
      link: 'tel:+918962610173',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Indore, MP, India',
      link: '#',
    },
  ];

  return (
    <section
      id="contact"
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
            Get In Touch
          </span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-blue-600 mx-auto" />
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          <div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Let's connect!
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hi, feel free to reach out!
            </p>
          </div>

          <div className="space-y-4">
            {contactInfo.map((info, idx) => {
              const Icon = info.icon;
              return (
                <motion.a
                  key={idx}
                  whileHover={{ x: 4 }}
                  href={info.link}
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800 transition-all"
                >
                  <div className="p-3 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex-shrink-0">
                    <Icon className="text-primary-600 dark:text-primary-400" size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">
                      {info.label}
                    </p>
                    <p className="text-gray-900 dark:text-white font-medium">
                      {info.value}
                    </p>
                  </div>
                </motion.a>
              );
            })}
          </div>

          <div className="pt-4 space-y-3">
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">
              Connect with me
            </p>
            <div className="flex gap-4">
              {[
                { label: 'LinkedIn', url: 'https://www.linkedin.com/in/khushbu-chacholiya-073569262' },
                { label: 'GitHub', url: 'https://github.com/khushbu-chacholiya' },
              ].map((social, idx) => (
                <motion.a
                  key={idx}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gray-200 dark:bg-neutral-800 rounded-lg font-semibold hover:bg-primary-500 hover:text-white dark:hover:bg-primary-600 transition-all"
                >
                  {social.label}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="p-8 rounded-xl bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 shadow-lg"
        >
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
              placeholder="Your name"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
              placeholder="your@email.com"
            />
          </div>

          <div className="mb-8">
            <label htmlFor="message" className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all resize-none"
              placeholder="Your message..."
            />
          </div>

          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-4 rounded-lg bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 text-green-700 dark:text-green-400"
            >
              Message sent successfully! I'll get back to you soon.
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-4 rounded-lg bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-400"
            >
              Error sending message. Please try again.
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(14, 165, 233, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            disabled={isSubmitting}
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-primary-500 to-blue-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSubmitting ? 'Sending...' : <>
              Send Message <Send size={18} />
            </>}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
