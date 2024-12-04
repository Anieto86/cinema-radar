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
  Button,
} from "@mui/material";
import HideImageOutlinedIcon from "@mui/icons-material/HideImageOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

interface FavoritesMoviesProps {
  favorites: { Poster: string; Title: string; imdbID: string }[];
  handleRemoveFavorite: (id: string) => void;
  handleShowFavorite: (id: string, flag: boolean) => void;
}

export const FavoritesMovies: React.FC<FavoritesMoviesProps> = ({
  favorites,
  handleRemoveFavorite,
  handleShowFavorite,
}) => {
  return (
    <Grid
      container
      spacing={1}
      sx={{
        mt: 2,
        padding: 3,
        boxShadow: 3,
        bgcolor: "#fafafa",
        borderRadius: 3,
      }}
    >
      <Grid item xs={12} textAlign="center">
        {favorites.length > 0 && (
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
                  height: "100%",
                  // objectFit: "cover",
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
                }}
              >
                <HideImageOutlinedIcon
                  sx={{ fontSize: "200px", color: "#9e9e9e" }}
                />
              </Box>
            )}
            <CardContent
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography
                textAlign="center"
                variant="body1"
                sx={{ color: "text.secondary" }}
              >
                {fav.Title}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "space-between", p: 2 }}>
              <Button
                aria-label="show more"
                onClick={() => handleShowFavorite(fav.imdbID, true)}
              >
                Show More
              </Button>
              <IconButton
                aria-label="delete"
                onClick={() => handleRemoveFavorite(fav.imdbID)}
                sx={{ color: "error.main" }}
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
