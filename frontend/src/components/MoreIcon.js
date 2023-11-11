import React, { useState } from 'react';
import { Box, IconButton, Popover, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CustomButton from './CustomButton';
import { useStateContext } from '../context/context';

const MoreIcon = ({ label }) => {
  const { deleteLabel, editLabel, addEntryToLabel } = useStateContext();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    try {
      await deleteLabel(label.id);
    } catch (err) {
      console.error(err);
    } finally {
      handleClose();
    }
  };

  const handleEdit = async () => {
    // Implement the logic to edit the label name
    handleClose();
  };

  const handleAddEntry = async () => {
    // Implement the logic to add an entry to the label
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box p={2} minWidth={200}>
          <Typography variant="h6" gutterBottom className='text-center uppercase'> 
            {label.name}
          </Typography>
          <CustomButton variant="contained" onClick={handleDelete} fullWidth className='mb-1'>
            Delete Label
          </CustomButton>
          <CustomButton onClick={handleEdit} variant="contained" fullWidth className='mb-1'>
            Edit Label
          </CustomButton>
          <CustomButton onClick={handleAddEntry} variant="contained" fullWidth className='mb-1'>
            Add Entry to Label
          </CustomButton>
        </Box>
      </Popover>
    </>
  );
};

export default MoreIcon;
