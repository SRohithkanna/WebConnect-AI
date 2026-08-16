import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from '@mui/material';

import AutoAwesome from '@mui/icons-material/AutoAwesome';

const RecommendationCard = ({
  onAnalyze,
}) => {
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
        <Stack
          spacing={2.5}
          sx={{
            height: '100%',
          }}
        >
          {/* Header */}

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
              AI Career Analysis
            </Typography>
          </Box>

          {/* Description */}

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              lineHeight: 1.7,
              maxWidth: 520,
            }}
          >
            Get an engineering-focused
            assessment of your current
            skills and identify the areas
            that matter most for your
            career goals.
          </Typography>

          {/* Areas */}

          <Box>
            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              useFlexGap
            >
              <Chip
                label="Backend"
                size="small"
              />

              <Chip
                label="System Design"
                size="small"
              />

              <Chip
                label="Testing"
                size="small"
              />

              <Chip
                label="DevOps"
                size="small"
              />
            </Stack>
          </Box>

          {/* Action */}

          <Box
            sx={{
              mt: 'auto',
            }}
          >
            <Button
              variant="contained"
              onClick={onAnalyze}
              sx={{
                px: 2.5,
              }}
            >
              Analyze Profile
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default RecommendationCard;