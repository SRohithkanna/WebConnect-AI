import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import CheckCircle from '@mui/icons-material/CheckCircle';
import AutoAwesome from '@mui/icons-material/AutoAwesome';
import TrendingUp from '@mui/icons-material/TrendingUp';
import School from '@mui/icons-material/School';
import { useEffect, useState } from "react";

import aiApi from "../api/aiApi";

const formatKey = (key) => {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^./, (char) => char.toUpperCase());
};

const renderValue = (value, level = 0) => {
  if (value === null || value === undefined) {
    return null;
  }

  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return (
      <Typography
        color={
          level === 0
            ? "text.primary"
            : "text.secondary"
        }
        sx={{
          lineHeight: 1.8,
          whiteSpace: "pre-wrap",
        }}
      >
        {String(value)}
      </Typography>
    );
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return (
        <Typography color="text.secondary">
          No items available.
        </Typography>
      );
    }

    return (
      <Stack spacing={1.5}>
        {value.map((item, index) => {
          if (
            typeof item === "string" ||
            typeof item === "number"
          ) {
            return (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  gap: 1,
                  alignItems: "flex-start",
                }}
              >
                <CheckCircle 
                  sx={{
                    fontSize: 20,
                    mt: 0.3,
                    color: "primary.main",
                  }}
                />

                <Typography
                  sx={{
                    lineHeight: 1.7,
                  }}
                >
                  {String(item)}
                </Typography>
              </Box>
            );
          }

          return (
            <Card
              key={index}
              variant="outlined"
              sx={{
                borderRadius: 2,
              }}
            >
              <CardContent>
                {renderValue(item, level + 1)}
              </CardContent>
            </Card>
          );
        })}
      </Stack>
    );
  }

  if (typeof value === "object") {
    return (
      <Stack spacing={2}>
        {Object.entries(value).map(
          ([key, nestedValue]) => (
            <Box key={key}>
              <Typography
                fontWeight={700}
                sx={{ mb: 1 }}
              >
                {formatKey(key)}
              </Typography>

              {renderValue(
                nestedValue,
                level + 1
              )}
            </Box>
          )
        )}
      </Stack>
    );
  }

  return null;
};

const RoadmapPage = () => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAnalysis = async () => {
    try {
      setLoading(true);
      setError("");

     const response = await aiApi.getLatestAnalysis();

      setAnalysis(response.data || null);
    } catch (error) {
      console.error(
        "Failed to load roadmap:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to load your AI roadmap."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalysis();
  }, []);

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
          Career Roadmap
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Your personalized career roadmap generated from
          your AI profile analysis.
        </Typography>

        <Alert severity="info">
          {error}
        </Alert>
      </Box>
    );
  }

  const roadmap = analysis?.roadmap;

  return (
    <Box
      sx={{
        maxWidth: 1000,
        mx: "auto",
        py: 4,
      }}
    >
      {/* Header */}
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{ mb: 1 }}
      >
        <AutoAwesome color="primary" />

        <Typography
          variant="h4"
          fontWeight={700}
        >
          Career Roadmap
        </Typography>
      </Stack>

      <Typography
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Your personalized roadmap generated from your latest
        AI profile analysis.
      </Typography>

      {!roadmap ? (
        <Card
          sx={{
            borderRadius: 3,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Stack
              alignItems="center"
              spacing={2}
              sx={{ py: 4 }}
            >
              <FlagOutlined
                sx={{
                  fontSize: 45,
                  color: "text.secondary",
                }}
              />

              <Typography
                variant="h6"
                fontWeight={700}
              >
                No roadmap available
              </Typography>

              <Typography
                color="text.secondary"
                textAlign="center"
              >
                Run your AI profile analysis to generate
                your personalized career roadmap.
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card
            sx={{
              borderRadius: 3,
              mb: 3,
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ mb: 2 }}
              >
                <AutoAwesome color="primary" />

                <Typography
                  variant="h6"
                  fontWeight={700}
                >
                  AI-Generated Roadmap
                </Typography>

                <Chip
                  label="From Profile Analysis"
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              </Stack>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                This roadmap is taken directly from your
                latest saved AI profile analysis.
              </Typography>
            </CardContent>
          </Card>

          {Array.isArray(roadmap) ? (
            <Stack spacing={3}>
              {roadmap.map((item, index) => (
                <Card
                  key={index}
                  sx={{
                    borderRadius: 3,
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="flex-start"
                      sx={{ mb: 3 }}
                    >
                      <Box
                        sx={{
                          width: 38,
                          height: 38,
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: "primary.main",
                          color: "white",
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        {index + 1}
                      </Box>

                      <Box sx={{ flex: 1 }}>
                        {typeof item === "object" &&
                        item !== null ? (
                          renderValue(item)
                        ) : (
                          <Typography>
                            {String(item)}
                          </Typography>
                        )}
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          ) : (
            <Card
              sx={{
                borderRadius: 3,
              }}
            >
              <CardContent sx={{ p: 4 }}>
                {renderValue(roadmap)}
              </CardContent>
            </Card>
          )}
        </>
      )}

      {analysis?.analyzedAt && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 3 }}
        >
          Analysis generated on{" "}
          {new Date(
            analysis.analyzedAt
          ).toLocaleString()}
        </Typography>
      )}
    </Box>
  );
};

export default RoadmapPage;