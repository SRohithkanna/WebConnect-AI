import apiClient from './axios.js';

import authService from '../services/authService.js';

import {
  setAccessToken,
  logoutSuccess,
} from '../features/auth/authSlice.js';

let isRefreshing = false;

let refreshSubscribers = [];

const subscribeToRefresh = (callback) => {
  refreshSubscribers.push(callback);
};

const notifyRefreshSubscribers = (accessToken) => {
  refreshSubscribers.forEach((callback) => {
    callback(accessToken);
  });

  refreshSubscribers = [];
};

const setupInterceptors = (store) => {
  apiClient.interceptors.request.use(
    (config) => {
      const state = store.getState();

      const accessToken =
        state.auth.accessToken;

      if (accessToken) {
        config.headers.Authorization =
          `Bearer ${accessToken}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  apiClient.interceptors.response.use(
    (response) => response,

    async (error) => {
      const originalRequest =
        error.config;

      if (
        error.response?.status !== 401 ||
        originalRequest._retry
      ) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise(
          (resolve, reject) => {
            subscribeToRefresh(
              (accessToken) => {
                if (!accessToken) {
                  reject(error);
                  return;
                }

                originalRequest.headers.Authorization =
                  `Bearer ${accessToken}`;

                resolve(
                  apiClient(originalRequest)
                );
              }
            );
          }
        );
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response =
          await authService.refreshAccessToken();

        const newAccessToken =
          response.data.accessToken;

        store.dispatch(
          setAccessToken(newAccessToken)
        );

        notifyRefreshSubscribers(
          newAccessToken
        );

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return apiClient(originalRequest);
      } catch (refreshError) {
        store.dispatch(
          logoutSuccess()
        );

        notifyRefreshSubscribers(null);

        return Promise.reject(
          refreshError
        );
      } finally {
        isRefreshing = false;
      }
    }
  );
};

export default setupInterceptors;