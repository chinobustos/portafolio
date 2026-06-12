import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';


const SERVICE_ID = 'service_u96zquo';
const TEMPLATE_ID = 'template_hbfysup';
const PUBLIC_KEY = 'vKPTqDVhBpp1PF0vH';

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState('');

  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: ''
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;

    setIsSubmitting(true);
    setStatus('Enviando...');

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then(
        () => {
          setStatus('¡Mensaje enviado con éxito!');
          setFormData({ user_name: '', user_email: '', message: '' });
        },
        () => {
          setStatus('Error al enviar. Inténtalo de nuevo.');
        }
      )
      .finally(() => {
        setIsSubmitting(false);
        setTimeout(() => setStatus(''), 5000);
      });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'ivanbustosdev@gmail.com',
      href: 'mailto:ivanbustosdev@gmail.com'
    },
    {
      icon: Phone,
      title: 'Teléfono',
      content: '+54 261 265 3733',
      href: 'tel:+542612653733'
    },
    {
      icon: MapPin,
      title: 'Ubicación',
      content: 'Ciudad de Mendoza, Argentina',
      href: '#'
    }
  ];

  return (
    <section
      id="contact"
      className="relative snap-start min-h-screen py-24 bg-transparent overflow-hidden"
    >
      {/* Fondo futurista */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl top-20 left-10 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl bottom-20 right-10 animate-pulse"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6">

        {/* TÍTULO */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-white mb-6">
            Trabajemos juntos
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Si tienes una idea o proyecto en mente, estaré encantado de ayudarte
            a convertirlo en una experiencia digital sólida y profesional.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20">

          {/* INFO IZQUIERDA */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.8 }}
            className="space-y-16"
          >
            <div>
              <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-10">
                Información de contacto
              </h3>

              <div className="space-y-8">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <info.icon className="w-5 h-5 text-white mt-1 opacity-70" />
                    <div>
                      <p className="text-white font-medium">{info.title}</p>
                      <a
                        href={info.href}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {info.content}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* FORMULARIO */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.8 }}
            className="glass-dark p-10 relative rounded-2xl overflow-hidden"
          >
            {/* Glow animado */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-2xl opacity-40 animate-pulse pointer-events-none"></div>

            <h3 className="text-white text-xl mb-10 tracking-wide relative">
              Envíame un mensaje
            </h3>

            <form ref={form} onSubmit={sendEmail} className="space-y-8 relative">

              {/* Nombre */}
              <input
                type="text"
                name="user_name"
                value={formData.user_name}
                onChange={handleChange}
                required
                placeholder="Nombre completo"
                className="w-full bg-transparent border-b border-white/20 pb-3 text-white placeholder-gray-500 focus:outline-none focus:border-transparent focus:bg-gradient-to-r focus:from-cyan-400 focus:to-purple-500 focus:bg-[length:100%_2px] focus:bg-no-repeat focus:bg-bottom transition-all duration-500"
              />

              {/* Email */}
              <input
                type="email"
                name="user_email"
                value={formData.user_email}
                onChange={handleChange}
                required
                placeholder="Correo electrónico"
                className="w-full bg-transparent border-b border-white/20 pb-3 text-white placeholder-gray-500 focus:outline-none focus:border-transparent focus:bg-gradient-to-r focus:from-cyan-400 focus:to-purple-500 focus:bg-[length:100%_2px] focus:bg-no-repeat focus:bg-bottom transition-all duration-500"
              />

              {/* Mensaje */}
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Mensaje"
                className="w-full bg-transparent border-b border-white/20 pb-3 text-white placeholder-gray-500 resize-none focus:outline-none focus:border-transparent focus:bg-gradient-to-r focus:from-cyan-400 focus:to-purple-500 focus:bg-[length:100%_2px] focus:bg-no-repeat focus:bg-bottom transition-all duration-500"
              />

              {status && (
                <p
                  className={`text-sm ${
                    status.startsWith('Error')
                      ? 'text-yellow-400'
                      : 'text-green-400'
                  }`}
                >
                  {status}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full glass-button-dark py-3 rounded-full text-white tracking-wide transition-all duration-500 disabled:opacity-40"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
              </button>

            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
