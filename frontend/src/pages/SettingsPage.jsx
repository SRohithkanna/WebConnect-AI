import {
  Alert,
  Box,
  Card,
  CardContent,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  Typography,
} from "@mui/material";

import {
  NotificationsOutlined,
  SecurityOutlined,
  TuneOutlined,
  DarkModeOutlined,
  ViewCompactOutlined,
} from "@mui/icons-material";

import {
  useEffect,
  useState,
} from "react";

const SETTINGS_KEY =
  "devconnect-settings";

const SettingsPage = () => {
  const [
    emailNotifications,
    setEmailNotifications,
  ] = useState(true);

  const [
    analysisNotifications,
    setAnalysisNotifications,
  ] = useState(true);

  const [
    commentNotifications,
    setCommentNotifications,
  ] = useState(true);

  const [
    appearance,
    setAppearance,
  ] = useState("dark");

  const [
    density,
    setDensity,
  ] = useState("comfortable");

  const [
    settingsLoaded,
    setSettingsLoaded,
  ] = useState(false);


  // ---------------------------------------
  // Load saved settings
  // ---------------------------------------

  useEffect(() => {
    const savedSettings =
      localStorage.getItem(
        SETTINGS_KEY
      );

    if (savedSettings) {
      try {
        const settings =
          JSON.parse(savedSettings);

        setEmailNotifications(
          settings.emailNotifications ??
            true
        );

        setAnalysisNotifications(
          settings.analysisNotifications ??
            true
        );

        setCommentNotifications(
          settings.commentNotifications ??
            true
        );

        setAppearance(
          settings.appearance ||
            "dark"
        );

        setDensity(
          settings.density ||
            "comfortable"
        );
      } catch {
        // Ignore invalid local settings.
      }
    }

    setSettingsLoaded(true);
  }, []);


  // ---------------------------------------
  // Save settings
  // ---------------------------------------

  useEffect(() => {
    if (!settingsLoaded) {
      return;
    }

    const settings = {
      emailNotifications,
      analysisNotifications,
      commentNotifications,
      appearance,
      density,
    };

    localStorage.setItem(
      SETTINGS_KEY,
      JSON.stringify(settings)
    );

    // Tell App.jsx to update the theme
    window.dispatchEvent(
      new CustomEvent(
        "devconnect-settings-change",
        {
          detail: {
            appearance,
            density,
          },
        }
      )
    );
  }, [
    emailNotifications,
    analysisNotifications,
    commentNotifications,
    appearance,
    density,
    settingsLoaded,
  ]);


  // ---------------------------------------
  // Density helpers
  // ---------------------------------------

  const isCompact =
    density === "compact";

  const pagePadding =
    isCompact ? 2 : 4;

  const cardSpacing =
    isCompact ? 1.5 : 3;

  const cardPadding =
    isCompact ? 2.5 : 4;

  const headerSpacing =
    isCompact ? 1.5 : 3;

  const rowPadding =
    isCompact ? 0.35 : 1;

  const sectionMargin =
    isCompact ? 2 : 3;

  const dividerMargin =
    isCompact ? 1 : 2;


  return (
    <Box
      sx={{
        maxWidth: 900,
        mx: "auto",
        py: isCompact ? 2 : 4,
      }}
    >

      {/* =======================================
          PAGE HEADER
      ======================================= */}

      <Typography
        variant="h4"
        fontWeight={700}
        sx={{
          mb: 0.75,
        }}
      >
        Settings
      </Typography>

      <Typography
        color="text.secondary"
        sx={{
          mb: isCompact ? 2.5 : 4,
        }}
      >
        Manage your DevConnect AI preferences.
      </Typography>


      {/* =======================================
          NOTIFICATIONS
      ======================================= */}

      <Card
        sx={{
          borderRadius: 3,
          mb: cardSpacing,
        }}
      >
        <CardContent
          sx={{
            p: pagePadding === 2
              ? cardPadding
              : 4,
          }}
        >

          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{
              mb: headerSpacing,
            }}
          >

            <NotificationsOutlined
              color="primary"
            />

            <Box>
              <Typography
                variant="h6"
                fontWeight={700}
              >
                Notifications
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Choose which notifications
                you want to receive.
              </Typography>
            </Box>

          </Stack>


          <Divider
            sx={{
              mb: dividerMargin,
            }}
          />


          {/* Email */}

          <FormControlLabel
            control={
              <Switch
                size={
                  isCompact
                    ? "small"
                    : "medium"
                }
                checked={
                  emailNotifications
                }
                onChange={(event) =>
                  setEmailNotifications(
                    event.target.checked
                  )
                }
              />
            }
            label={
              <Box>
                <Typography
                  variant={
                    isCompact
                      ? "body2"
                      : "body1"
                  }
                  fontWeight={
                    isCompact ? 500 : 400
                  }
                >
                  Email notifications
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Receive important account
                  notifications.
                </Typography>
              </Box>
            }
            sx={{
              width: "100%",
              py: rowPadding,
              my: isCompact ? 0 : 0.25,
            }}
          />


          {/* Comments */}

          <FormControlLabel
            control={
              <Switch
                size={
                  isCompact
                    ? "small"
                    : "medium"
                }
                checked={
                  commentNotifications
                }
                onChange={(event) =>
                  setCommentNotifications(
                    event.target.checked
                  )
                }
              />
            }
            label={
              <Box>
                <Typography
                  variant={
                    isCompact
                      ? "body2"
                      : "body1"
                  }
                  fontWeight={
                    isCompact ? 500 : 400
                  }
                >
                  Comment notifications
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Get notified when someone
                  comments on your posts.
                </Typography>
              </Box>
            }
            sx={{
              width: "100%",
              py: rowPadding,
              my: isCompact ? 0 : 0.25,
            }}
          />


          {/* AI Analysis */}

          <FormControlLabel
            control={
              <Switch
                size={
                  isCompact
                    ? "small"
                    : "medium"
                }
                checked={
                  analysisNotifications
                }
                onChange={(event) =>
                  setAnalysisNotifications(
                    event.target.checked
                  )
                }
              />
            }
            label={
              <Box>
                <Typography
                  variant={
                    isCompact
                      ? "body2"
                      : "body1"
                  }
                  fontWeight={
                    isCompact ? 500 : 400
                  }
                >
                  AI analysis notifications
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Receive updates related to
                  your AI profile analysis.
                </Typography>
              </Box>
            }
            sx={{
              width: "100%",
              py: rowPadding,
              my: isCompact ? 0 : 0.25,
            }}
          />

        </CardContent>
      </Card>


      {/* =======================================
          APPEARANCE
      ======================================= */}

      <Card
        sx={{
          borderRadius: 3,
          mb: cardSpacing,
        }}
      >
        <CardContent
          sx={{
            p: pagePadding === 2
              ? cardPadding
              : 4,
          }}
        >

          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{
              mb: headerSpacing,
            }}
          >

            <DarkModeOutlined
              color="primary"
            />

            <Box>
              <Typography
                variant="h6"
                fontWeight={700}
              >
                Appearance
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Choose how DevConnect AI looks.
              </Typography>
            </Box>

          </Stack>


          <Divider
            sx={{
              mb: dividerMargin,
            }}
          />


          <Typography
            variant="subtitle2"
            fontWeight={600}
            sx={{
              mb: isCompact ? 0.5 : 1,
            }}
          >
            Theme
          </Typography>


          <RadioGroup
            value={appearance}
            onChange={(event) =>
              setAppearance(
                event.target.value
              )
            }
          >

            {/* Dark */}

            <FormControlLabel
              value="dark"
              control={
                <Radio
                  size={
                    isCompact
                      ? "small"
                      : "medium"
                  }
                />
              }
              label={
                <Box>
                  <Typography
                    variant={
                      isCompact
                        ? "body2"
                        : "body1"
                    }
                    fontWeight={
                      isCompact ? 500 : 400
                    }
                  >
                    Dark
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Use the dark interface.
                  </Typography>
                </Box>
              }
              sx={{
                py: isCompact
                  ? 0.15
                  : 0.5,
              }}
            />


            {/* Light */}

            <FormControlLabel
              value="light"
              control={
                <Radio
                  size={
                    isCompact
                      ? "small"
                      : "medium"
                  }
                />
              }
              label={
                <Box>
                  <Typography
                    variant={
                      isCompact
                        ? "body2"
                        : "body1"
                    }
                    fontWeight={
                      isCompact ? 500 : 400
                    }
                  >
                    Light
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Use the light interface.
                  </Typography>
                </Box>
              }
              sx={{
                py: isCompact
                  ? 0.15
                  : 0.5,
              }}
            />

          </RadioGroup>

        </CardContent>
      </Card>


      {/* =======================================
          INTERFACE DENSITY
      ======================================= */}

      <Card
        sx={{
          borderRadius: 3,
          mb: cardSpacing,
        }}
      >
        <CardContent
          sx={{
            p: pagePadding === 2
              ? cardPadding
              : 4,
          }}
        >

          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{
              mb: headerSpacing,
            }}
          >

            <ViewCompactOutlined
              color="primary"
            />

            <Box>
              <Typography
                variant="h6"
                fontWeight={700}
              >
                Interface Density
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Control the spacing and
                compactness of the interface.
              </Typography>
            </Box>

          </Stack>


          <Divider
            sx={{
              mb: dividerMargin,
            }}
          />


          <RadioGroup
            value={density}
            onChange={(event) =>
              setDensity(
                event.target.value
              )
            }
          >

            {/* Comfortable */}

            <FormControlLabel
              value="comfortable"
              control={
                <Radio
                  size={
                    isCompact
                      ? "small"
                      : "medium"
                  }
                />
              }
              label={
                <Box>
                  <Typography
                    variant={
                      isCompact
                        ? "body2"
                        : "body1"
                    }
                    fontWeight={
                      isCompact ? 500 : 400
                    }
                  >
                    Comfortable
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    More spacing and a relaxed
                    layout.
                  </Typography>
                </Box>
              }
              sx={{
                py: isCompact
                  ? 0.15
                  : 0.5,
              }}
            />


            {/* Compact */}

            <FormControlLabel
              value="compact"
              control={
                <Radio
                  size={
                    isCompact
                      ? "small"
                      : "medium"
                  }
                />
              }
              label={
                <Box>
                  <Typography
                    variant={
                      isCompact
                        ? "body2"
                        : "body1"
                    }
                    fontWeight={
                      isCompact ? 500 : 400
                    }
                  >
                    Compact
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Less spacing and more
                    content on screen.
                  </Typography>
                </Box>
              }
              sx={{
                py: isCompact
                  ? 0.15
                  : 0.5,
              }}
            />

          </RadioGroup>

        </CardContent>
      </Card>


      {/* =======================================
          PREFERENCES
      ======================================= */}

      <Card
        sx={{
          borderRadius: 3,
          mb: cardSpacing,
        }}
      >
        <CardContent
          sx={{
            p: pagePadding === 2
              ? cardPadding
              : 4,
          }}
        >

          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{
              mb: headerSpacing,
            }}
          >

            <TuneOutlined
              color="primary"
            />

            <Box>
              <Typography
                variant="h6"
                fontWeight={700}
              >
                Preferences
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Application preferences.
              </Typography>
            </Box>

          </Stack>


          <Divider
            sx={{
              mb: isCompact ? 1 : 2,
            }}
          />


          <Alert
            severity="info"
            sx={{
              py: isCompact ? 0.5 : 1,
            }}
          >
            Your application preferences
            are saved automatically.
          </Alert>

        </CardContent>
      </Card>


      {/* =======================================
          SECURITY
      ======================================= */}

      <Card
        sx={{
          borderRadius: 3,
        }}
      >
        <CardContent
          sx={{
            p: pagePadding === 2
              ? cardPadding
              : 4,
          }}
        >

          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{
              mb: headerSpacing,
            }}
          >

            <SecurityOutlined
              color="primary"
            />

            <Box>
              <Typography
                variant="h6"
                fontWeight={700}
              >
                Security
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Account and authentication
                settings.
              </Typography>
            </Box>

          </Stack>


          <Divider
            sx={{
              mb: isCompact ? 1 : 2,
            }}
          />


          <Typography
            color="text.secondary"
            variant="body2"
            sx={{
              lineHeight: isCompact
                ? 1.5
                : 1.7,
            }}
          >
            Authentication, sessions and
            account security are managed by
            the existing authentication system.
          </Typography>

        </CardContent>
      </Card>

    </Box>
  );
};

export default SettingsPage;