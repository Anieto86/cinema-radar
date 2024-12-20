import React, { Fragment } from "react";
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemButton,
  CardMedia,
} from "@mui/material";
import HideImageOutlinedIcon from "@mui/icons-material/HideImageOutlined";
import { TotalResults } from "../components/common/TotalResults";

import styled from "@emotion/styled";

interface IProp {
  movies: { Title: string; Year: string; Poster: string; imdbID: string }[];
  totalResult: number;
  selectMovie: number | null;
  onSelectMovie: (index: number) => void;
}

export const MovieList: React.FC<IProp> = ({
  movies,
  totalResult,
  selectMovie,
  onSelectMovie,
}) => {
  return (
    <CustomScrollbar>
      <TotalResults totalResult={totalResult} />
      <List sx={{ width: "100%", height: "auto" }}>
        {movies?.map((m, i: number) => (
          <Fragment key={m.imdbID}>
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
                  backgroundColor:
                    selectMovie === i ? "#e0f7fa" : "background.paper",
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
        ))}
      </List>
    </CustomScrollbar>
  );
};

export const CustomScrollbar = styled("div")({
  borderRight: "1px solid #c4c4c4",
  overflowY: "scroll",
  overflowX: "hidden",
  maxHeight: "calc(180vh - 10px)",
  scrollbarColor: "#c4c4c4 transparent",
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#c4c4c4",
    borderRadius: "4px",
  },
});
