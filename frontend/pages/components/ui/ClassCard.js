import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, ArrowRight } from 'lucide-react';

export default function ClassCard({ workoutClass, onSignUpClick, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      className="group bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-lg sm:hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-pink-100 h-full flex flex-col"
    >
      <div className="p-4 sm:p-6 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-1">
            {workoutClass.name}
          </h3>
          
          <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
            {workoutClass.description}
          </p>

          {/* Детали тренировки */}
          <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-pink-500" />
              <span className="font-medium truncate">{workoutClass.timetable_description}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-pink-500" />
                <span>{workoutClass.duration_minutes} мин</span>
              </div>
              
              <div className="text-right">
                <div className="text-xl sm:text-2xl font-bold text-pink-600">
                  {workoutClass.price} ₽
                </div>
                <div className="text-xs text-gray-500">за занятие</div>
              </div>
            </div>
          </div>
        </div>

        <button 
          onClick={() => onSignUpClick(workoutClass)}
          className="btn btn-primary w-full cursor-pointer"
        >
          <span>Записаться</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}