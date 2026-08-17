import { Routes, Route } from "react-router-dom";

import LoginPage from "../pages/LoginPage.jsx";

import DashboardPage from "../pages/DashboardPage.jsx";

import ProfilePage from "../pages/ProfilePage.jsx";

import AIAnalysisPage from "../pages/AIAnalysisPage.jsx";

import ResumePage from "../pages/ResumePage.jsx";

import RoadmapPage from "../pages/RoadmapPage.jsx";

import SettingsPage from "../pages/SettingsPage.jsx";

import ProtectedRoute from "./ProtectedRoute.jsx";

import AppLayout from "../layouts/AppLayout.jsx";

import PostsPage from "../pages/PostsPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public */}

      <Route path="/login" element={<LoginPage />} />

      {/* Protected */}

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />

          <Route path="/profile" element={<ProfilePage />} />

          <Route path="/ai-analysis" element={<AIAnalysisPage />} />

          <Route path="/resume" element={<ResumePage />} />

          <Route path="/roadmap" element={<RoadmapPage />} />

          <Route path="/settings" element={<SettingsPage />} />
          
          <Route path="/posts" element={<PostsPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
