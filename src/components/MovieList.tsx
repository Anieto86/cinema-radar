import {
  CardMedia,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import HideImageOutlinedIcon from "@mui/icons-material/HideImageOutlined";
import { Search } from "../hook/useFetch";
import { Fragment } from "react/jsx-runtime";
import { styled } from "@mui/system";
import SearchOffIcon from "@mui/icons-material/SearchOff";

interface IProp {
  selectMovie: number;
  movies: Search[];
  totalResult: number;
  onSelectMovie: (i: number) => void;
}

export const MovieList = ({
  movies,
  totalResult,
  selectMovie,
  onSelectMovie,
}: IProp) => {
  return (
    <CustomScrollbar>
      <Grid item xs={12} sx={{ m: 5 }}>
        <Typography variant="h6">{totalResult} RESULTS</Typography>
      </Grid>
      {totalResult ? (
        <Grid container spacing={2} sx={{ p: 2 }}>
          <List sx={{ width: "100%" }}>
            {movies?.map((m, i: number) => {
              return (
                <Fragment key={m.imdbID}>
                  {i !== 0 && (
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                  )}

                  <ListItemButton onClick={() => onSelectMovie(i)}>
                    <ListItem
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        p: 2,
                        borderRadius: 2,
                        boxShadow: 1,
                        transition: "transform 0.3s, box-shadow 0.3s",
                        backgroundColor: selectMovie === i ? "#e0f7fa" : "#fff",
                        "&:hover": {
                          transform: "scale(1.02)",
                          boxShadow: 3,
                        },
                      }}
                    >
                      <Grid container spacing={2} alignItems="center">
                        <Grid item lg={3} md={4} xs={12}>
                          {m.Poster !== "N/A" ? (
                            <CardMedia
                              component="img"
                              src={m.Poster}
                              alt="movie-poster"
                              sx={{
                                borderRadius: 2,
                                height: "150px",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            <HideImageOutlinedIcon sx={{ fontSize: "95px" }} />
                          )}
                        </Grid>
                        <Grid item lg={9} md={8} xs={12}>
                          <Typography variant="h5" fontWeight={600}>
                            {m.Title}
                          </Typography>
                          <Typography variant="h6" color="textSecondary">
                            {m.Year}
                          </Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                  </ListItemButton>
                </Fragment>
              );
            })}
          </List>
        </Grid>
      ) : (
        <Grid
          container
          display="flex"
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
          sx={{ p: 2, my: 2, height: "100vh" }}
        >
          <Grid item>
            <SearchOffIcon sx={{ fontSize: "100px" }} />
          </Grid>
          <Grid item>
            <Typography variant="h5">No Results found</Typography>
          </Grid>
        </Grid>
      )}
    </CustomScrollbar>
  );
};

export const CustomScrollbar = styled("div")({
  borderRight: "1px solid #c4c4c4",
  overflowY: "scroll",
  overflowX: "hidden",
  maxHeight: "calc(200vh - 10px)",
  scrollbarColor: "#c4c4c4 transparent",
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#c4c4c4",
    borderRadius: "4px",
  },
});
