import {
  AppBar,
  Toolbar,
  Grid,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

import { YearSlider } from './YearSlider';
// import { TypeSelect } from './TypeSelect';

interface IProp {
  searchMovie: string;
  searchType: string;
  onSearchMovie: (searchMovie: string) => void;
  onSearchMovieType: (searchType: string) => void;
}

export const Header = ({
  searchMovie,
  onSearchMovie,
  searchType,
  onSearchMovieType,
}: IProp) => {
  return (
    <AppBar position="static" sx={{ bgcolor: '#666666', height: '120px' }}>
      <Toolbar>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          wrap="nowrap"
          sx={{ p: 1, mt: 2 }}
        >
          <Grid item xs={6}>
            <TextField
              id="search-movie"
              InputProps={{
                startAdornment: <SearchIcon />,
              }}
              value={searchMovie}
              onChange={(e) => onSearchMovie(e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <YearSlider />
          </Grid>
          <Grid item xs={3}>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                TYPE
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={searchType}
                onChange={(e) => onSearchMovieType(e.target.value)}
              >
                <FormControlLabel value="any" control={<Radio />} label="Any" />
                <FormControlLabel
                  value="movie"
                  control={<Radio />}
                  label="Movies"
                />
                <FormControlLabel
                  value="series"
                  control={<Radio />}
                  label="Series"
                />
                <FormControlLabel
                  value="episode"
                  control={<Radio />}
                  label="Episodes"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
