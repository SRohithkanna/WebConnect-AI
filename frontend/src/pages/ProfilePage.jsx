import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  ArrowBack,
  Save,
} from "@mui/icons-material";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import apiClient from "../api/axios.js";

const ProfilePage = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);

  const [formData, setFormData] = useState({
    headline: "",
    bio: "",
    location: "",
    company: "",
    currentPosition: "",
    yearsOfExperience: 0,
    portfolio: "",
    github: "",
    linkedin: "",
    twitter: "",
    skills: "",
    interests: "",
    availability: "Open to Work",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /*
  |--------------------------------------------------------------------------
  | Fetch Profile
  |--------------------------------------------------------------------------
  */

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await apiClient.get("/profile/me");

      const data = response.data?.data || response.data;

      setProfile(data);

      setFormData({
        headline: data.headline || "",
        bio: data.bio || "",
        location: data.location || "",
        company: data.company || "",
        currentPosition: data.currentPosition || "",
        yearsOfExperience:
          data.yearsOfExperience ?? 0,

        portfolio: data.portfolio || "",
        github: data.github || "",
        linkedin: data.linkedin || "",
        twitter: data.twitter || "",

        /*
         * IMPORTANT:
         * Keep these as strings while editing.
         * This allows the user to type commas normally.
         */
        skills: Array.isArray(data.skills)
          ? data.skills.join(", ")
          : "",

        interests: Array.isArray(data.interests)
          ? data.interests.join(", ")
          : "",

        availability:
          data.availability || "Open to Work",
      });
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

  /*
  |--------------------------------------------------------------------------
  | Handle Input Changes
  |--------------------------------------------------------------------------
  */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /*
  |--------------------------------------------------------------------------
  | Convert comma separated string to array
  |--------------------------------------------------------------------------
  */

  const convertToArray = (value) => {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  };

  /*
  |--------------------------------------------------------------------------
  | Save Profile
  |--------------------------------------------------------------------------
  */

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const payload = {
        headline: formData.headline,
        bio: formData.bio,
        location: formData.location,
        company: formData.company,
        currentPosition: formData.currentPosition,

        yearsOfExperience:
          Number(formData.yearsOfExperience) || 0,

        portfolio: formData.portfolio,
        github: formData.github,
        linkedin: formData.linkedin,
        twitter: formData.twitter,

        /*
         * Convert strings to arrays ONLY when saving.
         */
        skills: convertToArray(formData.skills),
        interests: convertToArray(
          formData.interests
        ),

        availability: formData.availability,
      };

      const response = await apiClient.patch(
        "/profile/me",
        payload
      );

      const updatedProfile =
        response.data?.data || response.data;

      setProfile(updatedProfile);

      /*
       * Update the form with the saved values.
       */
      setFormData({
        headline: updatedProfile.headline || "",
        bio: updatedProfile.bio || "",
        location: updatedProfile.location || "",
        company: updatedProfile.company || "",
        currentPosition:
          updatedProfile.currentPosition || "",

        yearsOfExperience:
          updatedProfile.yearsOfExperience ?? 0,

        portfolio: updatedProfile.portfolio || "",
        github: updatedProfile.github || "",
        linkedin: updatedProfile.linkedin || "",
        twitter: updatedProfile.twitter || "",

        skills: Array.isArray(
          updatedProfile.skills
        )
          ? updatedProfile.skills.join(", ")
          : "",

        interests: Array.isArray(
          updatedProfile.interests
        )
          ? updatedProfile.interests.join(", ")
          : "",

        availability:
          updatedProfile.availability ||
          "Open to Work",
      });

      setSuccess(
        "Profile updated successfully. You can now re-analyse your profile from the AI Analysis page."
      );
      setTimeout(() => {
  navigate("/profile");
}, 1000);
    } catch (error) {
      console.error(
        "Failed to update profile:",
        error
      );

      setError(
        error?.response?.data?.message ||
          "Failed to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Loading
  |--------------------------------------------------------------------------
  */

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

  /*
  |--------------------------------------------------------------------------
  | Error
  |--------------------------------------------------------------------------
  */

  if (!profile) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">
          {error || "Profile not found."}
        </Alert>
      </Box>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | UI
  |--------------------------------------------------------------------------
  */

  return (
    <Box
      sx={{
        maxWidth: 1000,
        mx: "auto",
        py: 2,
      }}
    >
      {/* Back Button */}

      <Button
  startIcon={<ArrowBack />}
  onClick={() => navigate("/profile")}
  sx={{ mb: 3 }}
>
  Back to Profile
</Button>

      {/* Header */}

      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          fontWeight={700}
        >
          Edit Profile
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          Update your developer profile information.
        </Typography>
      </Box>

      {/* Alerts */}

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
        >
          {error}
        </Alert>
      )}

      {success && (
        <Alert
          severity="success"
          sx={{ mb: 3 }}
        >
          {success}
        </Alert>
      )}

      {/* Profile Form */}

      <Card
        sx={{
          borderRadius: 4,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box
            component="form"
            onSubmit={handleSubmit}
          >
            <Stack spacing={3}>
              {/* Basic Information */}

              <Typography
                variant="h6"
                fontWeight={700}
              >
                Basic Information
              </Typography>

              <Divider />

              <TextField
                fullWidth
                label="Headline"
                name="headline"
                value={formData.headline}
                onChange={handleChange}
                placeholder="Full Stack Developer"
                inputProps={{
                  maxLength: 120,
                }}
                required
              />

              <TextField
                fullWidth
                multiline
                rows={4}
                label="Bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell developers about yourself..."
                inputProps={{
                  maxLength: 500,
                }}
                required
              />

              {/* Experience */}

              <Typography
                variant="h6"
                fontWeight={700}
                sx={{ mt: 2 }}
              >
                Experience
              </Typography>

              <Divider />

              <TextField
                fullWidth
                label="Current Position"
                name="currentPosition"
                value={formData.currentPosition}
                onChange={handleChange}
                placeholder="Software Engineer"
                required
              />

              <TextField
                fullWidth
                label="Company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Google"
              />

              <TextField
                fullWidth
                type="number"
                label="Years of Experience"
                name="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleChange}
                inputProps={{
                  min: 0,
                  max: 50,
                }}
                required
              />

              {/* Location */}

              <Typography
                variant="h6"
                fontWeight={700}
                sx={{ mt: 2 }}
              >
                Location
              </Typography>

              <Divider />

              <TextField
                fullWidth
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Chennai, India"
                required
              />

              {/* Skills */}

              <Typography
                variant="h6"
                fontWeight={700}
                sx={{ mt: 2 }}
              >
                Skills & Interests
              </Typography>

              <Divider />

              <TextField
                fullWidth
                label="Skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="React, Node.js, MongoDB"
                helperText="Separate skills with commas"
                required
              />

              <TextField
                fullWidth
                label="Interests"
                name="interests"
                value={formData.interests}
                onChange={handleChange}
                placeholder="AI, Open Source, System Design"
                helperText="Separate interests with commas"
                required
              />

              {/* Availability */}

              <TextField
                fullWidth
                select
                label="Availability"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
              >
                <MenuItem value="Open to Work">
                  Open to Work
                </MenuItem>

                <MenuItem value="Open to Freelance">
                  Open to Freelance
                </MenuItem>

                <MenuItem value="Not Available">
                  Not Available
                </MenuItem>
              </TextField>

              {/* Social Links */}

              <Typography
                variant="h6"
                fontWeight={700}
                sx={{ mt: 2 }}
              >
                Social Links
              </Typography>

              <Divider />

              <TextField
                fullWidth
                label="GitHub"
                name="github"
                value={formData.github}
                onChange={handleChange}
                placeholder="https://github.com/username"
              />

              <TextField
                fullWidth
                label="LinkedIn"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                helperText="Add https://"
                placeholder="https://linkedin.com/in/username"
                required
              />

              <TextField
                fullWidth
                label="Twitter"
                name="twitter"
                value={formData.twitter}
                onChange={handleChange}
                placeholder="https://twitter.com/username"
              />

              <TextField
                fullWidth
                label="Portfolio"
                name="portfolio"
                value={formData.portfolio}
                onChange={handleChange}
                placeholder="https://yourportfolio.com"
              />

              {/* Save */}

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  pt: 2,
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  startIcon={
                    saving ? (
                      <CircularProgress
                        size={20}
                        color="inherit"
                      />
                    ) : (
                      <Save />
                    )
                  }
                  disabled={saving}
                  sx={{
                    px: 4,
                    py: 1.3,
                    borderRadius: 2,
                  }}
                >
                  {saving
                    ? "Saving..."
                    : "Save Changes"}
                </Button>
              </Box>
            </Stack>
          </Box>
        </CardContent>
      </Card>

      {/* Current Skills Preview */}

      <Card
        sx={{
          borderRadius: 4,
          mt: 3,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{ mb: 2 }}
          >
            Current Skills
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            useFlexGap
          >
            {convertToArray(
              formData.skills
            ).length > 0 ? (
              convertToArray(
                formData.skills
              ).map((skill, index) => (
                <Chip
                  key={`${skill}-${index}`}
                  label={skill}
                  variant="outlined"
                />
              ))
            ) : (
              <Typography color="text.secondary">
                No skills added yet.
              </Typography>
            )}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfilePage;