import { createTheme } from "@mui/material";
export const theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3", // Un azul más suave y moderno
      light: "#6ec6ff", // Azul claro para hover o fondo
      dark: "#0069c0", // Un tono más oscuro para acentos o fondos oscuros
      contrastText: "#fff", // Blanco para asegurar legibilidad en botones
    },
    secondary: {
      main: "#f50057", // Rosa vibrante pero equilibrado
      light: "#ff4081", // Rosa claro para hover o estados activos
      dark: "#c51162", // Un tono más profundo para sombras o acentos
      contrastText: "#fff", // Blanco para mantener la legibilidad
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label": {
            color: "#fefefe",
          },
          "& .MuiInputBase-input": {
            color: "#fefefe",
            fontSize: "30px",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "transparent",
            },
            "&:hover fieldset": {
              borderColor: "transparent",
            },
            "&.Mui-focused fieldset": {
              borderColor: "transparent",
            },
          },
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        rail: {
          backgroundColor: "#ffffff",
        },
        thumb: {
          backgroundColor: "#e1e0e0",
        },
        track: {
          backgroundColor: "#e1e0e0",
        },
      },
    },
  },
});
