import React, { useState, useEffect } from 'react';
import { Heart, Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ scrollToSection }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { name: 'Главная', id: 'home' },
    { name: 'Тренировки', id: 'classes' },
    { name: 'Тренеры', id: 'trainers' },
    { name: 'О нас', id: 'about' },
    { name: 'Контакты', id: 'contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    // Добавляем небольшую задержку для закрытия меню перед скроллом
    setIsMobileMenuOpen(false);
    
    setTimeout(() => {
      scrollToSection(sectionId);
    }, 100);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100/50' 
        : 'bg-white/80 backdrop-blur-md border-b border-gray-200/30'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center cursor-pointer group"
            onClick={() => handleNavClick('home')}
          >
            <div className="relative">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300"
              >
                <Heart className="w-6 h-6 text-white" />
              </motion.div>
              <div className="absolute -inset-2 bg-pink-200 rounded-2xl opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-500 -z-10"></div>
            </div>
            <div className="ml-3 hidden lg:block">
              <h1 className="text-2xl font-bold text-gray-900 font-serif leading-tight">
                Mne Mozhno
              </h1>
            </div>
          </motion.div>

          {/* Десктопная навигация */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => handleNavClick(item.id)}
                className="relative px-4 py-2 text-gray-700 hover:text-pink-600 font-medium transition-colors duration-300 group/nav "
              >
                {item.name}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-rose-500 group-hover/nav:w-4/5 group-hover/nav:left-1/5 transition-all duration-300 rounded-full"></span>
              </motion.button>
            ))}
            
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              onClick={() => handleNavClick('classes')}
              className="ml-4 bg-gradient-to-r from-pink-600 to-rose-600 text-white px-6 py-3 rounded-2xl font-semibold hover:from-pink-700 hover:to-rose-700 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg flex items-center gap-2 group/cta  cursor-pointer"
            >
              <span>Записаться</span>
              <ArrowRight className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform" />
            </motion.button>
          </nav>

          {/* Мобильное меню */}
          <button
            className="lg:hidden w-12 h-12 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl flex items-center justify-center text-gray-700 hover:text-pink-600 hover:border-pink-300 hover:shadow-lg transition-all duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Мобильное меню с анимацией */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden"
            >
              <motion.nav 
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                exit={{ y: -20 }}
                transition={{ duration: 0.3 }}
                className="py-6 shadow-xl"
              >
                <div className="space-y-4">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleNavClick(item.id)}
                      className="w-full text-left px-6 py-3 text-gray-700 font-medium transition-colors duration-300 rounded-xl flex items-center group"
                    >
                      <span>{item.name}</span>
                      <ArrowRight className="w-4 h-4 ml-auto opacity-0 transform transition-all duration-300" />
                    </motion.button>
                  ))}
                  
                </div>

              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;  