import axios from 'axios';

const API_URL = 'http://localhost:5000/api/enrollments';

export const enrollInCourse = async (courseId) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(
    API_URL,
    { courseId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const getMyEnrollments = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};