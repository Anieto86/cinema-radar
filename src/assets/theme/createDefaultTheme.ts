import { createTheme } from "@mui/material";
import "@fontsource-variable/onest";
export const theme = createTheme({
  palette: {
    primary: {
      main: "#ff9800", // Color principal del icono
      light: "#ffb74d", // Color más claro
      dark: "#f57c00", // Color más oscuro
      contrastText: "#fff", // Texto en contraste
    },
    secondary: {
      main: "#2196f3", // Nuevo color secundario (azul)
      light: "#64b5f6", // Color más claro
      dark: "#1976d2", // Color más oscuro
      contrastText: "#fff", // Texto en contraste
    },
  },
  typography: {
    fontFamily: "Onest Variable, sans-serif",
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
