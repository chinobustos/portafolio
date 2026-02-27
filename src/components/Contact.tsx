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
    <section id="contact" className="snap-start min-h-screen py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ... (Motion y Título) ... */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 gradient-text font-heading">
            TRABAJEMOS JUNTOS
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            ¿Tienes un proyecto en mente? Me encantaría escuchar tus ideas y 
            ayudarte a convertirlas en realidad digital.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* ... (Panel de Contacto e Info) ... */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* ... (INFORMACIÓN DE CONTACTO y ¿POR QUÉ TRABAJAR CONMIGO? son iguales) ... */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-red-500 font-heading">
                INFORMACIÓN DE CONTACTO
              </h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -30 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.12 }}
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-4 group"
                  >
                    <motion.div
                      className="bg-black p-3 rounded-full red-border-glow"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <info.icon className="w-5 h-5 text-red-500" />
                    </motion.div>
                    <div>
                      <h4 className="font-semibold text-white font-heading">{info.title}</h4>
                      <motion.a
                        href={info.href}
                        whileHover={{ color: "#ff003c" }}
                        className="text-gray-300 transition-colors duration-300"
                      >
                        {info.content}
                      </motion.a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-black p-6 rounded-xl red-border-glow hover:border-red-500 transition-all duration-300"
            >
              <h4 className="font-semibold text-white mb-4 font-heading">
                ¿POR QUÉ TRABAJAR CONMIGO?
              </h4>
              <ul className="space-y-2 text-gray-300">
                {[
                  'Entrega puntual y calidad garantizada',
                  'Comunicación clara y constante',
                  'Soporte post-lanzamiento',
                  'Tecnologías modernas y actualizadas'
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -10 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="flex items-center group"
                  >
                    <motion.div
                      className="w-2 h-2 bg-red-500 rounded-full mr-3"
                      whileHover={{ scale: 1.5 }}
                    />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>


          {/* === PANEL DE FORMULARIO (MODIFICADO) === */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-black p-8 rounded-xl red-border-glow fade-up"
          >
            <h3 className="text-2xl font-bold mb-6 text-red-500 font-heading">
              ENVÍAME UN MENSAJE
            </h3>
            
            {/* ELIMINAMOS ACTION Y METHOD, AÑADIMOS REF y ON SUBMIT */}
            <form ref={form} onSubmit={sendEmail} className="space-y-6">
              {/* ELIMINAMOS _captcha y _next, EmailJS gestiona la respuesta */}
              
              {/* === NUEVO CAMPO DE NOMBRE === */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 10 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: 0.5 }}
              >
                <motion.input
                  type="text"
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/70 text-white px-4 py-3 rounded-lg form-glow transition-all duration-300 peer border border-gray-700 focus:border-red-500 focus:bg-black/90"
                  placeholder=" "
                  whileFocus={{ boxShadow: "0 0 20px rgba(255, 0, 60, 0.3)" }}
                />
                <label className="absolute left-4 top-3 text-gray-400 transition-all duration-300 peer-focus:-top-2 peer-focus:left-2 peer-focus:text-red-500 peer-focus:text-sm peer-focus:bg-black peer-focus:px-2 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:left-2 peer-[:not(:placeholder-shown)]:text-red-500 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:bg-black peer-[:not(:placeholder-shown)]:px-2">
                  Nombre completo
                </label>
              </motion.div>

              {/* CAMPO DE CORREO (Cambia 'name' de 'email' a 'user_email') */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 10 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: 0.6 }}
              >
                <motion.input
                  type="email"
                  name="user_email"
                  value={formData.user_email}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/70 text-white px-4 py-3 rounded-lg form-glow transition-all duration-300 peer border border-gray-700 focus:border-red-500 focus:bg-black/90"
                  placeholder=" "
                  whileFocus={{ boxShadow: "0 0 20px rgba(255, 0, 60, 0.3)" }}
                />
                <label className="absolute left-4 top-3 text-gray-400 transition-all duration-300 peer-focus:-top-2 peer-focus:left-2 peer-focus:text-red-500 peer-focus:text-sm peer-focus:bg-black peer-focus:px-2 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:left-2 peer-[:not(:placeholder-shown)]:text-red-500 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:bg-black peer-[:not(:placeholder-shown)]:px-2">
                  Correo electrónico
                </label>
              </motion.div>

              {/* CAMPO DE MENSAJE */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 10 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: 0.7 }}
              >
                <motion.textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-black/70 text-white px-4 py-3 rounded-lg form-glow transition-all duration-300 peer resize-none border border-gray-700 focus:border-red-500 focus:bg-black/90"
                  placeholder=" "
                  whileFocus={{ boxShadow: "0 0 20px rgba(255, 0, 60, 0.3)" }}
                />
                <label className="absolute left-4 top-3 text-gray-400 transition-all duration-300 peer-focus:-top-2 peer-focus:left-2 peer-focus:text-red-500 peer-focus:text-sm peer-focus:bg-black peer-focus:px-2 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:left-2 peer-[:not(:placeholder-shown)]:text-red-500 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:bg-black peer-[:not(:placeholder-shown)]:px-2">
                  Mensaje
                </label>
              </motion.div>
              
              {/* INDICADOR DE ESTADO */}
              {status && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-center font-semibold ${status.startsWith('Error') ? 'text-yellow-500' : 'text-red-500'}`}
                >
                  {status}
                </motion.p>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                initial={{ opacity: 0, y: 10 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: 0.8 }}
                whileHover={!isSubmitting ? { scale: 1.02, boxShadow: "0 0 30px rgba(255, 0, 60, 0.5)" } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                className="w-full bg-gradient-to-r from-red-600 to-red-800 text-white py-3 px-6 rounded-lg font-semibold hover:from-red-700 hover:to-red-900 transition-all duration-300 button-scale flex items-center justify-center space-x-2 font-heading pulse-red disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <motion.div
                  animate={isSubmitting ? { rotate: 360 } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Send size={20} />
                </motion.div>
                <span>{isSubmitting ? 'ENVIANDO...' : 'ENVIAR MENSAJE'}</span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;