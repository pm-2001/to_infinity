
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com', // Replace with your backend API base URL
  timeout: 10000, // Set timeout as needed
});

// Example function to fetch data
export const fetchData = async () => {
  try {
    const response = await api.get('/data-endpoint'); // Replace with your endpoint
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default api;
