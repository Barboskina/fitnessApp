// Секция тренировок
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import ClassCard from '../ui/ClassCard';
import BookingModal from './BookingModal';
import { useScroll } from '../../hooks/useScroll';

export default function ClassesSection({ workoutClasses, isLoading }) {
  const { scrollToSection } = useScroll();
  const [selectedClass, setSelectedClass] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSignUpClick = (classItem) => {
    setSelectedClass(classItem);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedClass(null);
  };

  if (isLoading) {
    return (
      <section id="classes" className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-gray-500">Загрузка тренировок...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="classes" className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-50/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-10"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 font-serif">Наши тренировки</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4 hidden md:block">
            Специальные программы, созданные с учётом особенностей женского организма
          </p>
        </motion.div>

        {!workoutClasses || workoutClasses.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Тренировки пока не добавлены
          </div>
        ) : (
          <div className="relative">
            <div className="relative px-5 sm:px-8 md:px-14">
              {/* Навигация */}
              <button className="btn-prev-train" aria-label="Предыдущий слайд">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 absolute top-1/2 left-1/2 transform -translate-x-4 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button className="btn-next-train" aria-label="Следующий слайд">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 absolute top-1/2 left-1/2 transform -translate-x-3 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={16}
                slidesPerView={1}
                navigation={{
                  nextEl: '.btn-next-train',
                  prevEl: '.btn-prev-train',
                }}
                pagination={{
                  clickable: true,
                  el: '.custom-swiper-pagination',
                }}
                breakpoints={{
                  320: { slidesPerView: 1 },
                  640: { slidesPerView: 1 },
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                  1280: { slidesPerView: 3 },
                }}
                className="pb-8 sm:pb-12"
              >
                {workoutClasses.map((workoutClass, index) => (
                  <SwiperSlide key={workoutClass.id}>
                    <ClassCard 
                      workoutClass={workoutClass} 
                      onSignUpClick={handleSignUpClick}
                      index={index}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="custom-swiper-pagination mt-4 flex justify-center"></div>
            </div>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-2 flex items-center justify-center gap-1"
        >
          <p className="text-gray-600 text-xs sm:text-sm">Не нашли подходящую тренировку?</p>
          <a 
            onClick={() => scrollToSection('contact')}
            className="font-semibold cursor-pointer hover:text-pink-600 text-xs sm:text-sm underline"
          >
            Напишите нам
          </a>
        </motion.div>

        <BookingModal
          isOpen={isModalOpen}
          onClose={closeModal}
          selectedClass={selectedClass}
        />
      </div>
    </section>
  );
}