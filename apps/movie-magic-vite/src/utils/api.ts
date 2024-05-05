import axios from 'axios';

// Create an axios instance
const baseApiUrl = import.meta.env.VITE_API_URL as string;
export const api = axios.create({
  baseURL: baseApiUrl,
});
