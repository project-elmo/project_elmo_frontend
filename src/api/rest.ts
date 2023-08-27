import axios from 'axios';

const API_PREFIX = `${import.meta.env.VITE_API_URL}/api`;

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: API_PREFIX,
});

export const healthCheck = async () => {
  const res = await axios.get('/health');
  return res;
};
