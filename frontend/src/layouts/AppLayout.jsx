import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import {
  DashboardOutlined,
  Person,
  AutoAwesome,
  DescriptionOutlined,
  Route,
  SettingsOutlined,
  LogoutOutlined,
  DynamicFeedOutlined,
} from "@mui/icons-material";

import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import authService from "../services/authService.js";

import { logoutSuccess } from "../features/auth/authSlice.js";



const navigationItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: <DashboardOutlined />,
  },
  {
  label: "Developers",
  path: "/developers",
  icon: <Person />,
},
  {
    label: "Posts",
    path: "/posts",
    icon: <DynamicFeedOutlined />,
  },
  {
    label: "Profile",
    path: "/profile",
    icon: <Person />,
  },
  {
    label: "AI Analysis",
    path: "/ai-analysis",
    icon: <AutoAwesome />,
  },
  {
    label: "Resume",
    path: "/resume",
    icon: <DescriptionOutlined />,
  },
  {
    label: "Roadmap",
    path: "/roadmap",
    icon: <Route />,
  },
];

const AppLayout = () => {
 const navigate = useNavigate();
const location = useLocation();
const dispatch = useDispatch();

const user = useSelector(
  (state) => state.auth.user
);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      dispatch(logoutSuccess());

      navigate("/login", {
        replace: true,
      });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      {/* Sidebar */}

      <Box
        component="aside"
        sx={{
          width: 250,
          flexShrink: 0,
          minHeight: "100vh",
          borderRight: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          flexDirection: "column",
          px: 2,
          py: 3,
          bgcolor: "background.default",
        }}
      >
        {/* Brand */}

        <Box
          sx={{
            px: 1.5,
            mb: 4,
          }}
        >
          <Typography variant="h6" fontWeight={700} color="text.primary">
            DevConnect AI
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 0.5,
            }}
          >
            Developer intelligence platform
          </Typography>
        </Box>

        {/* Main Navigation */}

        <List sx={{ flex: 1 }}>
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <ListItemButton
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  borderRadius: 1.5,
                  mb: 0.5,
                  color: isActive ? "text.primary" : "text.secondary",

                  bgcolor: isActive ? "rgba(255,255,255,0.08)" : "transparent",

                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.06)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 42,
                    color: isActive ? "primary.main" : "text.secondary",
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                <ListItemText primary={item.label} />
              </ListItemButton>
            );
          })}
        </List>

        {/* Bottom Navigation */}

        <Divider
          sx={{
            mb: 1,
          }}
        />

        <List>
          <ListItemButton
            onClick={() => navigate("/settings")}
            sx={{
              borderRadius: 1.5,
              color:
                location.pathname === "/settings"
                  ? "text.primary"
                  : "text.secondary",

              bgcolor:
                location.pathname === "/settings"
                  ? "rgba(255,255,255,0.08)"
                  : "transparent",

              "&:hover": {
                bgcolor: "rgba(255,255,255,0.06)",
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 42,
                color:
                  location.pathname === "/settings"
                    ? "primary.main"
                    : "text.secondary",
              }}
            >
              <SettingsOutlined />
            </ListItemIcon>

            <ListItemText primary="Settings" />
          </ListItemButton>

          <ListItemButton
            onClick={handleLogout}
            sx={{
              borderRadius: 1.5,
              color: "text.secondary",

              "&:hover": {
                bgcolor: "rgba(255,255,255,0.06)",
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 42,
                color: "text.secondary",
              }}
            >
              <LogoutOutlined />
            </ListItemIcon>

            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Box>

      {/* Main Application Area */}

      <Box
        component="main"
        sx={{
          flex: 1,
          minWidth: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.default",
        }}
      >
        {/* Top Bar */}

        <Box
          component="header"
          sx={{
            height: 68,
            flexShrink: 0,
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: {
              xs: 2,
              md: 4,
            },
          }}
        >
          <Typography variant="body2" color="text.secondary">
  {user?.name || user?.username || "User"}
</Typography>
        </Box>

        {/* Page Content */}

        <Box
          sx={{
            flex: 1,
            width: "100%",
            p: {
              xs: 2,
              sm: 3,
              md: 4,
            },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AppLayout;
