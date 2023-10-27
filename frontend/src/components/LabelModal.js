import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, FormLabel } from 'react-bootstrap';
import { Box, Typography } from '@mui/material';
import { useStateContext } from "../context/context";
import Jwt from '../authentication/jwt';


function LabelModal(props) {
  const [entry, setEntry] = useState('');
  const userId = Jwt()
  const {
    createLabel,
    fetchLabels,
   } = useStateContext();

  const handleEntryChange = (e) => {
    setEntry(e.target.value);
  };

  const handleSubmit = async() => {
    // Your submit logic here
    try{
      createLabel(userId, entry)
      setEntry('');
      fetchLabels()
      props.onHide(); // Close the modal after submission
    } catch(err){
      console.log(err)
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
          <FormLabel>Name of Label</FormLabel>
          <input
            type="text"
            className="form-control"
            placeholder="eg. Health..."
            value={entry}
            onChange={handleEntryChange}
            required
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Create Label
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LabelModal;
