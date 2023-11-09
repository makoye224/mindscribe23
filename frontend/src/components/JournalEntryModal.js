import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, FormLabel } from 'react-bootstrap';
import { Box, Typography } from '@mui/material';
import { useStateContext } from "../context/context";
import Jwt from '../authentication/jwt';


function JournalEntryModal(props) {
  const [entry, setEntry] = useState('');
  const [error, setError] = useState('');
  const userId = Jwt()
  const {
    fetchJournals,
    addEntry,
   } = useStateContext();

  const handleEntryChange = (e) => {
    setEntry(e.target.value);
  };

  const handleSubmit = async() => {
    // Your submit logic here
    try{
      await addEntry(entry, userId)
      setEntry('');
      fetchJournals()
      props.onHide(); // Close the modal after submission
    } catch(err){
      setError(err?.response?.data?.error)
      console.log('error ', error)
      console.error(err)
    }
  
   
  };

  return (
    <Modal
      {...props}
      size="xs"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div className="mb-3">
          <FormLabel>Name of Entry</FormLabel>
          <input
            type="text"
            className="form-control"
            placeholder="eg. Vacation in Italy..."
            value={entry}
            onChange={handleEntryChange}
            required
          />
        </div>
        {error && <div className='alert alert-danger'>{error}</div>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Start New Entry
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default JournalEntryModal;
