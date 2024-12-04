import { Divider, Grid, Typography } from "@mui/material";

interface PlotProps {
  movieDescription: string;
}

export const MoviePlot = ({ movieDescription }: PlotProps) => {
  return (
    <Grid
      sx={{
        my: 6,
        p: 4,
        bgcolor: "#f9fafb",
        borderRadius: 3,
        boxShadow: 3,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{
          color: "#111827", // Color oscuro para el título
          mb: 2,
          textTransform: "uppercase", // Hace el título en mayúsculas
        }}
      >
        Plot
      </Typography>
      <Divider sx={{ mb: 2, bgcolor: "#ddd" }} />
      <Typography
        variant="body1"
        textAlign="justify"
        sx={{
          color: "#4b5563", // Color gris suave para el texto
          lineHeight: 1.6, // Mejora la legibilidad
          fontSize: "1rem",
          letterSpacing: "0.5px", // Añadir un poco de espaciado entre letras
        }}
      >
        {movieDescription}
      </Typography>
    </Grid>
  );
};
