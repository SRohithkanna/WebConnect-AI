import {
  Box,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import ReadinessCard from '../components/dashboard/ReadinessCard.jsx';

import RecommendationCard from '../components/dashboard/RecommendationCard.jsx';

const DashboardPage = () => {
  const navigate = useNavigate();

  const user = useSelector(
    (state) => state.auth.user
  );

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
        >
          Welcome
          {user?.name
            ? `, ${user.name}`
            : ''}
        </Typography>

        <Typography
          sx={{
            mt: 1,
            color:
              'rgba(255,255,255,0.5)',
          }}
        >
          Your developer intelligence
          workspace.
        </Typography>
      </Box>

      {/* Main dashboard cards */}

      <Grid
        container
        spacing={3}
      >
        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <ReadinessCard />
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <RecommendationCard
            onAnalyze={
              handleAnalyzeProfile
            }
          />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default DashboardPage;