import { useEffect, useRef, useState } from 'react';

import { useDispatch } from 'react-redux';

import authService from '../../services/authService.js';

import {
  setAccessToken,
  logoutSuccess,
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
        const response =
          await authService.refreshAccessToken();

        dispatch(
          setAccessToken(
            response.data.accessToken
          )
        );
      } catch {
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