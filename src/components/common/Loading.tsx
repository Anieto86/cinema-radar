import { Grid, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

export const Loading = () => {
  return (
    <Grid
      container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 30,
      }}
    >
      <CircularProgress color="secondary" />
      <Typography variant="h4">Loading...</Typography>
    </Grid>
  );
};
