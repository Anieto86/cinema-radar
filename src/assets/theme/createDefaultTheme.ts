import { createTheme } from '@mui/material';
export const theme = createTheme({
  palette: {
    primary: {
      main: '#fefefe',
    },
    secondary: {
      main: '#0c0c0c',
    },
  },
  typography: {
    fontFamily: '"Montserrat", sans-serif',
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label': {
            color: '#fefefe',
          },
          '& .MuiInputBase-input': {
            color: '#fefefe',
            fontSize: '30px',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'transparent',
            },
            '&:hover fieldset': {
              borderColor: 'transparent',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'transparent',
            },
          },
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        rail: {
          backgroundColor: '#ffffff',
        },
        thumb: {
          backgroundColor: '#e1e0e0',
        },
        track: {
          backgroundColor: '#e1e0e0',
        },
      },
    },
  },
});
