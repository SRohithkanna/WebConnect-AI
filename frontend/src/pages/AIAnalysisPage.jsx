import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';

import AutoAwesome from '@mui/icons-material/AutoAwesome';
import CheckCircleOutlined from '@mui/icons-material/CheckCircleOutlined';
import WarningAmberOutlined from '@mui/icons-material/WarningAmberOutlined';
import LightbulbOutlined from '@mui/icons-material/LightbulbOutlined';
import RouteOutlined from '@mui/icons-material/RouteOutlined';

import { useState } from 'react';

import aiApi from '../api/aiApi.js';

const AIAnalysisPage = () => {
  const [analysis, setAnalysis] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await aiApi.analyzeProfile();

      setAnalysis(response.data);
    } catch (err) {
      console.error(
        'AI profile analysis failed:',
        err
      );

      setError(
        err?.response?.data?.message ||
          'Unable to analyze your profile.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack spacing={4}>
      {/* Page Header */}

      <Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <AutoAwesome
            sx={{
              color: 'primary.main',
            }}
          />

          <Typography
            variant="h4"
            color="text.primary"
          >
            AI Profile Analysis
          </Typography>
        </Box>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            mt: 1,
            maxWidth: 750,
            lineHeight: 1.7,
          }}
        >
          Get an engineering-focused assessment
          of your current skills, identify your
          gaps, and follow a personalized roadmap
          toward your career goals.
        </Typography>
      </Box>

      {/* Error */}

      {error && (
        <Alert
          severity="error"
          onClose={() => setError('')}
        >
          {error}
        </Alert>
      )}

      {/* Initial State */}

      {!analysis && !loading && (
        <Card>
          <CardContent
            sx={{
              p: 4,
              '&:last-child': {
                pb: 4,
              },
            }}
          >
            <Stack
              spacing={3}
              alignItems="flex-start"
            >
              <Typography
                variant="h6"
                color="text.primary"
              >
                Ready to analyze your profile?
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  maxWidth: 700,
                  lineHeight: 1.7,
                }}
              >
                Our AI will evaluate your
                technical profile and generate
                personalized insights covering
                your strengths, weaknesses,
                placement readiness, and an
                actionable learning roadmap.
              </Typography>

              <Button
                variant="contained"
                startIcon={<AutoAwesome />}
                onClick={handleAnalyze}
              >
                Analyze My Profile
              </Button>
            </Stack>
          </CardContent>
        </Card>
      )}

      {/* Loading State */}

      {loading && (
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
                AI is analyzing your profile...
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                This may take a few seconds.
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      )}

      {/* Analysis Result */}

      {analysis && !loading && (
        <AnalysisResult
          analysis={analysis}
          onReanalyze={handleAnalyze}
        />
      )}
    </Stack>
  );
};


/* =========================================================
   ANALYSIS RESULT
========================================================= */

