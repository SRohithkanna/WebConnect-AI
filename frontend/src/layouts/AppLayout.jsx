import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
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
  QuestionAnswerOutlined,
  MenuOutlined,
} from "@mui/icons-material";

import {
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  useSelector,
  useDispatch,
} from "react-redux";

import { useState } from "react";

import authService from "../services/authService.js";

import {
  logoutSuccess,
} from "../features/auth/authSlice.js";


/* =========================================================
   NAVIGATION ITEMS
========================================================= */

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
  {
    label: "Interview",
    path: "/interview",
    icon: <QuestionAnswerOutlined />,
  },
];


/* =========================================================
   APP LAYOUT
========================================================= */

const AppLayout = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const dispatch = useDispatch();

  const user = useSelector(
    (state) => state.auth.user
  );

  /*
   * md breakpoint:
   *
   * Desktop / large tablet:
   * Sidebar is visible.
   *
   * Mobile:
   * Sidebar becomes a drawer.
   */
  const isMobile = useMediaQuery(
    "(max-width:899px)"
  );

  const [mobileDrawerOpen, setMobileDrawerOpen] =
    useState(false);


  /* =======================================================
     NAVIGATION
  ======================================================= */

  const handleNavigation = (path) => {
    navigate(path);

    /*
     * Close mobile drawer after
     * navigating to another page.
     */
    if (isMobile) {
      setMobileDrawerOpen(false);
    }
  };


  /* =======================================================
     LOGOUT
  ======================================================= */

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error(
        "Logout failed:",
        error
      );
    } finally {
      dispatch(logoutSuccess());

      navigate("/login", {
        replace: true,
      });

      if (isMobile) {
        setMobileDrawerOpen(false);
      }
    }
  };


  /* =======================================================
     SIDEBAR CONTENT
  ======================================================= */

  const sidebarContent = (
    <Box
      sx={{
        width: {
          xs: 270,
          md: 250,
        },

        height: "100%",

        display: "flex",
        flexDirection: "column",

        px: {
          xs: 1.5,
          md: 2,
        },

        py: 3,

        bgcolor: "background.default",
      }}
    >

      {/* ================================================
          BRAND
      ================================================= */}

      <Box
        sx={{
          px: 1.5,
          mb: 4,
        }}
      >
        <Typography
          variant="h6"
          fontWeight={700}
          color="text.primary"
        >
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


      {/* ================================================
          MAIN NAVIGATION
      ================================================= */}

      <List
        sx={{
          flex: 1,
          overflowY: "auto",
        }}
      >
        {navigationItems.map((item) => {
          const isActive =
            location.pathname === item.path;

          return (
            <ListItemButton
              key={item.path}
              onClick={() =>
                handleNavigation(item.path)
              }
              sx={{
                borderRadius: 1.5,

                mb: 0.5,

                color: isActive
                  ? "text.primary"
                  : "text.secondary",

                bgcolor: isActive
                  ? "action.selected"
                  : "transparent",

                "&:hover": {
                  bgcolor:
                    "action.hover",
                },
              }}
            >

              <ListItemIcon
                sx={{
                  minWidth: 42,

                  color: isActive
                    ? "primary.main"
                    : "text.secondary",
                }}
              >
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.label}
              />

            </ListItemButton>
          );
        })}
      </List>


      {/* ================================================
          BOTTOM NAVIGATION
      ================================================= */}

      <Divider
        sx={{
          mb: 1,
        }}
      />

      <List>

        {/* Settings */}

        <ListItemButton
          onClick={() =>
            handleNavigation("/settings")
          }
          sx={{
            borderRadius: 1.5,

            color:
              location.pathname === "/settings"
                ? "text.primary"
                : "text.secondary",

            bgcolor:
              location.pathname === "/settings"
                ? "action.selected"
                : "transparent",

            "&:hover": {
              bgcolor:
                "action.hover",
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

          <ListItemText
            primary="Settings"
          />

        </ListItemButton>


        {/* Logout */}

        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 1.5,

            color: "text.secondary",

            "&:hover": {
              bgcolor:
                "action.hover",
            },
          }}
        >

          <ListItemIcon
            sx={{
              minWidth: 42,

              color:
                "text.secondary",
            }}
          >
            <LogoutOutlined />
          </ListItemIcon>

          <ListItemText
            primary="Logout"
          />

        </ListItemButton>

      </List>
    </Box>
  );


  /* =========================================================
     MAIN LAYOUT
  ========================================================= */

  return (
    <Box
      sx={{
        minHeight: "100vh",

        width: "100%",

        display: "flex",

        bgcolor:
          "background.default",

        color:
          "text.primary",
      }}
    >

      {/* ===================================================
          DESKTOP / TABLET SIDEBAR
      =================================================== */}

      {!isMobile && (
        <Box
          component="aside"
          sx={{
            width: {
              md: 230,
              lg: 250,
            },

            flexShrink: 0,

            minHeight: "100vh",

            borderRight:
              "1px solid",

            borderColor:
              "divider",

            display: "flex",

            flexDirection:
              "column",

            bgcolor:
              "background.default",
          }}
        >
          {sidebarContent}
        </Box>
      )}


      {/* ===================================================
          MOBILE DRAWER
      =================================================== */}

      {isMobile && (
        <Drawer
          anchor="left"
          open={mobileDrawerOpen}
          onClose={() =>
            setMobileDrawerOpen(false)
          }
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: {
              bgcolor:
                "background.default",

              borderRight:
                "1px solid",

              borderColor:
                "divider",
            },
          }}
        >
          {sidebarContent}
        </Drawer>
      )}


      {/* ===================================================
          MAIN APPLICATION AREA
      =================================================== */}

      <Box
        component="main"
        sx={{
          flex: 1,

          minWidth: 0,

          minHeight: "100vh",

          display: "flex",

          flexDirection:
            "column",

          bgcolor:
            "background.default",
        }}
      >

        {/* =================================================
            TOP BAR
        ================================================= */}

        <Box
          component="header"
          sx={{
            height: {
              xs: 60,
              sm: 64,
              md: 68,
            },

            flexShrink: 0,

            borderBottom:
              "1px solid",

            borderColor:
              "divider",

            display: "flex",

            alignItems: "center",

            justifyContent:
              "space-between",

            px: {
              xs: 1.5,
              sm: 2,
              md: 4,
            },
          }}
        >

          {/* ==============================================
              MOBILE MENU BUTTON
          ============================================== */}

          {isMobile ? (
            <IconButton
              onClick={() =>
                setMobileDrawerOpen(true)
              }
              aria-label="Open navigation"
              sx={{
                color:
                  "text.secondary",
              }}
            >
              <MenuOutlined />
            </IconButton>
          ) : (
            <Box />
          )}


          {/* ==============================================
              USER
          ============================================== */}

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              maxWidth: {
                xs: 150,
                sm: 250,
              },

              overflow: "hidden",

              textOverflow:
                "ellipsis",

              whiteSpace:
                "nowrap",
            }}
          >
            {user?.name ||
              user?.username ||
              "User"}
          </Typography>

        </Box>


        {/* =================================================
            PAGE CONTENT
        ================================================= */}

        <Box
          sx={{
            flex: 1,

            width: "100%",

            minWidth: 0,

            /*
             * Responsive page padding.
             */

            p: {
              xs: 1.5,
              sm: 2.5,
              md: 3,
              lg: 4,
            },

            /*
             * Prevent horizontal overflow
             * from individual pages.
             */

            overflowX: "hidden",
          }}
        >
          <Outlet />
        </Box>

      </Box>

    </Box>
  );
};


export default AppLayout;