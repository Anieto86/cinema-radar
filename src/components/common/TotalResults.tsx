import { Grid, Typography } from "@mui/material";

interface TotalResultsProps {
  totalResult: number;
}

export const TotalResults = ({ totalResult }: TotalResultsProps) => {
  return (
    <Grid
      item
      xs={12}
      sx={{
        m: 5,
        bgcolor: "background.paper",
        borderRadius: 2,
        p: 3,
        boxShadow: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          fontSize: "1.5rem",
          letterSpacing: 1.2,
          textAlign: "center",
          textTransform: "uppercase",
          display: "inline-block",
        }}
      >
        {totalResult} <span style={{ fontWeight: 700 }}>RESULTS</span>
      </Typography>
    </Grid>
  );
};
