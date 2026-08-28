import { createTheme } from '@mui/material/styles';

const createAppTheme = (
  appearance = 'dark',
  density = 'comfortable'
) => {
  const isDark = appearance === 'dark';
  const isCompact = density === 'compact';

  /*
   * Comfortable:
   * 1 spacing unit = 8px
   *
   * Compact:
   * 1 spacing unit = 6px
   *
   * This automatically affects:
   * p: 4
   * mb: 3
   * mt: 2
   * Stack spacing={3}
   * gap: 2
   * etc.
   */

  const spacingUnit = isCompact ? 6 : 8;

  return createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',

      background: isDark
        ? {
            default: '#0b0d10',
            paper: '#15181d',
          }
        : {
            default: '#f5f7fa',
            paper: '#ffffff',
          },

      text: isDark
        ? {
            primary: '#f5f7fa',
            secondary: '#9aa3b2',
          }
        : {
            primary: '#172033',
            secondary: '#667085',
          },

      divider: isDark
        ? 'rgba(255,255,255,0.08)'
        : 'rgba(0,0,0,0.08)',

      primary: {
        main: '#3b82f6',
      },
    },

    /*
     * ---------------------------------------
     * GLOBAL SPACING
     * ---------------------------------------
     */

    spacing: spacingUnit,

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
      /*
       * ---------------------------------------
       * CARDS
       * ---------------------------------------
       */

      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',

            border: isDark
              ? '1px solid rgba(255,255,255,0.08)'
              : '1px solid rgba(0,0,0,0.08)',

            boxShadow: 'none',
          },
        },
      },

      /*
       * ---------------------------------------
       * CARD CONTENT
       * ---------------------------------------
       */

      MuiCardContent: {
        styleOverrides: {
          root: {
            padding: isCompact ? 20 : 32,

            '&:last-child': {
              paddingBottom: isCompact
                ? 20
                : 32,
            },
          },
        },
      },

      /*
       * ---------------------------------------
       * CHIPS
       * ---------------------------------------
       */

      MuiChip: {
        styleOverrides: {
          root: {
            backgroundColor: isDark
              ? 'rgba(255,255,255,0.06)'
              : 'rgba(0,0,0,0.04)',

            color: isDark
              ? '#cbd5e1'
              : '#475467',

            border: isDark
              ? '1px solid rgba(255,255,255,0.08)'
              : '1px solid rgba(0,0,0,0.08)',
          },
        },
      },

      /*
       * ---------------------------------------
       * BUTTONS
       * ---------------------------------------
       */

      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 8,
            fontWeight: 600,

            minHeight: isCompact
              ? 36
              : 40,

            paddingTop: isCompact
              ? 6
              : 8,

            paddingBottom: isCompact
              ? 6
              : 8,
          },
        },
      },

      /*
       * ---------------------------------------
       * DIVIDERS
       * ---------------------------------------
       */

      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: isDark
              ? 'rgba(255,255,255,0.08)'
              : 'rgba(0,0,0,0.08)',
          },
        },
      },

      /*
       * ---------------------------------------
       * LIST ITEMS
       * ---------------------------------------
       */

      MuiListItemButton: {
        styleOverrides: {
          root: {
            minHeight: isCompact
              ? 38
              : 44,

            paddingTop: isCompact
              ? 5
              : 8,

            paddingBottom: isCompact
              ? 5
              : 8,
          },
        },
      },

      /*
       * ---------------------------------------
       * TEXT FIELDS
       * ---------------------------------------
       */

      MuiTextField: {
        defaultProps: {
          size: isCompact
            ? 'small'
            : 'medium',
        },
      },

      /*
       * ---------------------------------------
       * INPUTS
       * ---------------------------------------
       */

      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },

      /*
       * ---------------------------------------
       * ALERTS
       * ---------------------------------------
       */

      MuiAlert: {
        styleOverrides: {
          root: {
            paddingTop: isCompact
              ? 6
              : 8,

            paddingBottom: isCompact
              ? 6
              : 8,
          },
        },
      },

      /*
       * ---------------------------------------
       * LIST
       * ---------------------------------------
       */

      MuiList: {
        styleOverrides: {
          root: {
            paddingTop: isCompact
              ? 4
              : 8,

            paddingBottom: isCompact
              ? 4
              : 8,
          },
        },
      },

      /*
       * ---------------------------------------
       * TOOLBAR
       * ---------------------------------------
       */

      MuiToolbar: {
        styleOverrides: {
          root: {
            minHeight: isCompact
              ? 56
              : 64,
          },
        },
      },
    },
  });
};

export default createAppTheme;