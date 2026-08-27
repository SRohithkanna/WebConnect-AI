import axios from 'axios';
import store from '../store/store.js';

const apiClient = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    'http://localhost:5000/api/v1',

  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    const accessToken =
      store.getState().auth.accessToken;

    if (accessToken) {
      config.headers.Authorization =
        `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;