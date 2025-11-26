// Секция контактов
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Calendar, Zap } from 'lucide-react';
import { CONTACT_INFO } from '../../utils/constants';
import { useScroll } from '../../hooks/useScroll';

export default function ContactSection() {
  const { scrollToSection } = useScroll();

  return (
    <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 sm:w-72 sm:h-72 bg-pink-200 rounded-full blur-3xl opacity-20 -translate-y-24 sm:-translate-y-36 translate-x-12 sm:translate-x-36"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-purple-200 rounded-full blur-3xl opacity-20 -translate-x-24 sm:-translate-x-48 translate-y-24 sm:translate-y-48"></div>
      
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6 sm:mb-10"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 font-serif leading-tight">
            Начните свой путь
            <span className="block sm:inline bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent"> к уверенности</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
          {/* Левая колонка - Контакты */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg sm:shadow-xl hover:shadow-xl sm:hover:shadow-2xl transition-all duration-500 border border-gray-100"
          >
            <div className="space-y-2">
              <div className="flex items-start p-3 sm:p-4 rounded-xl sm:rounded-2xl">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600 mr-3 sm:mr-4 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Наш адрес</p>
                  <p className="text-gray-600 font-medium">{CONTACT_INFO.address}</p>
                </div>
              </div>
              
              <div className="flex items-start p-3 sm:p-4 rounded-xl sm:rounded-2xl">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600 mr-3 sm:mr-4 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Телефон</p>
                  <p className="text-gray-600 font-medium">{CONTACT_INFO.phone}</p>
                </div>
              </div>
              
              <div className="flex items-start p-3 sm:p-4 rounded-xl sm:rounded-2xl">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600 mr-3 sm:mr-4 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Почта</p>
                  <p className="text-gray-600 font-medium">{CONTACT_INFO.email}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="flex flex-col"
          >
            <div className="bg-gradient-to-br from-pink-600 to-rose-600 rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 text-white shadow-lg sm:shadow-xl flex-1">
              <div className="text-center mb-6 sm:mb-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 font-serif">Готовы начать?</h3>
                <p className="text-sm sm:text-base">
                  Присоединяйтесь к сообществу сильных и уверенных женщин уже сегодня
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <button 
                  onClick={() => scrollToSection('classes')} 
                  className="btn btn-white w-full flex items-center justify-center cursor-pointer"
                >
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Выбрать тренировку</span>
                </button>
                
                <a 
                  href={CONTACT_INFO.telegram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-outline w-full cursor-pointer"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.197c-.174-.422-.541-.718-1.003-.718H7.036c-.462 0-.829.296-1.003.718-.174.423-.119.91.143 1.287l2.571 3.745 2.518 6.477c.068.174.22.285.394.285.174 0 .326-.111.394-.285l2.518-6.477 2.571-3.745c.262-.377.317-.864.143-1.287z"/>
                  </svg>
                  <span>Написать в Telegram</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}