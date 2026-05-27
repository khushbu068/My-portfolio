import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { Send, Mail, MapPin, Phone, CheckCircle, XCircle } from 'lucide-react';

// ─── EmailJS — no backend needed ─────────────────────────────────────────────
// 1. Sign up free at https://www.emailjs.com
// 2. Create a Service (Gmail) → copy Service ID
// 3. Create an Email Template → copy Template ID
//    Template variables used: {{from_name}}, {{from_email}}, {{message}}
// 4. Go to Account → copy your Public Key
// 5. Paste all three below (or put in .env as VITE_EMAILJS_*)
const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID ;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

async function sendViaEmailJS(data: { name: string; email: string; message: string }) {
  const now = new Date().toLocaleString('en-IN', {
    dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Kolkata',
  });

  const payload = {
    service_id:  EMAILJS_SERVICE_ID,
    template_id: EMAILJS_TEMPLATE_ID,
    user_id:     EMAILJS_PUBLIC_KEY,
    template_params: {
      name:     data.name,
      message:  data.message,
      time:     `${now} · ${data.email}`,
      reply_to: data.email,
    },
  };

  const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error('EmailJS error:', res.status, errText);
    throw new Error(errText);
  }
}

// ─── Component ────────────────────────────────────────────────────────────────
const Contact: React.FC = () => {
  const { ref, isInView } = useInView();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');
    try {
      await sendViaEmailJS(formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(
        EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID'
          ? 'EmailJS not configured yet — add your keys (see comment at top of Contact.tsx).'
          : 'Failed to send. Please try again or email me directly.'
      );
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
      color: 'from-sky-500 to-indigo-500',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 8962610173',
      link: 'tel:+918962610173',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Indore, MP, India',
      link: '#',
      color: 'from-pink-500 to-rose-500',
    },
  ];

  const socials = [
    {
      label: 'LinkedIn',
      icon: '💼',
      url: 'https://www.linkedin.com/in/khushbu-chacholiya-073569262',
      color: 'hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5]',
    },
    {
      label: 'GitHub',
      icon: '🐙',
      url: 'https://github.com/khushbu068',
      color: 'hover:bg-neutral-900 hover:text-white hover:border-neutral-900 dark:hover:bg-white dark:hover:text-neutral-900',
    },
  ];

  return (
    <section
      id="contact"
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
            Get In Touch
          </span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-blue-600 mx-auto rounded-full mb-4" />
        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto text-sm">
          Open to new opportunities, collaborations, or just a friendly hello. I'll reply within 24 hours.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-10 items-start">

        {/* ── Left: contact info + socials ── */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-8"
        >
          <div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
              Let's work together 🤝
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-justify">
              I'm actively looking for full-time roles and freelance projects. Whether you have a product idea, want to discuss a role, or just want to say hi — my inbox is always open.
            </p>
          </div>

          {/* Contact cards */}
          <div className="space-y-3">
            {contactInfo.map((info, idx) => {
              const Icon = info.icon;
              return (
                <motion.a
                  key={idx}
                  whileHover={{ x: 5 }}
                  href={info.link}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 shadow-sm hover:shadow-md transition-all group"
                >
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center shadow-md shrink-0`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">
                      {info.label}
                    </p>
                    <p className="text-gray-900 dark:text-white font-medium text-sm group-hover:text-primary-500 transition-colors">
                      {info.value}
                    </p>
                  </div>
                </motion.a>
              );
            })}
          </div>

          {/* Social links */}
          <div>
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-3">
              Find me on
            </p>
            <div className="flex gap-3">
              {socials.map((s, idx) => (
                <motion.a
                  key={idx}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 font-semibold text-sm text-gray-700 dark:text-gray-300 shadow-sm transition-all ${s.color}`}
                >
                  <span>{s.icon}</span>
                  {s.label}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Availability badge */}
          <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
            <p className="text-sm text-emerald-700 dark:text-emerald-400 font-medium">
              Available for new opportunities
            </p>
          </div>
        </motion.div>

        {/* ── Right: contact form ── */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form
            onSubmit={handleSubmit}
            className="p-8 rounded-2xl bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 shadow-xl space-y-5"
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Send a message</h3>

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold mb-1.5 text-gray-700 dark:text-gray-300">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Khushbu Chacholiya"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-neutral-600 bg-gray-50 dark:bg-neutral-700/60 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-1.5 text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-neutral-600 bg-gray-50 dark:bg-neutral-700/60 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-semibold mb-1.5 text-gray-700 dark:text-gray-300">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Hi Khushbu, I'd love to discuss..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-neutral-600 bg-gray-50 dark:bg-neutral-700/60 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none text-sm"
              />
            </div>

            {/* Status messages */}
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-400 text-sm"
              >
                <CheckCircle size={18} className="shrink-0" />
                Message sent! I'll get back to you within 24 hours.
              </motion.div>
            )}
            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-400 text-sm"
              >
                <XCircle size={18} className="shrink-0" />
                {errorMsg}
              </motion.div>
            )}

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(56,189,248,0.35)' }}
              whileTap={{ scale: 0.97 }}
              disabled={isSubmitting}
              type="submit"
              className="w-full px-6 py-3.5 bg-gradient-to-r from-primary-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg transition-all disabled:opacity-60 flex items-center justify-center gap-2 text-sm"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                  Sending…
                </>
              ) : (
                <>Send Message <Send size={16} /></>
              )}
            </motion.button>

            <p className="text-xs text-center text-gray-400 dark:text-gray-500">
              Powered by{' '}
              <a href="https://emailjs.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary-500 transition-colors">
                EmailJS
              </a>{' '}
              · No backend required
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;