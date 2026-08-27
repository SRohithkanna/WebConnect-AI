import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";

import {
  LocationOnOutlined,
  BusinessOutlined,
  Work,
  SchoolOutlined,
  LanguageOutlined,
  GitHub,
  LinkedIn,
  Twitter,
} from "@mui/icons-material";

import { useSelector } from "react-redux";

const ProfilePage = () => {
  const user = useSelector((state) => state.auth.user);

  const skills = Array.isArray(user?.skills)
    ? user.skills
    : [];

  const interests = Array.isArray(user?.interests)
    ? user.interests
    : [];

  const socialLinks = [
    {
      label: "GitHub",
      value: user?.github,
      icon: <GitHub />,
    },
    {
      label: "LinkedIn",
      value: user?.linkedin,
      icon: <LinkedIn />,
    },
    {
      label: "Twitter",
      value: user?.twitter,
      icon: <Twitter />,
    },
    {
      label: "Portfolio",
      value: user?.portfolio,
      icon: <LanguageOutlined />,
    },
  ];

  return (
    <Box
      sx={{
        maxWidth: 1000,
        mx: "auto",
        py: 4,
      }}
    >
      {/* Header */}
      <Typography
        variant="h4"
        fontWeight={700}
        sx={{ mb: 1 }}
      >
        Profile
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Your developer profile and professional information.
      </Typography>

      {/* Main profile card */}
      <Card
        sx={{
          borderRadius: 3,
          mb: 3,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 3,
              flexWrap: "wrap",
            }}
          >
            {/* Avatar */}
            <Box
              sx={{
                width: 90,
                height: 90,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "primary.main",
                color: "white",
                fontSize: 34,
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {user?.name?.charAt(0)?.toUpperCase() || "D"}
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h5"
                fontWeight={700}
              >
                {user?.name || "Developer"}
              </Typography>

              <Typography
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                @{user?.username || "developer"}
              </Typography>

              {user?.headline && (
                <Typography
                  variant="body1"
                  sx={{ mb: 2 }}
                >
                  {user.headline}
                </Typography>
              )}

              <Stack
                direction="row"
                spacing={2}
                flexWrap="wrap"
                useFlexGap
              >
                {user?.location && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                    }}
                  >
                    <LocationOnOutlined fontSize="small" />
                    <Typography variant="body2">
                      {user.location}
                    </Typography>
                  </Box>
                )}

                {user?.company && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                    }}
                  >
                    <BusinessOutlined fontSize="small" />
                    <Typography variant="body2">
                      {user.company}
                    </Typography>
                  </Box>
                )}

                {user?.currentPosition && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                    }}
                  >
                    <Work fontSize="small" />
                    <Typography variant="body2">
                      {user.currentPosition}
                    </Typography>
                  </Box>
                )}
              </Stack>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Bio */}
      {user?.bio && (
        <Card
          sx={{
            borderRadius: 3,
            mb: 3,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{ mb: 2 }}
            >
              About
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                whiteSpace: "pre-wrap",
                lineHeight: 1.8,
              }}
            >
              {user.bio}
            </Typography>
          </CardContent>
        </Card>
      )}

      <Grid container spacing={3}>
        {/* Professional information */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 3,
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography
                variant="h6"
                fontWeight={700}
                sx={{ mb: 3 }}
              >
                Professional Information
              </Typography>

              <Stack spacing={2.5}>
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Current Position
                  </Typography>

                  <Typography fontWeight={600}>
                    {user?.currentPosition || "Not provided"}
                  </Typography>
                </Box>

                <Divider />

                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Company
                  </Typography>

                  <Typography fontWeight={600}>
                    {user?.company || "Not provided"}
                  </Typography>
                </Box>

                <Divider />

                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Years of Experience
                  </Typography>

                  <Typography fontWeight={600}>
                    {user?.yearsOfExperience ?? "Not provided"}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Skills */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 3,
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography
                variant="h6"
                fontWeight={700}
                sx={{ mb: 3 }}
              >
                Skills
              </Typography>

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
        </Grid>

        {/* Interests */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 3,
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography
                variant="h6"
                fontWeight={700}
                sx={{ mb: 3 }}
              >
                Interests
              </Typography>

              {interests.length > 0 ? (
                <Stack
                  direction="row"
                  spacing={1}
                  flexWrap="wrap"
                  useFlexGap
                >
                  {interests.map((interest, index) => (
                    <Chip
                      key={`${interest}-${index}`}
                      label={interest}
                      variant="outlined"
                    />
                  ))}
                </Stack>
              ) : (
                <Typography color="text.secondary">
                  No interests added yet.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Social links */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 3,
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography
                variant="h6"
                fontWeight={700}
                sx={{ mb: 3 }}
              >
                Links
              </Typography>

              <Stack spacing={2}>
                {socialLinks.map((social) => {
                  if (!social.value) {
                    return null;
                  }

                  let href = social.value;

                  if (
                    !href.startsWith("http://") &&
                    !href.startsWith("https://")
                  ) {
                    href = `https://${href}`;
                  }

                  return (
                    <Box
                      key={social.label}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                      }}
                    >
                      {social.icon}

                      <Link
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        underline="hover"
                      >
                        {social.label}
                      </Link>
                    </Box>
                  );
                })}

                {!socialLinks.some(
                  (social) => social.value
                ) && (
                  <Typography color="text.secondary">
                    No links added yet.
                  </Typography>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;