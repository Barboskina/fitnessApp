// Главный компонент Home
import React from 'react';
import HeroSection from './HeroSection';
import StatsSection from './StatsSection';
import ClassesSection from './ClassesSection';
import TrainersSection from './TrainersSection';
import AboutSection from './AboutSection';
import ContactSection from './ContactSection';
import { useHomeData } from '../../hooks/useApi';

export default function Home() {
  const { 
    trainers, 
    workoutClasses, 
    isLoading,
    error 
  } = useHomeData();

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <HeroSection />
      <StatsSection />
      <ClassesSection 
        workoutClasses={workoutClasses} 
        isLoading={isLoading}
      />
      <TrainersSection 
        trainers={trainers}
        isLoading={isLoading}
      />
      <AboutSection />
      <ContactSection />
    </div>
  );
}