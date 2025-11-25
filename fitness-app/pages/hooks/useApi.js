import { useState, useEffect, useCallback } from 'react';
import { 
  fetchTrainers, 
  fetchWorkoutClasses, 
  fetchWorkoutDetails,
  createBooking 
} from '../services/api';

export const useHomeData = () => {
  const [trainers, setTrainers] = useState([]);
  const [workoutClasses, setWorkoutClasses] = useState([]);
  const [workoutDetails, setWorkoutDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [trainersData, classesData] = await Promise.all([
        fetchTrainers(),
        fetchWorkoutClasses()
      ]);
      setTrainers(trainersData);
      setWorkoutClasses(classesData);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadWorkoutDetails = useCallback(async (workoutId) => {
    try {
      const details = await fetchWorkoutDetails(workoutId);
      setWorkoutDetails(prev => ({
        ...prev,
        [workoutId]: details
      }));
    } catch (err) {
      console.error('Error loading workout details:', err);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { 
    trainers, 
    workoutClasses, 
    workoutDetails,
    isLoading, 
    error, 
    refetch: loadData,
    loadWorkoutDetails
  };
};

export const useBooking = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [bookingError, setBookingError] = useState(null);

  const bookClass = useCallback(async (bookingData) => {
    try {
      setIsLoading(true);
      setBookingError(null);
      const result = await createBooking(bookingData);
      return result;
    } catch (err) {
      setBookingError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { bookClass, isLoading, bookingError, setBookingError };
};