import { Grid, Typography, Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

interface MovieRatingsProps {
  Ratings: { Source: string; Value: string }[];
}

export const MovieRatings = ({ Ratings }: MovieRatingsProps) => {
  const parseRatingValue = (value: string): number => {
    if (value.includes("/")) {
      const [numerator, denominator] = value.split("/").map(Number);
      return (numerator / denominator) * 5;
    } else if (value.includes("%")) {
      return (parseFloat(value) / 100) * 5;
    } else {
      return parseFloat(value);
    }
  };
  return (
    <Grid
      container
      spacing={2}
      direction="row"
      justifyContent="space-around"
      alignItems="center"
      sx={{ mt: 4 }}
    >
      {Ratings?.length > 0 &&
        Ratings.map(({ Value, Source }, i) => (
          <Grid
            item
            key={i}
            sx={{
              bgcolor: "#fafafa",
              borderRadius: "12px",
              padding: 3,
              boxShadow: 3,
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              minHeight: "150px",
              minWidth: "150px",
            }}
          >
            {/* Icon or Rating Stars */}
            <Grid item sx={{ mb: 2 }}>
              <Rating
                name={`rating-${i}`}
                value={parseRatingValue(Value)}
                readOnly
                precision={0.5}
                size="large"
                icon={<StarIcon fontSize="inherit" />}
                emptyIcon={
                  <StarIcon sx={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
            </Grid>
            <Typography variant="h6" color="primary">
              {Value}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {Source}
            </Typography>
          </Grid>
        ))}
    </Grid>
  );
};
