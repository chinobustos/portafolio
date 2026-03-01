import { useEffect, useState, useRef } from 'react'; 
// Importa emailjs y useRef
import emailjs from '@emailjs/browser'; 
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

// === REEMPLAZA ESTOS VALORES CON TUS CREDENCIALES DE EMAILJS ===
const SERVICE_ID = 'service_u96zquo';    
const TEMPLATE_ID = 'template_hbfysup';
const PUBLIC_KEY = 'vKPTqDVhBpp1PF0vH';
// ===============================================================

const Contact = () => {
  // Referencia para capturar el formulario HTML
  const form = useRef<HTMLFormElement>(null); 
  
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState('');

  // AÑADIDO: 'user_name' para el nombre del cliente
  const [formData, setFormData] = useState({
    user_name: '', 
    user_email: '', // Cambiado de 'email' a 'user_email' para coincidir con la plantilla EmailJS (opcional, pero recomendado)
    message: ''
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('contact');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // NUEVA FUNCIÓN PARA ENVIAR CORREO CON EMAILJS
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evita el envío tradicional del formulario
    
    if (!form.current) return;
    
    setIsSubmitting(true);
    setStatus('Enviando...');

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then((result) => {
        console.log(result.text);
        setStatus('¡Mensaje enviado con éxito!');
        // Limpiar el formulario
        setFormData({ user_name: '', user_email: '', message: '' });
      }, (error) => {
        console.log(error.text);
        setStatus('Error al enviar. Inténtalo de nuevo.');
      })
      .finally(() => {
        setIsSubmitting(false);
        // Opcional: limpiar el estado de status después de unos segundos
        setTimeout(() => setStatus(''), 5000); 
      });
  };

  const contactInfo = [
    // ... (El resto de contactInfo es igual)
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
  <section id="contact" className="snap-start min-h-screen py-24 bg-black">
    <div className="max-w-6xl mx-auto px-6">

      {/* ===== TÍTULO ===== */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 40 }}
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

      {/* ===== GRID PRINCIPAL ===== */}
      <div className="grid lg:grid-cols-2 gap-20">

        {/* ===== INFO IZQUIERDA ===== */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -40 }}
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
                    <p className="text-white font-medium">
                      {info.title}
                    </p>
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

          <div className="border border-white/10 rounded-xl p-8 backdrop-blur-sm bg-white/5">
            <h4 className="text-white mb-6 font-medium">
              ¿Por qué trabajar conmigo?
            </h4>

            <ul className="space-y-3 text-gray-400 text-sm">
              {[
                'Entrega puntual y calidad garantizada',
                'Comunicación clara y constante',
                'Soporte post-lanzamiento',
                'Tecnologías modernas y actualizadas'
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="w-1.5 h-1.5 bg-white mt-2 rounded-full opacity-60"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>


        {/* ===== FORMULARIO DERECHO ===== */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 40 }}
          transition={{ duration: 0.8 }}
          className="border border-white/10 rounded-2xl p-10 bg-white/5 backdrop-blur-md"
        >
          <h3 className="text-white text-xl mb-10 tracking-wide">
            Envíame un mensaje
          </h3>

          <form ref={form} onSubmit={sendEmail} className="space-y-8">

            {/* Nombre */}
            <input
              type="text"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
              required
              placeholder="Nombre completo"
              className="w-full bg-transparent border-b border-white/20 pb-3 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
            />

            {/* Email */}
            <input
              type="email"
              name="user_email"
              value={formData.user_email}
              onChange={handleChange}
              required
              placeholder="Correo electrónico"
              className="w-full bg-transparent border-b border-white/20 pb-3 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
            />

            {/* Mensaje */}
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Mensaje"
              className="w-full bg-transparent border-b border-white/20 pb-3 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors resize-none"
            />

            {/* Status */}
            {status && (
              <p className={`text-sm ${status.startsWith('Error') ? 'text-yellow-400' : 'text-white'}`}>
                {status}
              </p>
            )}

            {/* Botón minimal */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full border border-white/20 py-3 rounded-full text-white tracking-wide hover:bg-white hover:text-black transition-all duration-500 disabled:opacity-40"
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
