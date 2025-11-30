import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';

import Movie from '@mui/icons-material/Movie';
import TV from '@mui/icons-material/Tv'
import SearchIcon from '@mui/icons-material/Search';

export default function MyBottomNav() {
  const [value, setValue] = useState(0);

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => setValue(newValue)}
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
    >
      <BottomNavigationAction label="Movies" icon={<Movie />} component={Link} to="/movies" />
      <BottomNavigationAction label="TV Series" icon={<TV />} component={Link} to="/tvseries" />
      <BottomNavigationAction label="Search" icon={<SearchIcon />} component={Link} to="/search" />
    </BottomNavigation>
  );
}