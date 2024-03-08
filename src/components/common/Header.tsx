import {
  AppBar,
  Toolbar,
  Grid,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Slider,
  Typography,
  Stack,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';

interface IProp {
  movie?: string;
  type?: string;
  year?: number[];
  onSearchMovie: (searchMovie: string) => void;
  onSearchMovieType: (searchType: string) => void;
  onSearchYear: (searchYear: number) => void;
}

export const Header = ({
  movie,
  type,
  year,
  onSearchMovie,
  onSearchMovieType,
  onSearchYear,
}: IProp) => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;

  function valuetext(value: number) {
    return `${value}°C`;
  }

  return (
    <AppBar position="static" sx={{ bgcolor: '#666666', height: '130px' }}>
      <Toolbar>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          wrap="nowrap"
          sx={{ p: 1, mt: 1 }}
        >
          <Grid item xs={4} sx={{ border: '1px solid #ff0505' }}>
            <TextField
              id="search-movie"
              InputProps={{
                startAdornment: (
                  <SearchIcon color="primary" sx={{ fontSize: 50, mr: 2 }} />
                ),
              }}
              value={movie ?? null}
              onChange={(e) => onSearchMovie(e.target.value)}
            />
          </Grid>
          <Grid item xs={2} sx={{ border: '1px solid #ff0505' }}>
            <Typography color="primary">YEAR</Typography>
            <Stack
              spacing={3}
              direction="row"
              sx={{ mb: 1 }}
              alignItems="center"
            >
              <Typography color="primary">{year?.at(0)?.toString()}</Typography>
              <Slider
                value={year}
                // onChange={(newValue) => onSearchYear(newValue)}
                min={2000}
                max={2005}
                // getAriaLabel={() => 'Temperature range'}
                onChange={onSearchYear}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                sx={{ height: '30%' }}
              />
              <Typography color="primary">{year?.at(1)?.toString()}</Typography>
            </Stack>
          </Grid>

          <Grid
            item
            xs={3}
            // md={6}
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              border: '1px solid #000000',
            }}
          >
            <FormControl>
              <FormLabel
                id="demo-row-radio-buttons-group-label"
                sx={{ color: primary }}
              >
                TYPE
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                // sx={{ flexWrap: 'nowrap' }}
                value={type}
                onChange={(e) => onSearchMovieType(e.target.value)}
              >
                <FormControlLabel
                  value={''}
                  control={<Radio sx={{ color: primary }} />}
                  label="Any"
                  sx={{ color: primary }}
                />
                <FormControlLabel
                  color="primary"
                  value="movie"
                  control={<Radio sx={{ color: primary }} />}
                  label="Movies"
                  sx={{ color: primary }}
                />
                <FormControlLabel
                  value="series"
                  control={<Radio sx={{ color: primary }} />}
                  label="Series"
                  sx={{ color: primary }}
                />
                <FormControlLabel
                  value="episode"
                  control={<Radio sx={{ color: primary }} />}
                  label="Episodes"
                  sx={{ color: primary }}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
