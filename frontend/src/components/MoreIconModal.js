import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import CustomButton from './CustomButton';
import { Box } from '@mui/material';
import { useStateContext } from '../context/context';
import { toast } from 'react-toastify';
import { Audio, ColorRing } from  'react-loader-spinner'

function MoreIconModal({journal, ...props}) {
  const { journals, fetchJournals, deleteEntry, createLabel, fetchLabels,labels, addEntryToLabel} = useStateContext();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showAddToLabel, setShowAddToLabel] = useState(false);
  const [showNewLabel, setShowNewLabel] = useState(false);
  const [label, setLabel] = useState('')
  const [loading, setLoading] = useState(false); 

  const handleDeleteJournalEntry = async () => {
    const id = journal?.id;
    try {
      setLoading(true);
      await deleteEntry(id);
      fetchJournals();
      props.onHide();
      toast.success('Deleted journal entry successfully');
    } catch (error) {
      console.log(error);
      props.onHide();
      toast.error('Failed to delete journal entry');
    }
    finally {
      setLoading(false); // Set loading to false after the operation
    }
  }

  const confirmDelete = () => {
    props.onHide();
    setShowConfirmation(true);

  }

  const cancelDelete = () => {
    setShowConfirmation(false);
  }

  const handleAddToExistingLabel = async()=>{
    props.onHide();
    setShowAddToLabel(true)
  }

  const addToExistingLabel = async(label)=>{
    try{
      setLoading(true);
      await addEntryToLabel(label.id,label.journals, journal.id)
      toast.success(`journal entry added to ${label.name} successfully`);
     
    }
    catch(err){
       toast.error(`failed to add entry to ${label.name}`);
      console.log(err)
    }
    finally {
      setLoading(false); // Set loading to false after the operation
      setShowAddToLabel(false)
    }
  }

  const handleCreateNewLabel= async()=>{
    props.onHide();
    setShowNewLabel(true)
  }

  const   createNewLabel = async()=>{
    if(label){
      try{
        setLoading(true);
        const response = await createLabel(label)
        console.log(response.id)
        try{
          const addToLabel = await addEntryToLabel(response?.id, response.journals, journal.id )
          setShowNewLabel(false)
          toast.success(`journal entry added to ${response.name} successfully`);
        }
        catch(err){
          console.log(err)
        }
      }
      catch(err){
        console.error(err)
      }
      finally {
        setLoading(false); 
        
      }
     
    }
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
          <CustomButton variant="secondary" fullWidth onClick = {handleCreateNewLabel}> 
            Create Label
          </CustomButton>
          <CustomButton variant="secondary" fullWidth onClick={handleAddToExistingLabel}>
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
          <div>
            <p> Are you sure you want to delete this entry?</p>
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
          </div>
         
        </Modal.Body>
        <Modal.Footer>
          <CustomButton variant="danger" onClick={handleDeleteJournalEntry}>Confirm</CustomButton>
          <CustomButton variant="secondary" onClick={cancelDelete}>Cancel</CustomButton>
        </Modal.Footer>
      </Modal>
    )}

    {/* ADD TO EXISTING LABEL */}
    {showAddToLabel && (
      <Modal
        show={showAddToLabel}
        onHide={()=>setShowAddToLabel(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Select a Label</Modal.Title>
        </Modal.Header>
              <Modal.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {labels.map((label) => (
          <div className='flex-col' key={label.id}>
            <CustomButton variant="danger" onClick={()=>addToExistingLabel(label)}>
              {label.name}
            </CustomButton>
          </div>
        ))}
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
          <CustomButton variant="secondary" onClick={()=>setShowAddToLabel(false)}>Cancel</CustomButton>
        </Modal.Footer>
      </Modal>
    )}
    {/* CREATE NEW LABEL */}
    {showNewLabel && (
      <Modal
        show={showNewLabel}
        onHide={()=>setShowNewLabel(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Create new Label</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <label className='text-center mb-2'>Name of Label</label>
            <input type='text' value={label} required className='form-control' onChange={(e)=>setLabel(e.target.value)}/>
          </form>
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
        <CustomButton variant="danger" onClick={createNewLabel}>Add</CustomButton>
          <CustomButton variant="secondary" onClick={()=>setShowNewLabel(false)}>Cancel</CustomButton>
        </Modal.Footer>
      </Modal>
    )}
    </>
  );
}

export default MoreIconModal;
