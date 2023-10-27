import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import MoreIconModal from './MoreIconModal';
import { NavLink } from 'react-router-dom';
import { useStateContext } from '../context/context';

export const JournalEntry = ({entry}) => {

  const {
    fetchJournals,
    updateEntry,
   } = useStateContext();

  // State for tracking whether the journal is bookmarked
  const [isBookmarked, setIsBookmarked] = useState(entry?.is_bookmarked || false);
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


  return (
    <>
    
    
      <Card sx={{ position: 'relative' }}>
   
      <NavLink to={`/editor/${entry?.id}`}>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16/9',
            backgroundColor: '#F0F0F0',
          }}
        >
        </Box>
        </NavLink>
        <CardContent>
       
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
            right: '8px',
            zIndex: '1',
          }}
        >
          {/* Bookmark Icon (Toggle between Bookmark and TurnedInNot) */}
          
          <Box onClick={handleBookmarkClick} style={{cursor: 'pointer'}}>
            {isBookmarked ?<BookmarkIcon /> : <TurnedInNotIcon /> }
          </Box>
        </Box>
      </Card>

      <MoreIconModal show={modalShow} onHide={handleCloseModal} journal = {entry}/>
   
    </>
  );
};
