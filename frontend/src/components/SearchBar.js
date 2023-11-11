import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';
import LeftDrawer from '../pages/LeftDrawer';
import { useStateContext } from '../context/context';
import { ColorRing } from 'react-loader-spinner';
import ClearIcon from '@mui/icons-material/Clear';

const SearchBar = () => {
  const { fetchJournals, fetchSearchedJournals } = useStateContext();

  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);

  const onSearchClick = async () => {
    try {
      setLoading(true);
      await fetchSearchedJournals(searchValue);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const onClearClick = async () => {
    setSearchValue('');
    try {
      await fetchJournals();
    } catch (err) {
      console.log(err);
    }
  }

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearchClick();
    }
  };

  return (
    <>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search Journal"
        value={searchValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton>
                <LeftDrawer />
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
                <IconButton onClick={onClearClick}><ClearIcon/></IconButton>
              <IconButton onClick={onSearchClick}>
                <Search />
              </IconButton>
              {loading && (
                  <ColorRing
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                  />
                )}
            </InputAdornment>
          ),
        }}
      />
      <br />
    </>
  );
};

export default SearchBar;
