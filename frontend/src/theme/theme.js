import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',

    background: {
      default: '#0b0d10',
      paper: '#15181d',
    },

    text: {
      primary: '#f5f7fa',
      secondary: '#9aa3b2',
    },

    divider:
      'rgba(255,255,255,0.08)',

    primary: {
      main: '#3b82f6',
    },
  },

  typography: {
    fontFamily:
      'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',

    h4: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },

    h5: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },

    h6: {
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 10,
  },

  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border:
            '1px solid rgba(255,255,255,0.08)',
          boxShadow: 'none',
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor:
            'rgba(255,255,255,0.06)',
          color: '#cbd5e1',
          border:
            '1px solid rgba(255,255,255,0.08)',
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor:
            'rgba(255,255,255,0.08)',
        },
      },
    },
  },
});

export default theme;