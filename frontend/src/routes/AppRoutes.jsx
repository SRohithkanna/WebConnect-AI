import {
  Routes,
  Route,
} from 'react-router-dom';

import LoginPage from '../pages/LoginPage.jsx';

import DashboardPage from '../pages/DashboardPage.jsx';

import ProtectedRoute from './ProtectedRoute.jsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route element={<ProtectedRoute />}>
        <Route
          path="/dashboard"
          element={<DashboardPage />}
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;