import { AppBar, Toolbar, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export const Header = () => {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <SearchIcon />
        </Toolbar>
      </AppBar>
    </Box>
  );
};
