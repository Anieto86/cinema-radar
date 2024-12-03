import React from "react";
import {
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Box,
} from "@mui/material";
import HideImageOutlinedIcon from "@mui/icons-material/HideImageOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

interface FavoritesMoviesProps {
  favorites: { Poster: string; Title: string; imdbID: string }[];
  handleRemoveFavorite: (id: string) => void;
}

export const FavoritesMovies: React.FC<FavoritesMoviesProps> = ({
  favorites,
  handleRemoveFavorite,
}) => {
  return (
    <Grid container spacing={3} sx={{ my: 4 }} justifyContent="center">
      <Grid item xs={12} textAlign="center">
        {favorites.length !== 0 && (
          <Typography variant="h4" fontWeight={600} gutterBottom>
            My List
          </Typography>
        )}
      </Grid>

      {favorites.map((fav, i) => (
        <Grid item key={i} xs={12} sm={6} md={4} lg={3}>
          <Card
            sx={{
              maxWidth: 345,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              borderRadius: 2,
              boxShadow: 3,
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: 6,
              },
            }}
          >
            {fav.Poster !== "N/A" ? (
              <CardMedia
                component="img"
                src={fav.Poster}
                alt="movie-poster"
                sx={{
                  borderRadius: "5px 5px 0 0",
                  minHeight: "400px",
                  objectFit: "cover",
                }}
              />
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "400px",
                  bgcolor: "#e0e0e0",
                  borderRadius: "5px 5px 0 0",
                }}
              >
                <HideImageOutlinedIcon
                  sx={{ fontSize: "200px", color: "#9e9e9e" }}
                />
              </Box>
            )}
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography textAlign="center" fontWeight={500}>
                {fav.Title}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <IconButton
                aria-label="delete"
                onClick={() => handleRemoveFavorite(fav.imdbID)}
              >
                <DeleteIcon fontSize="inherit" color="error" />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
