import {
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from '@mui/material';

const ReadinessCard = () => {
  const skills = [
    'Backend',
    'Frontend',
    'System Design',
    'Testing',
    'DevOps',
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
        {/* Header */}

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

        {/* Overall Score */}

        <Box
          sx={{
            mt: 4,
          }}
        >
          <Typography
            variant="h2"
            fontWeight={700}
            color="text.primary"
          >
            —
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 0.5,
            }}
          >
            Not analyzed yet
          </Typography>
        </Box>

        <Divider
          sx={{
            my: 3,
          }}
        />

        {/* Skill Breakdown */}

        <Stack spacing={2}>
          {skills.map((skill) => (
            <Box
              key={skill}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent:
                  'space-between',
              }}
            >
              <Typography
                variant="body2"
                color="text.primary"
              >
                {skill}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                —
              </Typography>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ReadinessCard;