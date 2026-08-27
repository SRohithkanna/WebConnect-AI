import {
  Avatar,
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
  ArrowBack,
  BusinessCenterOutlined,
  LocationOnOutlined,
  GitHub,
  LinkedIn,
  Language,
} from "@mui/icons-material";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getPublicProfile } from "../api/profileApi";

const PublicProfilePage = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getPublicProfile(username);

        console.log("Public profile response:", response);

        setProfile(response?.data || null);
      } catch (error) {
        console.error("Failed to fetch profile:", error);

        setError(
          error?.response?.data?.message ||
            "Failed to load profile."
        );
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchProfile();
    }
  }, [username]);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!profile) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography>
          Profile not found.
        </Typography>
      </Box>
    );
  }

  const skills = Array.isArray(profile.skills)
    ? profile.skills
    : [];

  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: "auto",
        py: 4,
      }}
    >
      {/* Back */}
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate("/developers")}
        sx={{ mb: 4 }}
      >
        Back to Developers
      </Button>

      {/* Main Profile */}
      <Card
        sx={{
          borderRadius: 4,
          mb: 3,
        }}
      >
        <CardContent sx={{ p: 5 }}>
          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            spacing={3}
            alignItems={{
              xs: "flex-start",
              sm: "center",
            }}
          >
            <Avatar
              src={profile.avatar || ""}
              sx={{
                width: 120,
                height: 120,
                fontSize: 42,
              }}
            >
              {profile.name
                ?.charAt(0)
                ?.toUpperCase() || "U"}
            </Avatar>

            <Box>
              <Typography
                variant="h3"
                fontWeight={700}
              >
                {profile.name || "User"}
              </Typography>

              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                @{profile.username || username}
              </Typography>

              <Typography
                variant="h6"
                sx={{ mb: 2 }}
              >
                {profile.currentPosition ||
                  profile.headline ||
                  "Developer"}
              </Typography>

              {profile.availability && (
                <Chip
                  label={profile.availability}
                  variant="outlined"
                />
              )}
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Information */}
      <Stack
        direction={{
          xs: "column",
          md: "row",
        }}
        spacing={3}
      >
        {/* About */}
        <Card sx={{ flex: 1, borderRadius: 4 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography
              variant="h5"
              fontWeight={700}
              sx={{ mb: 2 }}
            >
              About
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Typography color="text.secondary">
              {profile.bio || "No bio provided."}
            </Typography>

            {profile.location && (
              <Stack
                direction="row"
                spacing={1}
                sx={{ mt: 3 }}
              >
                <LocationOnOutlined />

                <Typography>
                  {profile.location}
                </Typography>
              </Stack>
            )}

            {profile.company && (
              <Stack
                direction="row"
                spacing={1}
                sx={{ mt: 2 }}
              >
                <BusinessCenterOutlined />

                <Typography>
                  {profile.company}
                </Typography>
              </Stack>
            )}

            {profile.yearsOfExperience >0&& (
              <Stack
                direction="row"
                spacing={1}
                sx={{ mt: 2 }}
              >
                <BusinessCenterOutlined />

                <Typography>
                  {profile.yearsOfExperience} years of
                  experience
                </Typography>
              </Stack>
            )}
          </CardContent>
        </Card>

        {/* Skills */}
        <Card sx={{ flex: 1, borderRadius: 4 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography
              variant="h5"
              fontWeight={700}
              sx={{ mb: 2 }}
            >
              Skills
            </Typography>

            <Divider sx={{ mb: 3 }} />

            {skills.length > 0 ? (
              <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
                useFlexGap
              >
                {skills.map((skill, index) => (
                  <Chip
                    key={`${skill}-${index}`}
                    label={skill}
                    variant="outlined"
                  />
                ))}
              </Stack>
            ) : (
              <Typography color="text.secondary">
                No skills added yet.
              </Typography>
            )}
          </CardContent>
        </Card>
      </Stack>

      {/* Social Links */}
      <Card
        sx={{
          borderRadius: 4,
          mt: 3,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{ mb: 2 }}
          >
            Connect
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Stack
            direction="row"
            spacing={2}
            flexWrap="wrap"
            useFlexGap
          >
            {profile.github && (
              <Button
                variant="outlined"
                startIcon={<GitHub />}
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </Button>
            )}

            {profile.linkedin && (
              <Button
                variant="outlined"
                startIcon={<LinkedIn />}
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </Button>
            )}

            {profile.portfolio && (
              <Button
                variant="outlined"
                startIcon={<Language />}
                href={profile.portfolio}
                target="_blank"
                rel="noopener noreferrer"
              >
                Portfolio
              </Button>
            )}
          </Stack>

          {!profile.github &&
            !profile.linkedin &&
            !profile.portfolio && (
              <Typography color="text.secondary">
                No social links added yet.
              </Typography>
            )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default PublicProfilePage;