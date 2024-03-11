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
  onSearchYear: (event: Event | null, newValue: number[]) => void;
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

  return (
    <AppBar position="static" sx={{ bgcolor: '#666666', height: '130px' }}>
      <Toolbar>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          alignContent="center"
          wrap="nowrap"
          sx={{ p: 1, mt: 1 }}
        >
          <Grid item xs={5}>
            <TextField
              id="search-movie"
              InputProps={{
                startAdornment: (
                  <SearchIcon color="primary" sx={{ fontSize: 50, mr: 2 }} />
                ),
              }}
              value={movie}
              onChange={(e) => onSearchMovie(e.target.value)}
              autoFocus
            />
          </Grid>
          <Grid item xs={2}>
            <Typography color="primary" sx={{ fontSize: '25px' }}>
              YEAR
            </Typography>
            <Stack
              spacing={3}
              direction="row"
              sx={{ mb: 1 }}
              alignItems="center"
            >
              <Typography color="primary" variant="h6">
                {year?.at(0)?.toString()}
              </Typography>
              <Slider
                value={year}
                min={1895}
                max={2024}
                onChange={(_event, newValue) =>
                  onSearchYear(null, newValue as number[])
                }
                valueLabelDisplay="auto"
                sx={{
                  height: '30%',
                }}
              />
              <Typography color="primary" variant="h6">
                {year?.at(1)?.toString()}
              </Typography>
            </Stack>
          </Grid>

          <Grid
            item
            xs={3}
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <FormControl>
              <FormLabel
                id="demo-row-radio-buttons-group-label"
                sx={{ color: primary, fontSize: '25px' }}
              >
                TYPE
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={type}
                onChange={(e) => onSearchMovieType(e.target.value)}
                sx={{ color: primary }}
              >
                <FormControlLabel
                  value={''}
                  control={<Radio sx={{ color: primary }} />}
                  label="Any"
                />
                <FormControlLabel
                  color="primary"
                  value="movie"
                  control={<Radio sx={{ color: primary }} />}
                  label="Movies"
                />
                <FormControlLabel
                  value="series"
                  control={<Radio sx={{ color: primary }} />}
                  label="Series"
                />
                <FormControlLabel
                  value="episode"
                  control={<Radio sx={{ color: primary }} />}
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
