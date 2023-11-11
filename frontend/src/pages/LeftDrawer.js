import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import CustomButton from '../components/CustomButton';
import { Avatar, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Container } from 'react-bootstrap';
import { useStateContext } from '../context/context';
import LabelModal from '../components/LabelPopover';
import MoreIcon from '../components/MoreIcon';
import LabelPopover from '../components/LabelPopover';
import ClearIcon from '@mui/icons-material/Clear';

export default function LeftDrawer() {
  const [modalShow, setModalShow] = useState(false);
  const [state, setState] = useState({
    left: false,
  });

  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setPopoverAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopoverAnchorEl(null);
  };

  const {
    labels,
    currentUser,
    fetchLabels,
    getUser,
  } = useStateContext();

  React.useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchLabels()], getUser());
    };

    fetchData();
  }, []);

  const toggleDrawer = (event, open) => {
    if (
      (event?.target?.closest('.density-icon') && open) ||
      (event?.target?.closest('.clear-icon') && !open)
    ) {
      setState({ ...state, left: open });
    }
  };
  

  const list = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => toggleDrawer(false)}
      onKeyDown={() => toggleDrawer(false)}
    >
      <br />
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center" gap={1}>
          <AccountBoxIcon />
          <Typography variant="body1">{currentUser?.email}</Typography>
          <IconButton onClick={(e) => toggleDrawer(e, false)} className='clear-icon'>
  <ClearIcon />
</IconButton>
        </Box>
      </Box>
      <hr />
      <Box>
        <CustomButton variant="secondary">
          <Typography variant="h5">General</Typography>
        </CustomButton>
        <br />
        <CustomButton variant="secondary">Documents</CustomButton>
        <br />
        <CustomButton variant="secondary">Favorites</CustomButton>
        <br />
        <hr />
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          onClick={(e) => e.stopPropagation()}
        >
          <CustomButton variant="secondary">
            <Typography variant="h5">Labels</Typography>
          </CustomButton>
          <CustomButton onClick={handlePopoverOpen} variant="secondary">
            <AddIcon style={{ scale: '120%' }} />
          </CustomButton>
          <LabelPopover
            anchorEl={popoverAnchorEl}
            open={Boolean(popoverAnchorEl)}
            onClose={handlePopoverClose}
          />
        </Box>
        <Box>
          {labels.map((label) => (
            <div key={label.id}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                onClick={(e) => e.stopPropagation()}
              >
                <CustomButton variant="secondary" onClick={(e) => e.stopPropagation()}>
                  {label.name}
                </CustomButton>
                <MoreIcon label={label} />
              </Box>
            </div>
          ))}
        </Box>
      </Box>
    </Box>
  );

  return (
    <Container>
      <Box display="flex">
        <React.Fragment key="left">
        <div variant="secondary" onClick={(e) => toggleDrawer(e, true)} className='density-icon'>
  <DensityMediumIcon />
</div>

          <Drawer anchor="left" open={state.left} onClose={() => toggleDrawer(false)}>
            {list}
          </Drawer>
        </React.Fragment>
      </Box>
      <LabelModal show={modalShow} onHide={() => setModalShow(false)} />
    </Container>
  );
}
