import { useEffect, useRef, useState } from 'react';

import { useDispatch } from 'react-redux';

import authService from '../../services/authService.js';

import {
  setAccessToken,
  logoutSuccess,
  loginSuccess,
} from './authSlice.js';

const AuthBootstrap = ({ children }) => {
  const dispatch = useDispatch();

  const hasInitialized = useRef(false);

  const [checkingAuth, setCheckingAuth] =
    useState(true);

  useEffect(() => {
    if (hasInitialized.current) {
      return;
    }

    hasInitialized.current = true;

    const initializeAuth = async () => {
      try {
        // Get new access token using refresh cookie
        const response =
          await authService.refreshAccessToken();

        const accessToken =
          response.data.accessToken;

        // Store token in Redux
        dispatch(
          setAccessToken(accessToken)
        );

        // Get current user
        const userResponse =
          await authService.getCurrentUser();

        dispatch(
          loginSuccess({
            user: userResponse.data.user,
            accessToken,
          })
        );

      } catch (error) {
        console.error(
          'AUTH INITIALIZATION FAILED:',
          error
        );

        dispatch(logoutSuccess());

      } finally {
        setCheckingAuth(false);
      }
    };

    initializeAuth();
  }, [dispatch]);

  if (checkingAuth) {
    return null;
  }

  return children;
};

export default AuthBootstrap;