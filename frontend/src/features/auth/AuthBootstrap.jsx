import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useDispatch } from "react-redux";

import authService from "../../services/authService.js";

import {
  setAccessToken,
  logoutSuccess,
  loginSuccess,
} from "./authSlice.js";

const AuthBootstrap = ({ children }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

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
        // ------------------------------------------------
        // 1. Try to restore session
        // ------------------------------------------------

        const response =
          await authService.refreshAccessToken();

        const accessToken =
          response.data.accessToken;

        // ------------------------------------------------
        // 2. Store access token
        // ------------------------------------------------

        dispatch(
          setAccessToken(accessToken)
        );

        // ------------------------------------------------
        // 3. Get latest profile
        // ------------------------------------------------

        const profileResponse =
          await authService.getCurrentUser();

        const profile =
          profileResponse.data ||
          profileResponse;

        console.log(
          "PROFILE AFTER AUTH RESTORE:",
          profile
        );

        // ------------------------------------------------
        // 4. Store authenticated user
        // ------------------------------------------------

        dispatch(
          loginSuccess({
            user: profile,
            accessToken,
          })
        );

        // ------------------------------------------------
        // 5. Backend gives profile completion
        // ------------------------------------------------

        const profileCompletion =
          profile?.profileCompletion || 0;

        console.log(
          "PROFILE COMPLETION:",
          profileCompletion
        );

        // ------------------------------------------------
        // 6. Incomplete profile
        // ------------------------------------------------

        if (profileCompletion < 100) {
          if (
            location.pathname !==
            "/profile"
          ) {
            navigate("/profile", {
              replace: true,
            });
          }

          return;
        }

        // ------------------------------------------------
        // 7. Complete profile
        // ------------------------------------------------

        if (
          location.pathname === "/login" ||
          location.pathname === "/register"
        ) {
          navigate("/dashboard", {
            replace: true,
          });
        }
      } catch (error) {
        // ------------------------------------------------
        // No refresh token / expired session
        // ------------------------------------------------
        // This is normal when visiting /login
        // without being authenticated.

        if (error?.response?.status === 401) {
          console.log(
            "No active session."
          );
        } else {
          console.error(
            "AUTH INITIALIZATION FAILED:",
            error
          );
        }

        dispatch(logoutSuccess());
      } finally {
        setCheckingAuth(false);
      }
    };

    initializeAuth();
  }, [
    dispatch,
    navigate,
    location.pathname,
  ]);

  // ------------------------------------------------
  // Wait until authentication check is complete
  // ------------------------------------------------

  if (checkingAuth) {
    return null;
  }

  return children;
};

export default AuthBootstrap;