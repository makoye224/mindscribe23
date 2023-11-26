import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import MoreIconModal from './MoreIconModal';
import { NavLink } from 'react-router-dom';
import { useStateContext } from '../context/context';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import jn from '../media/jn.gif'

export const JournalEntry = ({entry}) => {

  const {
    fetchJournals,
    updateEntry,
   } = useStateContext();

  // State for tracking whether the journal is bookmarked
  const [isBookmarked, setIsBookmarked] = useState(entry?.is_bookmarked || false);
  const [isFavorite, setIsFavorite] = useState(entry?.is_favorite || false);
  // State for controlling the visibility of the modal
  const [modalShow, setModalShow] = React.useState(false);

  // Function to handle the bookmark click
  const handleBookmarkClick = async() => {
    setIsBookmarked(!isBookmarked);
    let val = '';
    if(!isBookmarked){
      val = 'true';
    }
    else{
      val = 'false'
    }
    const payload = {
      is_bookmarked: val,
    }
    try{
      await updateEntry(entry.id, entry, payload)
      fetchJournals()
    }catch(err){
      console.log(err)
    }
  };

  // Function to handle the "more" icon click
  const handleMoreIconClick = () => {
    setModalShow(true);
  };
  
// Function to close the modal 
  const handleCloseModal = () => {
    setModalShow(false);
  };

  const handleFavoriteClick =async()=>{
    setIsFavorite(!isFavorite)
    let val = '';
    if(!isFavorite){
      val = 'true';
    }
    else{
      val = 'false'
    }
    const payload = {
      is_favorite: val,
    }
    try{
      await updateEntry(entry.id, entry, payload)
    
      fetchJournals()
    }catch(err){
      console.log(err)
    }
  }
  const len = ()=>{
    if (entry?.contents?.length > 84){
      return 80;
    }
    else if(entry?.contents?.length === 0){
      return 0
    }
    else{
      return entry?.contents?.length - 4
    }
  }

  return (
    <>
    <div className='shadow-2xl'>
    <Card sx={{ position: 'relative'}}>
   
      <NavLink to={`/editor/${entry?.id}`}>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16/9',
            backgroundImage: `url(https://shorturl.at/bjvD0)`,
            backgroundSize: 'cover',
          }}
        >
          <p className='text-white py-11 px-2'>
           {entry?.contents?.substring(3, len())}
          </p>
        </Box>
        </NavLink>
        <CardContent >
          <Box display="flex" justifyContent="space-between" alignItems="center">
          <NavLink to={`/editor/${entry.id}`} style={{ textDecoration: 'none', color:'black' }}>
            <Typography gutterBottom variant="p" component="div" >
              {entry?.title}
            </Typography>
            </NavLink>
            <Button variant="text" style={{ color: 'black' }} onClick={handleMoreIconClick}>
              <MoreVertIcon />
            </Button>
          </Box>
        </CardContent>
        <Box
          sx={{
            position: 'absolute',
            top: '8px',
            left: '8px',
            zIndex: '1',
          }}
        >
          
          <Box onClick={handleFavoriteClick} style={{cursor: 'pointer'}}>
            {isFavorite ?<FavoriteIcon /> : <FavoriteBorderIcon /> }
          </Box>
        </Box>

        <Box
          sx={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            zIndex: '1',
          }}
        >
          
          <Box onClick={handleBookmarkClick} style={{cursor: 'pointer'}}>
            {isBookmarked ?<BookmarkIcon /> : <TurnedInNotIcon /> }
          </Box>
        </Box>
      </Card>

      <MoreIconModal show={modalShow} onHide={handleCloseModal} journal = {entry}/>
   </div>
    </>
  );
};
