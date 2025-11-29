// Секция "О нас"
import React from 'react';
import { motion } from 'framer-motion';
import { FEATURES } from '../../utils/constants';

export default function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-24 px-3 sm:px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-7 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 sm:mb-5 font-serif">Наши принципы</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 hidden md:block">
            Мы строим сообщество, где поддержка и развитие идут рука об руку
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1 hidden lg:block"
          >
            <div className="rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl">
              <img
                src="/woman-support.png"
                className="w-full h-64 sm:h-80 lg:h-[400px] object-cover"
                alt="Поддержка женщин"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="grid gap-4 sm:gap-6 order-1 lg:order-2"
          >
            {FEATURES.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 group"
              >
                <div className="flex items-start gap-4 sm:gap-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-pink-100 rounded-xl sm:rounded-2xl flex items-center justify-center transition-colors">
                    <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600 transition-colors duration-500" />
                  </div>
                  <div>
                    <h3 className="sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}