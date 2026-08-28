import {
  ThemeProvider,
  CssBaseline,
} from "@mui/material";

import AppRoutes from "../routes/AppRoutes.jsx";

import theme from "../theme/theme.js";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <AppRoutes />
    </ThemeProvider>
  );
};

export default App;