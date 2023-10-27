import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import CustomButton from './CustomButton';
import { Box } from '@mui/material';
import { useStateContext } from '../context/context';
import { toast } from 'react-toastify';

function MoreIconModal(props) {
  const { journals, fetchJournals, deleteEntry } = useStateContext();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDeleteJournalEntry = async () => {
    const id = props?.journal?.id;
    try {
      await deleteEntry(id);
      fetchJournals();
      props.onHide();
      toast.success('Deleted journal entry successfully');
    } catch (error) {
      console.log(error);
      props.onHide();
      toast.error('Failed to delete journal entry');
    }
  }

  const confirmDelete = () => {
    setShowConfirmation(true);
  }

  const cancelDelete = () => {
    setShowConfirmation(false);
  }

  return (
    <>
    <Modal
      {...props}
      size="xs"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <Box display="flex" flexDirection="column" alignItems="center">
          <CustomButton variant="secondary" fullWidth>
            Create Label
          </CustomButton>
          <CustomButton variant="secondary" fullWidth>
            Add to Existing Label
          </CustomButton>
          <CustomButton variant="secondary" fullWidth onClick={confirmDelete}>
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

    {/* Confirmation Modal */}
    {showConfirmation && (
      <Modal
        show={showConfirmation}
        onHide={cancelDelete}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this entry?
        </Modal.Body>
        <Modal.Footer>
          <CustomButton variant="danger" onClick={handleDeleteJournalEntry}>Confirm</CustomButton>
          <CustomButton variant="secondary" onClick={cancelDelete}>Cancel</CustomButton>
        </Modal.Footer>
      </Modal>
    )}
    </>
  );
}

export default MoreIconModal;
