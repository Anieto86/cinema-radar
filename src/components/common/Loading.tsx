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
        height: "100vh",
        bgcolor: "#f4f4f4",
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
          color: "#555",
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
