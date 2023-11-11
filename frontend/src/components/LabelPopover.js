import React, { useState } from 'react';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useStateContext } from '../context/context';
import { toast } from 'react-toastify';
import { ColorRing } from 'react-loader-spinner';

function LabelPopover({ anchorEl, onClose, open }) {
  const [entry, setEntry] = useState('');
  const [loading, setLoading] = useState(false);
  const { createLabel, fetchLabels } = useStateContext();

  const handleEntryChange = (e) => {
    setEntry(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await Promise.all([createLabel(entry)]);
      setEntry('');
      setLoading(false);
      toast.success(`${entry} label created Successfully`);
      fetchLabels()
      onClose();
    } catch (err) {
      toast.error('something went wrong, try again');
      console.error(err);
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popover
      id="label-popover"
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <Box p={2} minWidth={200}>
        <Typography variant="h6" gutterBottom>
          Create Label
        </Typography>
        <TextField
          fullWidth
          label="Name of Label"
          placeholder="eg. Health..."
          value={entry}
          onChange={handleEntryChange}
          required
        />
        <br/>
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
        <br/>
        <Button variant="contained" onClick={handleSubmit} fullWidth>
          Create Label
        </Button>
      </Box>
    </Popover>
  );
}

export default LabelPopover;
