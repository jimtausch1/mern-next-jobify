import axios from 'axios';

export const customFetch = axios.create({
  baseURL: 'http://localhost:3000/api/ext',
  withCredentials: true, // Important for sending cookies with cross-origin requests
});
