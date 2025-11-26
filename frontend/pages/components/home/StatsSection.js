// Секция статистики
import React from 'react';
import { motion } from 'framer-motion';
import { STATS } from '../../utils/constants';

export default function StatsSection() {
  return (
    <section className="py-8 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 md:gap-12">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: stat.delay }}
              className="text-center sm:text-center"
            >
              {/* Мобильная версия */}
              <div className="sm:hidden flex items-center justify-start space-x-4 bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-left flex-1">
                  <h3 className="text-xl font-bold text-gray-900 font-serif">{stat.number}</h3>
                  <p className="text-gray-700 text-sm">{stat.label}</p>
                </div>
              </div>

              {/* Десктоп версия */}
              <div className="hidden sm:block group">
                <div className="w-20 h-20 mx-auto bg-white rounded-2xl shadow-lg flex items-center justify-center mb-6 group-hover:shadow-xl transition-all duration-500">
                  <stat.icon className={`w-10 h-10 ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 font-serif">{stat.number}</h3>
                <p className="text-gray-700 text-lg leading-tight">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}