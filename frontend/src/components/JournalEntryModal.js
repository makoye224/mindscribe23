import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, FormLabel } from 'react-bootstrap';
import { Box, Typography } from '@mui/material';
import { useStateContext } from "../context/context";
import Jwt from '../authentication/jwt';
import { ColorRing } from 'react-loader-spinner';


function JournalEntryModal(props) {
  const [entry, setEntry] = useState('');
  const [error, setError] = useState('');
  const[loading, setLoading] = useState(false)
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
      setLoading(true)
      await addEntry(entry, userId)
      setEntry('');
      fetchJournals()
      props.onHide(); // Close the modal after submission
    } catch(err){
      setError(err?.response?.data?.error)
      console.log('error ', error)
      console.error(err)
    }
    finally{
      setLoading(false)
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
        {loading && 
            
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            /> }
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
