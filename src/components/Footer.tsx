import React from "react";
import { Box, Typography, Link, Container, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.primary.light
            : theme.palette.primary.dark,
        color: (theme) => theme.palette.primary.contrastText,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body1" align="center">
          © {new Date().getFullYear()} Cinema Radar. All rights reserved.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
          <IconButton
            aria-label="GitHub"
            href="https://github.com/your-profile"
            target="_blank"
            rel="noopener"
            sx={{ color: "inherit" }}
          >
            <GitHubIcon />
          </IconButton>
          <IconButton
            aria-label="LinkedIn"
            href="https://www.linkedin.com/in/your-profile"
            target="_blank"
            rel="noopener"
            sx={{ color: "inherit" }}
          >
            <LinkedInIcon />
          </IconButton>
          <IconButton
            aria-label="Twitter"
            href="https://twitter.com/your-profile"
            target="_blank"
            rel="noopener"
            sx={{ color: "inherit" }}
          >
            <TwitterIcon />
          </IconButton>
        </Box>
        <Typography variant="body2" align="center" sx={{ mt: 1 }}>
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
      </Container>
    </Box>
  );
};

export default Footer;
