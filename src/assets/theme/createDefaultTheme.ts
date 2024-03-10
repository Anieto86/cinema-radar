import { createTheme } from '@mui/material';
import { green } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#fefefe',
    },
    secondary: {
      main: green[500],
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
  },
});
