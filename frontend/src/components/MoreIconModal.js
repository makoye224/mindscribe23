import React from 'react';
import Modal from 'react-bootstrap/Modal';
import CustomButton from './CustomButton';
import { Box} from '@mui/material';

function MoreIconModal(props) {
  return (
    <Modal
      {...props}
      size="xs"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      
      <Modal.Body >
        <Box display="flex" flexDirection="column" alignItems="center" >
          <CustomButton variant="secondary" fullWidth >
            Create Label
          </CustomButton>
          <CustomButton variant="secondary" fullWidth>
            Add to Existing Label
          </CustomButton>
          <CustomButton variant="secondary" fullWidth>
            Delete Entry
          </CustomButton>
        </Box>
      </Modal.Body>
      <Modal.Footer>
        <Box width="100%" display="flex" justifyContent="center">
        <CustomButton variant="secondary" fullWidth onClick={props.onHide}>Close</CustomButton>
          
        </Box>
      </Modal.Footer>
    </Modal>
  );
}

export default MoreIconModal;
