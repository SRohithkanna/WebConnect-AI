import apiClient from './axios.js';

import authService from '../services/authService.js';

import store from '../store/store.js';

import {
  setAccessToken,
  logoutSuccess,
} from '../features/auth/authSlice.js';

let isRefreshing = false;

let refreshSubscribers = [];

const subscribeTokenRefresh = (callback) => {
  refreshSubscribers.push(callback);
};

const onRefreshed = (accessToken) => {
  refreshSubscribers.forEach((callback) =>
    callback(accessToken)
  );

  refreshSubscribers = [];
};

const setupInterceptors = () => {
  apiClient.interceptors.request.use(
    (config) => {
      const state = store.getState();

      const accessToken =
        state.auth?.accessToken;

      if (
        accessToken &&
        !config.headers.Authorization
      ) {
        config.headers.Authorization =
          `Bearer ${accessToken}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  apiClient.interceptors.response.use(
    (response) => {
      return response;
    },

    async (error) => {
      const originalRequest =
        error.config;

      if (
        error.response?.status !== 401 ||
        originalRequest?._retry
      ) {
        return Promise.reject(error);
      }

      /*
       * Do not attempt to refresh the
       * refresh endpoint itself.
       */
      if (
        originalRequest?.url?.includes(
          '/auth/refresh'
        )
      ) {
        store.dispatch(logoutSuccess());

        return Promise.reject(error);
      }

      originalRequest._retry = true;

      /*
       * If another request is already
       * refreshing the token, wait for it.
       */
      if (isRefreshing) {
        return new Promise(
          (resolve, reject) => {
            subscribeTokenRefresh(
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

      isRefreshing = true;

      try {
        const response =
          await authService.refresh();

        const newAccessToken =
          response?.data?.accessToken;

        if (!newAccessToken) {
          throw new Error(
            'Refresh response did not contain an access token.'
          );
        }

        store.dispatch(
          setAccessToken(newAccessToken)
        );

        onRefreshed(newAccessToken);

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return apiClient(originalRequest);
      } catch (refreshError) {
        refreshSubscribers = [];

        store.dispatch(logoutSuccess());

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