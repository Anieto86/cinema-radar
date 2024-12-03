import { Grid, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export const Loading = () => {
  return (
    <Grid
      container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Centramos verticalmente ocupando toda la pantalla
        bgcolor: "#f4f4f4", // Fondo suave
      }}
    >
      <CircularProgress
        color="secondary"
        size={80}
        thickness={4}
        sx={{
          mb: 3,
        }}
      />
      <Typography
        variant="h4"
        sx={{
          color: "#555", // Color del texto
          fontWeight: "bold",
          letterSpacing: "1px",
          textTransform: "uppercase",
        }}
      >
        Loading...
      </Typography>
    </Grid>
  );
};
