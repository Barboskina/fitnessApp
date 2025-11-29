// Секция тренеров
import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { getExperienceText } from '../../utils/formatters';
import { useScroll } from '../../hooks/useScroll';

const API_BASE_URL = 'http://127.0.0.1:8000/';

export default function TrainersSection({ trainers, isLoading }) {
  const { scrollToSection } = useScroll();

  if (isLoading) {
    return (
      <section id="trainers" className="py-16 sm:py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-gray-500">Загрузка тренеров...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="trainers" className="py-16 sm:py-20 px-4 sm:px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 font-serif">Наши тренеры</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 px-4 hidden md:block">
            Профессионалы, которые знают, для чего женщины ходят на фитнес.
          </p>
        </motion.div>

        {!trainers || trainers.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Тренеры пока не добавлены
          </div>
        ) : (
          <div className="relative">
            <div className="relative px-5 sm:px-8 md:px-14">
              {/* Навигация */}
              <button className="btn-prev-trainer" aria-label="Предыдущий тренер">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 absolute top-1/2 left-1/2 transform -translate-x-4 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button className="btn-next-trainer" aria-label="Следующий тренер">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 absolute top-1/2 left-1/2 transform -translate-x-3 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={16}
                slidesPerView={1}
                navigation={{
                  nextEl: '.btn-next-trainer',
                  prevEl: '.btn-prev-trainer',
                }}
                pagination={{
                  clickable: true,
                  el: '.custom-swiper-pagination-trainers',
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
                {trainers.map((trainer, index) => (
                  <SwiperSlide key={trainer.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 text-center shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col group hover:border-pink-100 w-80"
                    >
                      <div className="relative mb-4 sm:mb-6">
                        <img
                          src={trainer.image ? `${API_BASE_URL}media/${trainer.image}` : '/default-avatar.png'}
                          alt={`Фотография тренера ${trainer.name}`}
                          className="w-24 h-24 sm:w-32 sm:h-32 mx-auto object-cover rounded-full shadow-md group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src = '/default-avatar.png'
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-1">
                          {trainer.name}
                        </h3>
                        <p className="text-pink-600 font-medium mb-2 text-sm sm:text-base">
                          {trainer.specialty}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500 mb-4">
                          {trainer.experience} {getExperienceText(trainer.experience)} опыта
                        </p>
                        
                        {trainer.description && (
                          <p className="text-xs text-gray-600 line-clamp-3 mt-2">
                            {trainer.description}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="custom-swiper-pagination-trainers mt-4 flex justify-center"></div>
            </div>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-2 flex items-center justify-center gap-1"
        >
          <p className="text-gray-600 text-xs sm:text-sm md:text-base">
            Хотите узнать больше о наших тренерах?
          </p>
          <a 
            onClick={() => scrollToSection('contact')}
            className="font-semibold cursor-pointer hover:text-pink-600 text-xs sm:text-sm underline"
          >
            Напишите нам
          </a>
        </motion.div>
      </div>
    </section>
  );
}