const AnalysisResult = ({
  analysis,
  onReanalyze,
}) => {
  const skillScores = [
    {
      label: 'Backend',
      value: analysis.backendScore,
    },
    {
      label: 'Frontend',
      value: analysis.frontendScore,
    },
    {
      label: 'Database',
      value: analysis.databaseScore,
    },
    {
      label: 'System Design',
      value: analysis.systemDesignScore,
    },
    {
      label: 'Testing',
      value: analysis.testingScore,
    },
    {
      label: 'DevOps',
      value: analysis.devOpsScore,
    },
  ];

  return (
    <Stack spacing={3}>
      {/* Score Overview */}

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: '1fr 2fr',
          },
          gap: 3,
        }}
      >
        {/* Overall Score */}

        <Card>
          <CardContent
            sx={{
              p: 3,
              height: '100%',
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
              Overall Readiness
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 0.5,
              }}
            >
              Your overall technical assessment
            </Typography>

            <Box
              sx={{
                mt: 4,
                display: 'flex',
                alignItems: 'baseline',
                gap: 1,
              }}
            >
              <Typography
                variant="h1"
                fontWeight={700}
                color="primary.main"
              >
                {analysis.overallScore}
              </Typography>

              <Typography
                variant="h6"
                color="text.secondary"
              >
                / 100
              </Typography>
            </Box>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 1,
              }}
            >
              Placement readiness:{' '}
              <strong>
                {analysis.placementReadiness}%
              </strong>
            </Typography>
          </CardContent>
        </Card>

        {/* Skill Scores */}

        <Card>
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
              Technical Skills
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 0.5,
                mb: 3,
              }}
            >
              AI-assessed competency across key
              engineering areas.
            </Typography>

            <Stack spacing={2.5}>
              {skillScores.map((skill) => (
                <SkillScore
                  key={skill.label}
                  label={skill.label}
                  value={skill.value}
                />
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Box>

      {/* Strengths / Weaknesses */}

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
        <InsightCard
          title="Strengths"
          icon={<CheckCircleOutlined />}
          items={analysis.strengths}
        />

        <InsightCard
          title="Areas to Improve"
          icon={<WarningAmberOutlined />}
          items={analysis.weaknesses}
        />
      </Box>

      {/* Recommendations */}

      <Card>
        <CardContent
          sx={{
            p: 3,
            '&:last-child': {
              pb: 3,
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mb: 1,
            }}
          >
            <LightbulbOutlined
              sx={{
                color: 'primary.main',
              }}
            />

            <Typography
              variant="h6"
              fontWeight={600}
              color="text.primary"
            >
              AI Recommendations
            </Typography>
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 3,
            }}
          >
            The highest-impact actions recommended
            by the AI based on your current profile.
          </Typography>

          <Stack spacing={2}>
            {analysis.recommendations.map(
              (recommendation, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    gap: 2,
                    p: 2,
                    borderRadius: 2,
                    bgcolor:
                      'rgba(255,255,255,0.03)',
                    border:
                      '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <Chip
                    label={index + 1}
                    size="small"
                    color="primary"
                  />

                  <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{
                      lineHeight: 1.7,
                    }}
                  >
                    {recommendation}
                  </Typography>
                </Box>
              )
            )}
          </Stack>
        </CardContent>
      </Card>

      {/* Roadmap */}

      <Card>
        <CardContent
          sx={{
            p: 3,
            '&:last-child': {
              pb: 3,
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mb: 1,
            }}
          >
            <RouteOutlined
              sx={{
                color: 'primary.main',
              }}
            />

            <Typography
              variant="h6"
              fontWeight={600}
              color="text.primary"
            >
              8-Week Development Roadmap
            </Typography>
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 3,
            }}
          >
            A personalized sequence of learning and
            implementation goals generated from your
            profile gaps.
          </Typography>

          <Stack spacing={0}>
            {analysis.roadmap.map(
              (phase, index) => (
                <RoadmapItem
                  key={phase.week}
                  phase={phase}
                  isLast={
                    index ===
                    analysis.roadmap.length - 1
                  }
                />
              )
            )}
          </Stack>
        </CardContent>
      </Card>

      {/* Re-analyze */}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          variant="outlined"
          startIcon={<AutoAwesome />}
          onClick={onReanalyze}
        >
          Analyze Again
        </Button>
      </Box>
    </Stack>
  );
};


/* =========================================================
   SKILL SCORE
========================================================= */

const SkillScore = ({
  label,
  value,
}) => {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mb: 0.75,
        }}
      >
        <Typography
          variant="body2"
          color="text.primary"
        >
          {label}
        </Typography>

        <Typography
          variant="body2"
          fontWeight={600}
          color="text.secondary"
        >
          {value}%
        </Typography>
      </Box>

      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          height: 7,
          borderRadius: 10,
          bgcolor:
            'rgba(255,255,255,0.08)',
          '& .MuiLinearProgress-bar': {
            borderRadius: 10,
          },
        }}
      />
    </Box>
  );
};


/* =========================================================
   INSIGHT CARD
========================================================= */

const InsightCard = ({
  title,
  icon,
  items,
}) => {
  return (
    <Card>
      <CardContent
        sx={{
          p: 3,
          '&:last-child': {
            pb: 3,
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mb: 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              color: 'primary.main',
            }}
          >
            {icon}
          </Box>

          <Typography
            variant="h6"
            fontWeight={600}
            color="text.primary"
          >
            {title}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Stack spacing={2}>
          {items.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                gap: 1.5,
              }}
            >
              <Typography
                color="primary.main"
                sx={{
                  lineHeight: 1.6,
                }}
              >
                •
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  lineHeight: 1.7,
                }}
              >
                {item}
              </Typography>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};


/* =========================================================
   ROADMAP ITEM
========================================================= */

const RoadmapItem = ({
  phase,
  isLast,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
      }}
    >
      {/* Timeline */}

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: 32,
          flexShrink: 0,
        }}
      >
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor:
              'rgba(59,130,246,0.15)',
            border:
              '1px solid rgba(59,130,246,0.35)',
            color: 'primary.main',
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          {phase.week}
        </Box>

        {!isLast && (
          <Box
            sx={{
              width: 1,
              flex: 1,
              minHeight: 40,
              bgcolor:
                'rgba(255,255,255,0.08)',
            }}
          />
        )}
      </Box>

      {/* Goal */}

      <Box
        sx={{
          pb: isLast ? 0 : 3,
          pt: 0.25,
        }}
      >
        <Typography
          variant="subtitle2"
          fontWeight={600}
          color="text.primary"
        >
          Week {phase.week}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mt: 0.75,
            lineHeight: 1.7,
          }}
        >
          {phase.goal}
        </Typography>
      </Box>
    </Box>
  );
};

export default AIAnalysisPage;