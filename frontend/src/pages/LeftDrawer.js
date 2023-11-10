import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import CustomButton from '../components/CustomButton';
import { Avatar, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Container } from 'react-bootstrap';
import { useStateContext } from '../context/context';
import LabelModal from '../components/LabelModal';

export default function LeftDrawer() {
  const [modalShow, setModalShow] = React.useState(false);
  const [state, setState] = React.useState({
    left: false,
  });

  const {
    labels,
    currentUser,
    fetchLabels,
    getUser,
   } = useStateContext();

   React.useEffect(()=>{
    const fetch = async()=>{
      await fetchLabels()
      await getUser()
    }
    fetch()
  }, [])

   const handleCloseModal = () => {
    setModalShow(false);
  };

  if(!labels){
    <h2>No labels</h2>
  }

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Container  style={{backgroundColor: '#F0F0F0', minHeight: '900px'}}>
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
    <br/>
      <Box display="flex" alignItems="center" justifyContent="space-between" >
             
             <Box display="flex" alignItems="center" gap={1}>
               <AccountBoxIcon
               />
               <Typography variant="body1">{currentUser?.email}</Typography>
             </Box>
           </Box><hr /><Box>
               <CustomButton variant='secondary'><Typography variant="h5">
                 General
               </Typography>
               </CustomButton>
               <br />
               <CustomButton variant='secondary'>Documents</CustomButton>
               <br />
               <CustomButton variant='secondary'>Favorites</CustomButton>
               <br />
               <hr />
               <Box display='flex' alignItems="center" justifyContent="space-between">
                 <CustomButton variant='secondary'><Typography variant="h5">
                   Labels
                 </Typography>
                 </CustomButton>
                 <CustomButton onClick={(e) => {
        // e.stopPropagation(); // Stop event propagation
        setModalShow(true);
      }} variant='secondary'>
        <AddIcon style={{ scale: '120%' }} />
      </CustomButton>

               </Box>
               <Box>
               {labels.map((label)=>
               <div>
               <CustomButton variant='secondary'>{label.name}</CustomButton>
               </div>
               )}
               </Box>
             
             </Box>
    </Box>
    </Container>
  );

  // Render the drawer only on the left side
  const anchor = 'left';

  return (
    <Container>
    <Box display='flex'>

      <React.Fragment key={anchor}>
        <div variant='secondary' onClick={toggleDrawer(anchor, true)}><DensityMediumIcon /></div>
        <Drawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
        >
          {list(anchor)}
        </Drawer>
      </React.Fragment>
      <LabelModal show={modalShow} onHide={handleCloseModal}/>
    </Box>
    </Container>
  );
}
