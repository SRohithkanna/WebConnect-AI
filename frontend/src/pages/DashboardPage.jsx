import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';

import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import AutoAwesome from '@mui/icons-material/AutoAwesome';

import aiApi from '../api/aiApi.js';

const DashboardPage = () => {
  const navigate = useNavigate();

  const user = useSelector(
    (state) => state.auth.user
  );

  const [analysis, setAnalysis] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  useEffect(() => {
    const loadLatestAnalysis = async () => {
      try {
        setLoading(true);
        setError('');

        const response =
          await aiApi.getLatestAnalysis();

        setAnalysis(response.data);
      } catch (err) {
        /*
         * 404 simply means the user has
         * not generated an analysis yet.
         */
        if (
          err?.response?.status !== 404
        ) {
          console.error(
            'Failed to load latest analysis:',
            err
          );

          setError(
            err?.response?.data?.message ||
              'Unable to load your latest analysis.'
          );
        }
      } finally {
        setLoading(false);
      }
    };

    loadLatestAnalysis();
  }, []);

  const handleAnalyzeProfile = () => {
    navigate('/ai-analysis');
  };

  return (
    <Stack spacing={4}>
      {/* Header */}

      <Box>
        <Typography
          variant="h4"
          fontWeight={700}
          color="text.primary"
        >
          Welcome
          {user?.name
            ? `, ${user.name}`
            : ''}
        </Typography>

        <Typography
          color="text.secondary"
          sx={{
            mt: 1,
          }}
        >
          Your developer intelligence
          workspace.
        </Typography>
      </Box>

      {/* Error */}

      {error && (
        <Alert severity="error">
          {error}
        </Alert>
      )}

      {/* Loading */}

      {loading ? (
        <Card>
          <CardContent
            sx={{
              minHeight: 300,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Stack
              spacing={2}
              alignItems="center"
            >
              <CircularProgress />

              <Typography
                color="text.secondary"
              >
                Loading your latest analysis...
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Dashboard Cards */}

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: '1fr 1fr',
              },
              gap: 3,
            }}
          >
            <ReadinessCard
              analysis={analysis}
            />

            <RecommendationCard
              analysis={analysis}
              onAnalyze={
                handleAnalyzeProfile
              }
            />
          </Box>
        </>
      )}
    </Stack>
  );
};


/* =========================================================
   READINESS CARD
========================================================= */

const ReadinessCard = ({
  analysis,
}) => {
  const skills = [
    {
      label: 'Backend',
      value: analysis?.backendScore,
    },
    {
      label: 'Frontend',
      value: analysis?.frontendScore,
    },
    {
      label: 'Database',
      value: analysis?.databaseScore,
    },
    {
      label: 'System Design',
      value:
        analysis?.systemDesignScore,
    },
    {
      label: 'Testing',
      value: analysis?.testingScore,
    },
    {
      label: 'DevOps',
      value: analysis?.devOpsScore,
    },
  ];

  return (
    <Card
      sx={{
        height: '100%',
      }}
    >
      <CardContent
        sx={{
          p: 3,
          '&:last-child': {
            pb: 3,
          },
        }}
      >
        <Typography
          variant="subtitle1"
          fontWeight={600}
          color="text.primary"
        >
          Interview Readiness
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mt: 0.5,
          }}
        >
          Your latest AI assessment
        </Typography>

        <Box
          sx={{
            mt: 3,
          }}
        >
          <Typography
            variant="h2"
            fontWeight={700}
            color="primary.main"
          >
            {analysis
              ? analysis.overallScore
              : '—'}
          </Typography>

          {analysis && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 0.5,
              }}
            >
              Overall score out of 100
            </Typography>
          )}

          {!analysis && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 0.5,
              }}
            >
              Not analyzed yet
            </Typography>
          )}
        </Box>

        {analysis && (
          <Box
            sx={{
              mt: 3,
              p: 2,
              borderRadius: 2,
              bgcolor:
                'rgba(255,255,255,0.04)',
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Placement readiness
            </Typography>

            <Typography
              variant="h6"
              fontWeight={700}
              color="text.primary"
              sx={{
                mt: 0.5,
              }}
            >
              {analysis.placementReadiness}%
            </Typography>
          </Box>
        )}

        <Box
          sx={{
            mt: 3,
          }}
        >
          <Stack spacing={2}>
            {skills.map((skill) => (
              <Box key={skill.label}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent:
                      'space-between',
                    mb: 0.75,
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.primary"
                  >
                    {skill.label}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {analysis
                      ? `${skill.value}%`
                      : '—'}
                  </Typography>
                </Box>

                {analysis && (
                  <LinearProgress
                    variant="determinate"
                    value={skill.value}
                    sx={{
                      height: 5,
                      borderRadius: 5,
                      bgcolor:
                        'rgba(255,255,255,0.08)',
                    }}
                  />
                )}
              </Box>
            ))}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};


/* =========================================================
   RECOMMENDATION CARD
========================================================= */

const RecommendationCard = ({
  analysis,
  onAnalyze,
}) => {
  const recommendations =
    analysis?.recommendations || [];

  return (
    <Card
      sx={{
        height: '100%',
      }}
    >
      <CardContent
        sx={{
          p: 3,
          '&:last-child': {
            pb: 3,
          },
        }}
      >
        <Stack spacing={2.5}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <AutoAwesome
              fontSize="small"
              sx={{
                color: 'primary.main',
              }}
            />

            <Typography
              variant="subtitle1"
              fontWeight={600}
              color="text.primary"
            >
              AI Career Recommendation
            </Typography>
          </Box>

          {analysis ? (
            <>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  lineHeight: 1.7,
                }}
              >
                Based on your latest AI
                assessment, these are the
                highest-impact areas to work
                on next.
              </Typography>

              <Stack spacing={1.5}>
                {recommendations
                  .slice(0, 3)
                  .map(
                    (
                      recommendation,
                      index
                    ) => (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          gap: 1.5,
                        }}
                      >
                        <Typography
                          color="primary.main"
                          fontWeight={700}
                        >
                          {index + 1}.
                        </Typography>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            lineHeight: 1.6,
                          }}
                        >
                          {recommendation}
                        </Typography>
                      </Box>
                    )
                  )}
              </Stack>
            </>
          ) : (
            <>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  lineHeight: 1.7,
                }}
              >
                Analyze your profile to receive
                personalized recommendations
                based on your technical skills
                and career goals.
              </Typography>
            </>
          )}

          <Button
            variant={
              analysis
                ? 'outlined'
                : 'contained'
            }
            startIcon={<AutoAwesome />}
            onClick={onAnalyze}
            sx={{
              alignSelf: 'flex-start',
            }}
          >
            {analysis
              ? 'View Full Analysis'
              : 'Analyze Profile'}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default DashboardPage;