import { Button, Typography } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { MovieType } from '../../hook/useFetchMovie';

interface IProp {
  imdbID: string;
  watchlist: { [imdbID: string]: boolean };
  handleWatchlist: (
    updateFunction: (prevWatchlist: { [x: string]: boolean }) => {
      [imdbID: string]: boolean;
    }
  ) => void;
  addFavorite: (movie: MovieType) => void;
  favorites: MovieType[];
  removeFavorite: (imdbID: string) => void;
}

export const WatchList = ({
  imdbID,
  watchlist,
  handleWatchlist,
  addFavorite,
  favorites,
  removeFavorite,
}: IProp) => {
  const handleToggle = () => {
    handleWatchlist((prevWatchlist: { [x: string]: boolean }) => {
      const updatedWatchlist = {
        ...prevWatchlist,
        [imdbID]: !prevWatchlist[imdbID],
      };

      window.localStorage.setItem(
        'WATCHLIST_STORAGE',
        JSON.stringify(updatedWatchlist)
      );

      return updatedWatchlist;
    });

    const updatedValue = watchlist[imdbID];

    if (updatedValue) {
      removeFavorite(imdbID);
    } else {
      addFavorite(favorites as unknown as MovieType);
    }
  };

  return (
    <Button
      variant="outlined"
      color="secondary"
      size="large"
      sx={{
        p: 2,
        border: '1px solid',
        borderRadius: '5px',
        fontWeight: 600,
      }}
      onClick={handleToggle}
      startIcon={watchlist[imdbID] ? <BookmarkIcon /> : <BookmarkBorderIcon />}
    >
      <Typography variant="h5" fontWeight={500}>
        Watchlist
      </Typography>
    </Button>
  );
};
