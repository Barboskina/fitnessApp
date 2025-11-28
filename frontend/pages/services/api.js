const API_BASE_URL = 'http://localhost:8000/api';

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const fetchTrainers = async () => {
  const response = await fetch(`${API_BASE_URL}/trainers/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return handleResponse(response);
};

export const fetchWorkoutClasses = async () => {
  const response = await fetch(`${API_BASE_URL}/classes/`);
  return handleResponse(response);
};

export const fetchWorkoutDetails = async (workoutId) => {
  const response = await fetch(`${API_BASE_URL}/schedule/${workoutId}/`);
  return handleResponse(response);
};

export const createBooking = async (bookingData) => {
  const response = await fetch(`${API_BASE_URL}/bookings/create/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookingData),
  });
  return handleResponse(response);
};