import {
  Alert,
  Box,
  Card,
  CardContent,
  Divider,
  FormControlLabel,
  Stack,
  Switch,
  Typography,
} from "@mui/material";

import {
  NotificationsOutlined,
  SecurityOutlined,
  TuneOutlined,
} from "@mui/icons-material";

import { useEffect, useState } from "react";

const SettingsPage = () => {
  const [emailNotifications, setEmailNotifications] =
    useState(true);

  const [analysisNotifications, setAnalysisNotifications] =
    useState(true);

  const [commentNotifications, setCommentNotifications] =
    useState(true);

  useEffect(() => {
    const savedSettings = localStorage.getItem(
      "devconnect-settings"
    );

    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);

        setEmailNotifications(
          settings.emailNotifications ?? true
        );

        setAnalysisNotifications(
          settings.analysisNotifications ?? true
        );

        setCommentNotifications(
          settings.commentNotifications ?? true
        );
      } catch {
        // Ignore invalid local settings.
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "devconnect-settings",
      JSON.stringify({
        emailNotifications,
        analysisNotifications,
        commentNotifications,
      })
    );
  }, [
    emailNotifications,
    analysisNotifications,
    commentNotifications,
  ]);

  return (
    <Box
      sx={{
        maxWidth: 900,
        mx: "auto",
        py: 4,
      }}
    >
      <Typography
        variant="h4"
        fontWeight={700}
        sx={{ mb: 1 }}
      >
        Settings
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Manage your DevConnect AI preferences.
      </Typography>

      {/* Notifications */}
      <Card
        sx={{
          borderRadius: 3,
          mb: 3,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ mb: 3 }}
          >
            <NotificationsOutlined color="primary" />

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
                Choose which notifications you want to receive.
              </Typography>
            </Box>
          </Stack>

          <Divider sx={{ mb: 1 }} />

          <FormControlLabel
            control={
              <Switch
                checked={emailNotifications}
                onChange={(event) =>
                  setEmailNotifications(
                    event.target.checked
                  )
                }
              />
            }
            label={
              <Box>
                <Typography>
                  Email notifications
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Receive important account notifications.
                </Typography>
              </Box>
            }
            sx={{
              width: "100%",
              py: 1,
            }}
          />

          <FormControlLabel
            control={
              <Switch
                checked={commentNotifications}
                onChange={(event) =>
                  setCommentNotifications(
                    event.target.checked
                  )
                }
              />
            }
            label={
              <Box>
                <Typography>
                  Comment notifications
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Get notified when someone comments on your posts.
                </Typography>
              </Box>
            }
            sx={{
              width: "100%",
              py: 1,
            }}
          />

          <FormControlLabel
            control={
              <Switch
                checked={analysisNotifications}
                onChange={(event) =>
                  setAnalysisNotifications(
                    event.target.checked
                  )
                }
              />
            }
            label={
              <Box>
                <Typography>
                  AI analysis notifications
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Receive updates related to your AI profile analysis.
                </Typography>
              </Box>
            }
            sx={{
              width: "100%",
              py: 1,
            }}
          />
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card
        sx={{
          borderRadius: 3,
          mb: 3,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ mb: 3 }}
          >
            <TuneOutlined color="primary" />

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

          <Divider sx={{ mb: 2 }} />

          <Alert severity="info">
            Your current interface uses the DevConnect AI dark
            theme. Additional appearance preferences can be
            connected to the application theme later.
          </Alert>
        </CardContent>
      </Card>

      {/* Security */}
      <Card
        sx={{
          borderRadius: 3,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ mb: 3 }}
          >
            <SecurityOutlined color="primary" />

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
                Account and authentication settings.
              </Typography>
            </Box>
          </Stack>

          <Divider sx={{ mb: 2 }} />

          <Typography
            color="text.secondary"
            variant="body2"
          >
            Authentication, sessions and account security are
            managed by the existing authentication system.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SettingsPage;