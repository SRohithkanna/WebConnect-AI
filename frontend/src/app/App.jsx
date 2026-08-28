import {
  ThemeProvider,
  CssBaseline,
} from "@mui/material";

import {
  useEffect,
  useState,
} from "react";

import AppRoutes from "../routes/AppRoutes.jsx";

import createAppTheme from "../theme/theme.js";


const SETTINGS_KEY =
  "devconnect-settings";


const App = () => {

  const [
    appearance,
    setAppearance,
  ] = useState("dark");

  const [
    density,
    setDensity,
  ] = useState("comfortable");


  // ---------------------------------------
  // Load saved settings
  // ---------------------------------------

  useEffect(() => {

    const savedSettings =
      localStorage.getItem(
        SETTINGS_KEY
      );

    if (!savedSettings) {
      return;
    }

    try {

      const settings =
        JSON.parse(savedSettings);

      setAppearance(
        settings.appearance ||
          "dark"
      );

      setDensity(
        settings.density ||
          "comfortable"
      );

    } catch {
      // Ignore invalid settings.
    }

  }, []);


  // ---------------------------------------
  // Listen for settings changes
  // ---------------------------------------

  useEffect(() => {

    const handleSettingsChange =
      (event) => {

        const {
          appearance,
          density,
        } = event.detail || {};

        if (appearance) {
          setAppearance(
            appearance
          );
        }

        if (density) {
          setDensity(
            density
          );
        }

      };


    window.addEventListener(
      "devconnect-settings-change",
      handleSettingsChange
    );


    return () => {

      window.removeEventListener(
        "devconnect-settings-change",
        handleSettingsChange
      );

    };

  }, []);


  // ---------------------------------------
  // Create theme
  // ---------------------------------------

  const theme =
    createAppTheme(
      appearance,
      density
    );


  return (
    <ThemeProvider
      theme={theme}
    >

      <CssBaseline />

      <AppRoutes />

    </ThemeProvider>
  );
};


export default App;