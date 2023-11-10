import * as React from 'react';
import Box from '@mui/material/Box';
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

  React.useEffect(() => {
    const fetch = async () => {
      await fetchLabels();
      await getUser();
    };
    fetch();
  }, []);

  const handleCloseModal = () => {
    setModalShow(false);
  };

  if (!labels) {
    return <h2>No labels</h2>;
  }

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, left: open });
  };

  return (
    <Container>
      <Box display='flex'>
        <div
          variant='secondary'
          onClick={toggleDrawer(true)}
        >
          <DensityMediumIcon />
        </div>
        {/* Tailwind CSS-based drawer */}
        <div className={`drawer ${state.left ? 'active' : ''}`}>
          <input
            id="my-drawer"
            type="checkbox"
            className="drawer-toggle"
            checked={state.left}
            onChange={() => toggleDrawer(!state.left)}
          />
          <div className="drawer-content">
            {/* Page content here */}
            {/* Note: You might need to adjust the placement of the label/button */}
            <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
              Open drawer
            </label>
            {/* The rest of your content */}
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
              onClick={() => toggleDrawer(false)}
            ></label>
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
              {/* Sidebar content here */}
              <li>
                <a>General</a>
              </li>
              <li>
                <a>Documents</a>
              </li>
              <li>
                <a>Favorites</a>
              </li>
              {/* Add your other items here */}
            </ul>
          </div>
        </div>
      </Box>
      <LabelModal show={modalShow} onHide={handleCloseModal} />
    </Container>
  );
}
