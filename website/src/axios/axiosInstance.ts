import axios from 'axios';

// Create an instance of axios with custom configuration
const api = axios.create({
  baseURL: 'http://localhost:3000/', // Set a base URL for all requests
  headers: {
    'Content-Type': 'application/json',
    // You can add other default headers here
  },
});

export default api;