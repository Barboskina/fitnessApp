// Модальное окно записи
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, User, MapPin, Calendar, ArrowRight, Users } from 'lucide-react';
import { useBooking } from '../../hooks/useApi';
import { useHomeData } from '../../hooks/useApi';
import { formatDate, getDifficultyText } from '../../utils/formatters';

export default function BookingModal({ isOpen, onClose, selectedClass }) {
  const { workoutDetails, loadWorkoutDetails } = useHomeData();
  const { bookClass, isLoading, bookingError, setBookingError } = useBooking();
  
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  const getAvailableSlots = useCallback(() => {
    if (!selectedClass || !workoutDetails[selectedClass.id]) return [];
    
    const details = workoutDetails[selectedClass.id];
    const slots = [];
    
    if (details.results && Array.isArray(details.results)) {
      details.results.forEach(trainerData => {
        slots.push({
          id: trainerData.id,
          trainer_name: trainerData.trainer_name,
          datetime: trainerData.datetime,
          available_slots: trainerData.available_slots,
          trainer_id: trainerData.trainer,
        });
      });
    }
    
    return slots;
  }, [selectedClass, workoutDetails]);

  const handleSlotSelect = useCallback((slot) => {
    setSelectedSlot(slot);
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (bookingError) {
      setBookingError(null);
    }
  }, [bookingError, setBookingError]);

  const handleConfirmBooking = useCallback(async (e) => {
    e.preventDefault();
    
    if (!selectedSlot) {
      alert('Пожалуйста, выберите дату и время');
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }

    try {
      const bookingData = {
        full_name: formData.name.trim(),
        email: formData.email.trim(),
        phone_number: formData.phone.trim(),
        schedule: selectedSlot.id || selectedSlot.trainer_schedule_id
      };

      const result = await bookClass(bookingData);
      
      if (result.success) {
        setIsSignedUp(true);
        if (workoutDetails[selectedClass.id]) {
          await loadWorkoutDetails(selectedClass.id);
        }
      }
    } catch (err) {
      console.error('Booking failed:', err);
    }
  }, [selectedSlot, formData, selectedClass, bookClass, workoutDetails, loadWorkoutDetails]);

  // Загружаем детали тренировки при открытии модального окна
  React.useEffect(() => {
    if (isOpen && selectedClass && !workoutDetails[selectedClass.id]) {
      loadWorkoutDetails(selectedClass.id);
    }
  }, [isOpen, selectedClass, workoutDetails, loadWorkoutDetails]);

  // Сбрасываем состояние при закрытии
  React.useEffect(() => {
    if (!isOpen) {
      setSelectedSlot(null);
      setIsSignedUp(false);
      setFormData({ name: '', email: '', phone: '' });
      setBookingError(null);
    }
  }, [isOpen, setBookingError]);

  if (!selectedClass) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white w-full max-w-2xl relative rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Заголовок */}
            {!isSignedUp ? (
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-white sticky top-0 z-10">
                <div className="flex-1">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 font-serif">Запись на тренировку</h2>
                  <p className="text-gray-600 text-xs sm:text-sm mt-1">
                    Заполните форму ниже чтобы забронировать место
                  </p>
                </div>
                <button 
                  onClick={onClose} 
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600 ml-2"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            ) : null}

            {/* Контент */}
            <div className="flex-1 overflow-y-auto">
              {!isSignedUp ? (
                <form onSubmit={handleConfirmBooking} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                  {/* Информация о тренировке */}
                  <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-pink-100">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-1">{selectedClass.name}</h3>
                        <p className="text-gray-700 text-xs sm:text-sm mb-2 line-clamp-2">{selectedClass.description}</p>
                        <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
                          <span className="inline-flex items-center gap-1 bg-white px-2 py-1 rounded-full border border-gray-200">
                            <Clock className="w-3 h-3 text-pink-600" />
                            {selectedClass.duration_minutes} мин
                          </span>
                          <span className="inline-flex items-center gap-1 bg-white px-2 py-1 rounded-full border border-gray-200">
                            <User className="w-3 h-3 text-pink-600" />
                            {getDifficultyText(selectedClass.difficulty)}
                          </span>
                          <span className="inline-flex items-center gap-1 bg-white px-2 py-1 rounded-full border border-gray-200 font-semibold text-pink-600">
                            {selectedClass.price} ₽
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Доступные слоты */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2 sm:mb-3">
                      Выберите дату и время *
                    </label>
                    <div className="space-y-2 sm:space-y-3 max-h-48 sm:max-h-64 overflow-y-auto pr-1 sm:pr-2">
                      {getAvailableSlots().map((slot, index) => (
                        <div
                          key={`${slot.datetime}-${slot.trainer_id}`}
                          onClick={() => handleSlotSelect(slot)}
                          className={`p-3 sm:p-4 border-2 rounded-lg sm:rounded-xl cursor-pointer transition-all duration-200 ${
                            selectedSlot?.datetime === slot.datetime && selectedSlot?.trainer_id === slot.trainer_id
                              ? 'border-pink-500 bg-pink-50 shadow-sm'
                              : 'border-gray-200 hover:border-pink-300 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                                <div className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${
                                  selectedSlot?.datetime === slot.datetime && selectedSlot?.trainer_id === slot.trainer_id
                                    ? 'bg-pink-500 border-pink-500'
                                    : 'border-gray-300'
                                }`}>
                                  {selectedSlot?.datetime === slot.datetime && selectedSlot?.trainer_id === slot.trainer_id && (
                                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                  )}
                                </div>
                                <p className="font-medium text-gray-900 text-sm sm:text-base">
                                  {formatDate(slot.datetime)}
                                </p>
                              </div>
                              <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 ml-5 sm:ml-6">
                                <span className="flex items-center gap-1">
                                  <User className="w-3 h-3" />
                                  {slot.trainer_name}
                                </span>
                                <span className={`flex items-center gap-1 ${
                                  slot.available_slots > 3 ? 'text-green-600' : 
                                  slot.available_slots > 0 ? 'text-orange-600' : 'text-red-600'
                                }`}>
                                  <Users className="w-3 h-3" />
                                  {slot.available_slots} мест{slot.available_slots === 1 ? 'о' : slot.available_slots < 5 ? 'а' : ''}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {getAvailableSlots().length === 0 && (
                        <div className="text-center py-6 sm:py-8 text-gray-500 bg-gray-50 rounded-lg sm:rounded-xl border border-gray-200">
                          <Calendar className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 text-gray-400" />
                          <p className="font-medium text-gray-600 text-sm sm:text-base">Нет доступных слотов для записи</p>
                          <p className="text-xs sm:text-sm mt-1">Пожалуйста, проверьте позже</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Форма для ввода данных */}
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="font-semibold text-gray-900 text-base sm:text-lg">Ваши данные</h3>
                    
                    <div className="grid gap-3 sm:gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                          Полное имя *
                        </label>
                        <input 
                          type="text" 
                          name="name"
                          required 
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full p-2 sm:p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 focus:outline-none transition-colors placeholder-gray-400 text-sm sm:text-base" 
                          placeholder="Иванова Мария" 
                        />
                      </div>
                      
                      <div className="grid gap-3 sm:gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                            Email *
                          </label>
                          <input 
                            type="email" 
                            name="email"
                            required 
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full p-2 sm:p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 focus:outline-none transition-colors placeholder-gray-400 text-sm sm:text-base" 
                            placeholder="maria@example.com" 
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                            Телефон *
                          </label>
                          <input 
                            type="tel" 
                            name="phone"
                            required 
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full p-2 sm:p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 focus:outline-none transition-colors placeholder-gray-400 text-sm sm:text-base" 
                            placeholder="+7 (999) 999-99-99" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Сообщение об ошибке */}
                  {bookingError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4">
                      <p className="text-red-700 text-sm sm:text-base font-medium">
                        Ошибка: {bookingError}
                      </p>
                      <p className="text-red-600 text-xs sm:text-sm mt-1">
                        Пожалуйста, проверьте введенные данные и попробуйте снова
                      </p>
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={!selectedSlot || getAvailableSlots().length === 0 || isLoading}
                    className={`w-full py-3 sm:py-4 font-semibold text-base sm:text-lg rounded-xl sm:rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 ${
                      selectedSlot && getAvailableSlots().length > 0 && !isLoading
                        ? "btn btn-primary"
                        : "btn btn-disabled"
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-sm sm:text-base">Обработка...</span>
                      </>
                    ) : (
                      <span className="text-sm sm:text-base">
                        {selectedSlot ? 'Записаться на тренировку' : 'Выберите дату и время'}
                      </span>
                    )}
                  </button>
                </form>
              ) : (
                /* Сообщение об успешной записи */
                <div className="p-4 sm:p-8 text-center">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 font-serif">Запись подтверждена!</h2>
                  <div className="bg-green-50 border border-green-200 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 text-left">
                    <p className="text-gray-700 mb-2 sm:mb-3 text-sm sm:text-base">
                      Вы записаны на тренировку <span className="font-semibold text-green-700">{selectedClass.name}</span>
                    </p>
                    
                    {selectedSlot && (
                      <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                          <span>
                            <strong>Когда:</strong> {formatDate(selectedSlot.datetime)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                          <span>
                            <strong>Тренер:</strong> {selectedSlot.trainer_name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                          <span>
                            <strong>Место:</strong> г. Волгоград, ул. Ленина, 100, 3 этаж
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                    Подтверждение записи отправлено на вашу почту. Ждём вас на тренировке!
                  </p>

                  <div className="flex justify-center">
                    <button 
                      onClick={onClose}
                      className="btn btn-dark"
                    >
                      <span>Продолжить</span>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}