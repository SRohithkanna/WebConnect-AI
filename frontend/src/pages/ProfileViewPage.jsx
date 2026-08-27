import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import {
  EditOutlined,
  AutoAwesome,
} from "@mui/icons-material";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import apiClient from "../api/axios.js";

const ProfileViewPage = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await apiClient.get("/profile/me");

      const data =
        response.data?.data || response.data;

      setProfile(data);
    } catch (error) {
      console.error(
        "Failed to fetch profile:",
        error
      );

      setError(
        error?.response?.data?.message ||
          "Failed to load profile."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!profile) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">
          {error || "Profile not found."}
        </Alert>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 1000,
        mx: "auto",
        py: 2,
      }}
    >
      {/* Header */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 4,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            fontWeight={700}
          >
            {profile.name}
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            {profile.headline ||
              "Developer profile"}
          </Typography>
        </Box>

        <Button
          variant="outlined"
          startIcon={<EditOutlined />}
          onClick={() =>
            navigate("/profile/edit")
          }
        >
          Edit Profile
        </Button>
      </Box>

      {/* Profile Information */}

      <Card
        sx={{
          borderRadius: 4,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Stack spacing={3}>

            {/* About */}

            <Box>
              <Typography
                variant="h6"
                fontWeight={700}
                sx={{ mb: 1 }}
              >
                About
              </Typography>

              <Divider sx={{ mb: 2 }} />

              <Typography
                color="text.secondary"
              >
                {profile.bio ||
                  "No bio added yet."}
              </Typography>
            </Box>

            {/* Experience */}

            <Box>
              <Typography
                variant="h6"
                fontWeight={700}
                sx={{ mb: 1 }}
              >
                Experience
              </Typography>

              <Divider sx={{ mb: 2 }} />

              <Stack spacing={1}>
                <Typography>
                  <strong>Position:</strong>{" "}
                  {profile.currentPosition ||
                    "Not specified"}
                </Typography>

                <Typography>
                  <strong>Company:</strong>{" "}
                  {profile.company ||
                    "Not specified"}
                </Typography>

                <Typography>
                  <strong>Experience:</strong>{" "}
                  {profile.yearsOfExperience ?? 0}{" "}
                  years
                </Typography>
              </Stack>
            </Box>

            {/* Location */}

            <Box>
              <Typography
                variant="h6"
                fontWeight={700}
                sx={{ mb: 1 }}
              >
                Location
              </Typography>

              <Divider sx={{ mb: 2 }} />

              <Typography color="text.secondary">
                {profile.location ||
                  "Location not specified"}
              </Typography>
            </Box>

            {/* Skills */}

            <Box>
              <Typography
                variant="h6"
                fontWeight={700}
                sx={{ mb: 2 }}
              >
                Skills
              </Typography>

              <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
                useFlexGap
              >
                {profile.skills?.length > 0 ? (
                  profile.skills.map(
                    (skill, index) => (
                      <Chip
                        key={`${skill}-${index}`}
                        label={skill}
                        variant="outlined"
                      />
                    )
                  )
                ) : (
                  <Typography
                    color="text.secondary"
                  >
                    No skills added yet.
                  </Typography>
                )}
              </Stack>
            </Box>

            {/* Interests */}

            <Box>
              <Typography
                variant="h6"
                fontWeight={700}
                sx={{ mb: 2 }}
              >
                Interests
              </Typography>

              <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
                useFlexGap
              >
                {profile.interests?.length > 0 ? (
                  profile.interests.map(
                    (interest, index) => (
                      <Chip
                        key={`${interest}-${index}`}
                        label={interest}
                        variant="outlined"
                      />
                    )
                  )
                ) : (
                  <Typography
                    color="text.secondary"
                  >
                    No interests added yet.
                  </Typography>
                )}
              </Stack>
            </Box>

            {/* Availability */}

            <Box>
              <Typography
                variant="h6"
                fontWeight={700}
                sx={{ mb: 1 }}
              >
                Availability
              </Typography>

              <Divider sx={{ mb: 2 }} />

              <Typography>
                {profile.availability ||
                  "Not specified"}
              </Typography>
            </Box>

            {/* AI Analysis */}

            <Box
              sx={{
                mt: 2,
                p: 3,
                borderRadius: 3,
                bgcolor:
                  "rgba(33, 150, 243, 0.08)",
              }}
            >
              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                spacing={2}
                alignItems={{
                  xs: "stretch",
                  sm: "center",
                }}
                justifyContent="space-between"
              >
                <Box>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                  >
                    AI Profile Analysis
                  </Typography>

                  <Typography
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    Analyse your profile and get
                    personalized insights.
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  startIcon={<AutoAwesome />}
                  onClick={() =>
                    navigate("/ai-analysis")
                  }
                >
                  Analyse Profile
                </Button>
              </Stack>
            </Box>

          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfileViewPage;