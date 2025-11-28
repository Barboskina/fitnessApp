// Главная секция
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import { useScroll } from '../../hooks/useScroll';

export default function HeroSection() {
  const { scrollToSection } = useScroll();

  return (
    <section id="home" className="relative pt-28 pb-16 sm:pt-32 sm:pb-20 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 font-serif leading-tight"
          >
            Mne Mozhno
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-4"
          >
            Особый подход к занятиям спортом, который помогает женщинам стать сильнее и увереннее в себе.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
          >
            <button 
              onClick={() => scrollToSection('classes')} 
              className="btn btn-primary cursor-pointer"
            >
              <span>Все тренировки</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="btn btn-secondary cursor-pointer"
            >
              <span>Записаться</span>
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="max-w-4xl mx-auto group bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-pink-100"
        >
          <img 
            src="/main.jpg"
            className="w-full h-48 sm:h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
            alt="Главное изображение"
          />
        </motion.div>
      </div>
    </section>
  );
}