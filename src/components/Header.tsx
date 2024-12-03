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
} from "@mui/material";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";

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
    <AppBar
      position="static"
      sx={{
        bgcolor: "#444",
        height: "150px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
        padding: "10px 20px",
      }}
    >
      <Toolbar>
        <Typography
          variant="h4"
          component="div"
          sx={{
            flexGrow: 1,
            color: "#fff",
            fontWeight: "bold",
            letterSpacing: "2px",
          }}
        >
          Cinema Radar
        </Typography>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          wrap="nowrap"
          sx={{ p: 2 }}
        >
          {/* Search Input */}
          <Grid item xs={5}>
            <TextField
              id="search-movie"
              placeholder="Search for a movie..."
              InputProps={{
                startAdornment: (
                  <SearchIcon
                    sx={{
                      fontSize: 40,
                      mr: 1,
                      color: theme.palette.secondary.main,
                    }}
                  />
                ),
                style: { color: "#fff", fontSize: "18px" },
              }}
              defaultValue={movie}
              onBlur={(e) => onSearchMovie(e.target.value)}
              autoFocus
              fullWidth
              sx={{
                backgroundColor: "#555",
                borderRadius: "5px",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
            />
          </Grid>

          {/* Year Selector */}
          <Grid item xs={3}>
            <Typography
              sx={{
                color: theme.palette.secondary.main,
                fontSize: "20px",
                fontWeight: "bold",
                mb: 1,
              }}
            >
              YEAR
            </Typography>
            <Stack
              spacing={2}
              direction="row"
              alignItems="center"
              sx={{
                "& .MuiSlider-root": {
                  color: primary,
                },
              }}
            >
              <Typography variant="h6" color="secondary">
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
                  "& .MuiSlider-thumb": {
                    bgcolor: primary,
                    "&:hover, &:focus-visible": {
                      boxShadow: `0 0 0 8px rgba(0, 0, 0, 0.16)`,
                    },
                  },
                }}
              />
              <Typography variant="h6" color="secondary">
                {year?.at(1)?.toString()}
              </Typography>
            </Stack>
          </Grid>

          {/* Type Selector */}
          <Grid item xs={3}>
            <FormControl>
              <FormLabel
                id="demo-row-radio-buttons-group-label"
                sx={{
                  color: theme.palette.secondary.main,
                  fontSize: "20px",
                  fontWeight: "bold",
                  mb: 1,
                }}
              >
                TYPE
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={type}
                onChange={(e) => onSearchMovieType(e.target.value)}
              >
                <FormControlLabel
                  value=""
                  control={
                    <Radio
                      sx={{
                        color: theme.palette.secondary.main,
                        "&.Mui-checked": { color: primary },
                      }}
                    />
                  }
                  label="Any"
                />
                <FormControlLabel
                  value="movie"
                  control={
                    <Radio
                      sx={{
                        color: theme.palette.secondary.main,
                        "&.Mui-checked": { color: primary },
                      }}
                    />
                  }
                  label="Movies"
                />
                <FormControlLabel
                  value="series"
                  control={
                    <Radio
                      sx={{
                        color: theme.palette.secondary.main,
                        "&.Mui-checked": { color: primary },
                      }}
                    />
                  }
                  label="Series"
                />
                <FormControlLabel
                  value="episode"
                  control={
                    <Radio
                      sx={{
                        color: theme.palette.secondary.main,
                        "&.Mui-checked": { color: primary },
                      }}
                    />
                  }
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
