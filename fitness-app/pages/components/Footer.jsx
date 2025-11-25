import React, { useState } from 'react';
import { Heart, MapPin, Phone, Mail, Instagram, Facebook, Twitter, ArrowUp, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Footer = () => {
  const [openSections, setOpenSections] = useState({});
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const quickLinks = [
    { name: 'Главная', href: '#home' },
    { name: 'Тренировки', href: '#classes' },
    { name: 'Тренеры', href: '#trainers' },
    { name: 'О нас', href: '#about' },
    { name: 'Контакты', href: '#contact' }
  ];

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/mnemozhno', label: 'Instagram' },
    { icon: Facebook, href: 'https://facebook.com/mnemozhno', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/mnemozhno', label: 'Twitter' }
  ];

  // Аккордеон секции для мобильных
  const AccordionSection = ({ title, children, sectionKey }) => (
    <div className="border-b border-gray-700/50 last:border-b-0">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="w-full py-4 flex items-center justify-between text-left font-semibold font-serif"
      >
        <span className="text-lg">{title}</span>
        {openSections[sectionKey] ? (
          <ChevronUp className="w-5 h-5 text-pink-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-pink-400" />
        )}
      </button>
      <AnimatePresence>
        {openSections[sectionKey] && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Основной контент */}
        <div className="lg:grid lg:grid-cols-4 lg:gap-8 space-y-6 lg:space-y-0">
          {/* Бренд и описание - всегда видимо */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold font-serif">Mne Mozhno</h3>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 text-sm lg:text-base hidden md:block">
              Пространство, где каждая женщина находит силу, уверенность и поддержку. 
              Мы создаём сообщество, вдохновляющее на изменения.
            </p>
            
          </motion.div>

          {/* Мобильный аккордеон */}
          <div className="lg:hidden space-y-2">
            <AccordionSection title="Навигация" sectionKey="navigation">
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li 
                    key={link.name} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <a 
                      href={link.href}
                      className="text-gray-300 hover:text-pink-400 transition-colors duration-300 flex items-center gap-2 group py-2"
                    >
                      <span className="w-1.5 h-1.5 bg-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </AccordionSection>

            <AccordionSection title="Контакты" sectionKey="contacts">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-pink-400 mt-1 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="text-gray-300">г. Волгоград,</p>
                    <p className="text-gray-300">ул. Ленина, 100, 3 этаж</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-pink-400 flex-shrink-0" />
                  <a href="tel:+79991234567" className="text-gray-300 hover:text-pink-400 transition-colors text-sm">
                    +7 (999) 123-45-67
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-pink-400 flex-shrink-0" />
                  <a href="mailto:hello@mne-mozhno.ru" className="text-gray-300 hover:text-pink-400 transition-colors text-sm">
                    hello@mne-mozhno.ru
                  </a>
                </div>
              </div>
            </AccordionSection>

            <AccordionSection title="Часы работы" sectionKey="hours">
              <div className="space-y-3 text-gray-300 text-sm">
                <div className="flex justify-between">
                  <span>Пн - Пт</span>
                  <span className="font-medium">5:00 - 22:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Суббота</span>
                  <span className="font-medium">6:00 - 20:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Воскресенье</span>
                  <span className="font-medium">7:00 - 19:00</span>
                </div>
              </div>
            </AccordionSection>
          </div>

          {/* Десктопная версия */}
          <div className="hidden lg:grid lg:grid-cols-3 lg:col-span-3 lg:gap-8">
            {/* Быстрые ссылки */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-lg font-semibold mb-6 font-serif">Навигация</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li key={link.name} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <a 
                      href={link.href}
                      className="text-gray-300 hover:text-pink-400 transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 bg-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Контакты */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-lg font-semibold mb-6 font-serif">Контакты</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-pink-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300">г. Волгоград,</p>
                    <p className="text-gray-300">ул. Ленина, 100, 3 этаж</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-pink-400 flex-shrink-0" />
                  <a href="tel:+79991234567" className="text-gray-300 transition-colors">
                    +7 (999) 123-45-67
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-pink-400 flex-shrink-0" />
                  <a href="mailto:mne-mozhno@mail.ru" className="text-gray-300 transition-colors">
                    mne-mozhno@mail.ru
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Часы работы */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="text-lg font-semibold mb-6 font-serif">Часы работы</h4>
              <div className="space-y-3 text-gray-300">
                <div className="flex justify-between">
                  <span>Пн - Пт</span>
                  <span className="font-medium">10:00 - 22:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Суббота</span>
                  <span className="font-medium">10:00 - 20:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Воскресенье</span>
                  <span className="font-medium">10:00 - 19:00</span>
                </div>
              </div>

              {/* CTA кнопка */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToTop}
                className="w-full mt-6 bg-white/10 hover:bg-pink-500 text-white py-3 px-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm border border-white/20 hover:border-pink-500"
              >
                <ArrowUp className="w-4 h-4" />
                Наверх
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Кнопка "Наверх" для мобильных */}
        <div className="lg:hidden flex justify-center mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="bg-white/10 hover:bg-pink-500 text-white py-3 px-6 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm border border-white/20 hover:border-pink-500"
          >
            <ArrowUp className="w-4 h-4" />
            Наверх
          </motion.button>
        </div>

        {/* Нижняя часть */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-8 border-t border-gray-700/50 mt-8 lg:mt-12"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p className="text-gray-400 text-sm order-2 md:order-1">
              2025 Mne Mozhno. 
              <span className="block sm:inline mt-1 sm:mt-0"> Сделано с ❤️ для сильных женщин</span>
            </p>
            
          </div>
        </motion.div>
      </div>

      {/* Декоративная волна */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 opacity-20"></div>
    </footer>
  );
};

export default Footer;