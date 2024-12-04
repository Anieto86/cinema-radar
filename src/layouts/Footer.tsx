import { Box, Typography, Link, IconButton, Grid } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import { CinemaRadarIcon } from "../assets/Icon/CinemaRadarIcon";

export const Footer = () => {
  return (
    <Grid
      container
      justifyContent="space-evenly"
      alignItems="center"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light" ? "#444" : "#0d47a1",
        color: (theme) => theme.palette.primary.contrastText,
      }}
    >
      <Grid item>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <CinemaRadarIcon />
          <Typography variant="h6">Cinema Radar</Typography>{" "}
        </Grid>
      </Grid>
      <Grid item>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <IconButton
            aria-label="GitHub"
            href="https://github.com/your-profile"
            target="_blank"
            rel="noopener"
            sx={{ color: "inherit", mx: 1 }}
          >
            <GitHubIcon fontSize="large" />
          </IconButton>
          <IconButton
            aria-label="LinkedIn"
            href="https://www.linkedin.com/in/your-profile"
            target="_blank"
            rel="noopener"
            sx={{ color: "inherit", mx: 1 }}
          >
            <LinkedInIcon fontSize="large" />
          </IconButton>
          <IconButton
            aria-label="Twitter"
            href="https://twitter.com/your-profile"
            target="_blank"
            rel="noopener"
            sx={{ color: "inherit", mx: 1 }}
          >
            <TwitterIcon fontSize="large" />
          </IconButton>
        </Box>
        <Typography variant="body2" align="center" sx={{ mb: 1 }}>
          © {new Date().getFullYear()} Cinema Radar. All rights reserved.
        </Typography>
        <Typography variant="body2" align="center">
          {"Built with "}
          <Link color="inherit" href="https://reactjs.org/">
            React
          </Link>
          {" and "}
          <Link color="inherit" href="https://mui.com/">
            Material UI
          </Link>
          {"."}
        </Typography>
      </Grid>
    </Grid>
  );
};
