import React from "react";
import {
  Grid,
  Typography,
  Card,
  CardMedia,
  CardActions,
  IconButton,
  Box,
  Button,
  CardHeader,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, A11y } from "swiper/modules";

interface FavoritesMoviesProps {
  favorites: {
    Poster: string;
    Title: string;
    imdbID: string;
    Released: string;
  }[];
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
      display="flex"
      justifyContent="center"
      alignContent="center"
      sx={{
        mt: 10,
        padding: 3,
        boxShadow: 3,
        bgcolor: "#fafafa",
        borderRadius: 3,
        height: "auto",
      }}
    >
      <Grid item xs={12} textAlign="center" mt={3}>
        {favorites.length > 0 && (
          <Typography variant="h4" fontWeight={600} gutterBottom>
            My List
          </Typography>
        )}
      </Grid>

      <Swiper
        modules={[Pagination, A11y]}
        spaceBetween={50}
        slidesPerView={3}
        pagination={{ clickable: true }}
        style={{ width: "100%" }}
      >
        {favorites.map((fav, i) => (
          <SwiperSlide key={`${fav.imdbID}-${i}`}>
            <Card
              sx={{
                maxWidth: 345,
                height: "100%",
                minHeight: "400px",
                display: "flex",
                flexDirection: "column",
                borderRadius: 2,
                // transition: "transform 0.3s, box-shadow 0.3s",
                // "&:hover": {
                //   transform: "scale(1.05)",
                //   boxShadow: 6,
                // },
              }}
            >
              <CardHeader title={fav.Title} subheader={fav.Released} />
              {fav.Poster !== "N/A" ? (
                <CardMedia
                  component="img"
                  src={fav.Poster}
                  alt="movie-poster"
                  sx={{
                    height: 300,
                    objectFit: "cover",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: 6,
                    },
                  }}
                />
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 260,
                    bgcolor: "#e0e0e0",
                  }}
                >
                  <DeleteIcon sx={{ fontSize: "100px", color: "#9e9e9e" }} />
                </Box>
              )}
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
          </SwiperSlide>
        ))}
      </Swiper>
    </Grid>
  );
};

export default FavoritesMovies;
