import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import SearchOutlined from '@mui/icons-material/SearchOutlined';
import PersonOutlined from '@mui/icons-material/PersonOutlined';

import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { getUsers } from '../api/userApi.js';

const UsersPage = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await getUsers();

        setUsers(response.data || []);
      } catch (error) {
        console.error(
          'Failed to load users:',
          error
        );

        setError(
          'Unable to load developers.'
        );
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) => {
      const searchText =
        search.toLowerCase().trim();

      if (!searchText) {
        return true;
      }

      return (
        user.name
          ?.toLowerCase()
          .includes(searchText) ||
        user.username
          ?.toLowerCase()
          .includes(searchText) ||
        user.headline
          ?.toLowerCase()
          .includes(searchText) ||
        user.skills?.some((skill) =>
          skill
            .toLowerCase()
            .includes(searchText)
        )
      );
    }
  );

  return (
    <Box
      sx={{
        maxWidth: 1100,
        mx: 'auto',
        py: 4,
      }}
    >
      {/* Header */}

      <Typography
        variant="h4"
        fontWeight={700}
      >
        Discover Developers
      </Typography>

      <Typography
        color="text.secondary"
        sx={{
          mt: 1,
          mb: 4,
        }}
      >
        Explore developers, their skills,
        experience, and projects.
      </Typography>

      {/* Search */}

      <TextField
        fullWidth
        value={search}
        onChange={(event) =>
          setSearch(event.target.value)
        }
        placeholder="Search developers by name, username, role, or skill..."
        InputProps={{
          startAdornment: (
            <SearchOutlined
              sx={{
                mr: 1,
                color: 'text.secondary',
              }}
            />
          ),
        }}
        sx={{
          mb: 4,
        }}
      />

      {/* Error */}

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
        >
          {error}
        </Alert>
      )}

      {/* Loading */}

      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            py: 8,
          }}
        >
          <CircularProgress />
        </Box>
      ) : filteredUsers.length === 0 ? (
        <Card>
          <CardContent>
            <Typography
              color="text.secondary"
              textAlign="center"
            >
              No developers found.
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Grid
          container
          spacing={3}
        >
          {filteredUsers.map(
            (user) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={user._id}
              >
                <Card
                  sx={{
                    height: '100%',
                    borderRadius: 3,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardContent
                    sx={{
                      flex: 1,
                    }}
                  >
                    {/* User */}

                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                    >
                      <Avatar
                        src={user.avatar || ''}
                        sx={{
                          width: 56,
                          height: 56,
                        }}
                      >
                        {user.name
                          ?.charAt(0)
                          ?.toUpperCase() || (
                          <PersonOutlined />
                        )}
                      </Avatar>

                      <Box
                        sx={{
                          minWidth: 0,
                        }}
                      >
                        <Typography
                          fontWeight={700}
                          noWrap
                        >
                          {user.name ||
                            'Developer'}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          noWrap
                        >
                          @{user.username}
                        </Typography>
                      </Box>
                    </Stack>

                    {/* Headline */}

                    <Typography
                      sx={{
                        mt: 2,
                        minHeight: 48,
                      }}
                    >
                      {user.headline ||
                        'Developer'}
                    </Typography>

                    {/* Location */}

                    {user.location && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mt: 1,
                        }}
                      >
                        {user.location}
                      </Typography>
                    )}

                    <Divider
                      sx={{
                        my: 2,
                      }}
                    />

                    {/* Skills */}

                    <Stack
                      direction="row"
                      spacing={1}
                      useFlexGap
                      flexWrap="wrap"
                    >
                      {(
                        user.skills || []
                      )
                        .slice(0, 5)
                        .map(
                          (skill) => (
                            <Chip
                              key={skill}
                              label={skill}
                              size="small"
                            />
                          )
                        )}
                    </Stack>
                  </CardContent>

                  {/* Button */}

                  <Box
                    sx={{
                      px: 2,
                      pb: 2,
                    }}
                  >
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() =>
                        navigate(
                          `/users/${user._id}`
                        )
                      }
                    >
                      View Profile
                    </Button>
                  </Box>
                </Card>
              </Grid>
            )
          )}
        </Grid>
      )}
    </Box>
  );
};

export default UsersPage;