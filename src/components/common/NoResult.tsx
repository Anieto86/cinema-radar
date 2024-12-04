import { Grid, Typography } from "@mui/material";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";

export const NoResult = () => {
  return (
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
        <Typography variant="h5">Please try again</Typography>
      </Grid>
      <Grid item style={{ fontSize: 70 }}>
        🤦‍♂️
      </Grid>
      <Grid item>
        <InfoRoundedIcon sx={{ fontSize: "100px" }} />
      </Grid>
    </Grid>
  );
};
