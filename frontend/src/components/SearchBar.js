import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material'; // Change this import
import { Search} from '@mui/icons-material'; // Change this import
import LeftDrawer from '../pages/LeftDrawer';

const SearchBar = ({ onClearClick, onSearchClick }) => {
  return (
    <><TextField
          fullWidth
          variant="outlined"
          placeholder="Search Journal"
          InputProps={{
              startAdornment: (
                  <InputAdornment position="start">
                      <IconButton onClick={onClearClick}>
                          <LeftDrawer />
                      </IconButton>
                  </InputAdornment>
              ),
              endAdornment: (
                  <InputAdornment position="end">
                      <IconButton onClick={onSearchClick}>
                          <Search />
                      </IconButton>
                  </InputAdornment>
              ),
          }} /><br /></>
  );
};

export default SearchBar;
