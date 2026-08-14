import {
  Container,
  Typography,
} from '@mui/material';

import { useSelector } from 'react-redux';

const DashboardPage = () => {
  const user = useSelector(
    (state) => state.auth.user
  );

  return (
    <Container sx={{ py: 6 }}>
      <Typography
        variant="h3"
        fontWeight={700}
      >
        Welcome
        {user?.name
          ? `, ${user.name}`
          : ''}
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mt: 1 }}
      >
        DevConnect AI Dashboard
      </Typography>
    </Container>
  );
};

export default DashboardPage;