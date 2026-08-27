import {
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Grid,
  Stack,
  TextField,
  Typography,
  Avatar,
  Button,
} from "@mui/material";

import {
  Search,
  LocationOnOutlined,
  BusinessCenterOutlined,
  Code,
} from "@mui/icons-material";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAllDevelopers } from "../api/profileApi";

const DevelopersPage = () => {
  const navigate = useNavigate();

  const [developers, setDevelopers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getAllDevelopers();

        console.log("Developers response:", response);

        if (Array.isArray(response?.data)) {
          setDevelopers(response.data);
        } else {
          setDevelopers([]);
        }
      } catch (error) {
        console.error("Failed to fetch developers:", error);

        setError(
          error?.response?.data?.message || "Failed to load developers.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDevelopers();
  }, []);

  const filteredDevelopers = developers.filter((developer) => {
    const searchText = search.toLowerCase();

    return (
      developer?.name?.toLowerCase().includes(searchText) ||
      developer?.username?.toLowerCase().includes(searchText) ||
      developer?.headline?.toLowerCase().includes(searchText) ||
      developer?.currentPosition?.toLowerCase().includes(searchText) ||
      developer?.company?.toLowerCase().includes(searchText) ||
      developer?.skills?.some((skill) =>
        skill.toLowerCase().includes(searchText),
      )
    );
  });

  const openProfile = (username) => {
  if (!username) {
    console.error("Developer username is missing");
    return;
  }

  navigate(`/developers/${username}`);
};
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

  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: "auto",
        py: 4,
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
          Developers
        </Typography>

        <Typography color="text.secondary">
          Discover developers and connect with people in the community.
        </Typography>
      </Box>

      {/* Search */}
      <TextField
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search developers, skills, roles or companies..."
        slotProps={{
          input: {
            startAdornment: (
              <Search
                sx={{
                  mr: 1,
                  color: "text.secondary",
                }}
              />
            ),
          },
        }}
        sx={{
          mb: 4,
          "& .MuiOutlinedInput-root": {
            borderRadius: 3,
          },
        }}
      />

      {/* Error */}
      {error && (
        <Card
          sx={{
            mb: 3,
            borderRadius: 3,
          }}
        >
          <CardContent>
            <Typography color="error">{error}</Typography>
          </CardContent>
        </Card>
      )}

      {/* Empty */}
      {!error && filteredDevelopers.length === 0 && (
        <Box
          sx={{
            py: 8,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            No developers found
          </Typography>

          <Typography color="text.secondary">
            Try searching with a different name, username or role.
          </Typography>
        </Box>
      )}

      {/* Developers */}
      <Grid container spacing={3}>
        {filteredDevelopers.map((developer) => {
          const skills = Array.isArray(developer?.skills)
            ? developer.skills
            : [];

          const username = developer?.username;

          return (
            <Grid
              size={{
                xs: 12,
                sm: 6,
                md: 4,
              }}
              key={developer._id}
            >
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  {/* User */}
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    sx={{ mb: 3 }}
                  >
                    <Avatar
                      src={developer?.avatar || ""}
                      sx={{
                        width: 70,
                        height: 70,
                        bgcolor: "primary.main",
                        fontSize: 24,
                      }}
                    >
                      {developer?.name?.charAt(0)?.toUpperCase() || "U"}
                    </Avatar>

                    <Box sx={{ minWidth: 0 }}>
                      <Typography variant="h6" fontWeight={700} noWrap>
                        {developer?.name || "User"}
                      </Typography>

                      <Typography color="text.secondary" noWrap>
                        @{username || "username"}
                      </Typography>
                    </Box>
                  </Stack>

                  {/* Position */}
                  <Typography fontWeight={600} sx={{ mb: 2 }}>
                    {developer?.currentPosition ||
                      developer?.headline ||
                      "Developer"}
                  </Typography>

                  {/* Company */}
                  {developer?.company && (
                    <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                      <BusinessCenterOutlined fontSize="small" color="action" />

                      <Typography variant="body2" color="text.secondary">
                        {developer.company}
                      </Typography>
                    </Stack>
                  )}

                  {/* Location */}
                  {developer?.location && (
                    <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                      <LocationOnOutlined fontSize="small" color="action" />

                      <Typography variant="body2" color="text.secondary">
                        {developer.location}
                      </Typography>
                    </Stack>
                  )}

                  {/* Experience */}
                  <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                    <Code fontSize="small" color="action" />

                    <Typography variant="body2" color="text.secondary">
                      {developer?.yearsOfExperience || 0}{" "}
                      {developer?.yearsOfExperience === 1 ? "year" : "years"}{" "}
                      experience
                    </Typography>
                  </Stack>

                  {/* Skills */}
                  {skills.length > 0 && (
                    <Stack
                      direction="row"
                      spacing={1}
                      flexWrap="wrap"
                      useFlexGap
                      sx={{ mb: 3 }}
                    >
                      {skills.slice(0, 4).map((skill, index) => (
                        <Chip
                          key={`${skill}-${index}`}
                          label={skill}
                          size="small"
                          variant="outlined"
                        />
                      ))}

                      {skills.length > 4 && (
                        <Chip label={`+${skills.length - 4}`} size="small" />
                      )}
                    </Stack>
                  )}

                  {/* View Profile */}
                  <Button
                    type="button"
                    fullWidth
                    variant="outlined"
                    onClick={() => openProfile(username)}
                  >
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default DevelopersPage;
