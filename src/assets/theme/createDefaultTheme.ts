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
            color: 'white',
          },
          '& .MuiInputBase-input': {
            color: 'white',
            fontSize: '30px',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'transparent', // Borde transparente
            },
            '&:hover fieldset': {
              borderColor: 'transparent', // Borde transparente al pasar el mouse
            },
            '&.Mui-focused fieldset': {
              borderColor: 'transparent', // Borde transparente cuando está enfocado
            },
          },
        },
      },
    },
  },
});
