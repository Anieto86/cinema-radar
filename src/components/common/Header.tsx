import { AppBar, Toolbar, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

import { YearSlider } from './YearSlider';
import { TypeSelect } from './TypeSelect';

export const Header = ({
  searchMovie,
  setSearchMovie,
}: {
  searchMovie: string;
  setSearchMovie: (searchMovie: string) => void;
}) => {
  const handleSearchMovie = (value: string) => {
    setSearchMovie(value);
  };

  return (
    <AppBar position="static" sx={{ bgcolor: '#666666', height: '100px' }}>
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={6}>
            <TextField
              id="search-movie"
              InputProps={{
                startAdornment: <SearchIcon />,
              }}
              value={searchMovie}
              onChange={(e) => handleSearchMovie(e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <YearSlider />
          </Grid>
          <Grid item xs={3}>
            <TypeSelect />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
