import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Box } from "@mui/material";
import { useStateContext } from "../context/context";
import { toast } from "react-toastify";
import { Audio, ColorRing } from "react-loader-spinner";

const CustomButton = ({ onClick, children }) => (
  <button className="custom-button" onClick={onClick}>
    {children}
  </button>
);

function MoreIconModal({ journal, ...props }) {
  const {
    journals,
    fetchJournals,
    deleteEntry,
    createLabel,
    fetchLabels,
    updateEntry,
    labels,
    addEntryToLabel,
   
  } = useStateContext();

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showAddToLabel, setShowAddToLabel] = useState(false);
  const [showNewLabel, setShowNewLabel] = useState(false);
  const [label, setLabel] = useState("");
  const [loading, setLoading] = useState(false);
  const [editEntry, setEditEntry] = useState(false);
  const [entry, setEntry] = useState(journal.title || '');

  const handleDeleteJournalEntry = async () => {
    const id = journal?.id;
    try {
      setLoading(true);
      await deleteEntry(id);
      fetchJournals();
      props.onHide();
      toast.success("Deleted journal entry successfully");
    } catch (error) {
      console.log(error);
      props.onHide();
      toast.error("Failed to delete journal entry");
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = () => {
    props.onHide();
    setShowConfirmation(true);
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  const handleAddToExistingLabel = async () => {
    props.onHide();
    setShowAddToLabel(true);
  };

  const addToExistingLabel = async (label) => {
    const newJournalLabel = [...label.journals, journal.id];
    try {
      setLoading(true);
      await addEntryToLabel(label.id, newJournalLabel);
      await fetchLabels()
      toast.success(`Journal entry added to ${label.name} successfully`);
    } catch (err) {
      toast.error(`Failed to add entry to ${label.name}`);
      console.log(err);
    } finally {
      setLoading(false);
      setShowAddToLabel(false);
    }
  };

  const handleCreateNewLabel = async () => {
    props.onHide();
    setShowNewLabel(true);
  };

  const createNewLabel = async () => {
    if (label) {
      try {
        setLoading(true);
        const response = await createLabel(label);
        console.log(response.id);
        try {
          await addEntryToLabel(
            response?.id,
            [journal.id],
          );
          fetchLabels()
          setShowNewLabel(false);
          toast.success(`Journal entry added to ${response.name} successfully`);
        } catch (err) {
          console.log(err);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEditEntry = async(e) => {
    e.preventDefault();

    const payload = {
      title: entry,
    };

    try {
      const res = await updateEntry(journal.id, journal, payload);
      fetchJournals();
      props.onHide();
    } catch (err) {
      console.error(err);
    }

    setEntry('');
    setEditEntry(false);
  };

  const handleAddToFavorites = async () => {
    const payload = {
      is_favorite: true,
    };

    try {
      const res = await updateEntry(journal.id, journal, payload);
      fetchJournals();
      props.onHide();
    } catch (err) {
      console.error(err);
    }
  };

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
            <CustomButton onClick={() => setEditEntry(!editEntry)}>
              Edit Entry
            </CustomButton>
            <br/>
            {editEntry && 
              <div>
                <form onSubmit={handleEditEntry}>
                  <label className='font-bold'>New entry name</label>
                  <input 
                    type='text'
                    value={entry} 
                    onChange={(e) => setEntry(e.target.value)} 
                    className='form-control'
                    required
                  />
                  <br/>
                  <CustomButton variant="secondary" type="submit">
                    Submit
                  </CustomButton>
                </form>
                <br/>
              </div>
            }
            <CustomButton onClick={handleCreateNewLabel}>
              Create Label
            </CustomButton>
            <br/>
            <CustomButton onClick={handleAddToFavorites}>
              Add to Favorites
            </CustomButton>
            <br/>
            <CustomButton onClick={handleAddToExistingLabel}>
              Add to Existing Label
            </CustomButton>
            <br/>
            <CustomButton variant="secondary" onClick={confirmDelete}>
              Delete Entry
            </CustomButton>
          </Box>
        </Modal.Body>
        <Modal.Footer>
          <Box width="100%" display="flex" justifyContent="center">
            <CustomButton variant="secondary" onClick={props.onHide}>
              Close
            </CustomButton>
          </Box>
        </Modal.Footer>
      </Modal>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <Modal show={showConfirmation} onHide={cancelDelete} centered>
          <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <p> Are you sure you want to delete this entry?</p>
              {loading && (
                <ColorRing
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{}}
                  wrapperClass="blocks-wrapper"
                  colors={[
                    "#e15b64",
                    "#f47e60",
                    "#f8b26a",
                    "#abbd81",
                    "#849b87",
                  ]}
                />
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <CustomButton variant="danger" onClick={handleDeleteJournalEntry}>
              Confirm
            </CustomButton>
            <CustomButton variant="secondary" onClick={cancelDelete}>
              Cancel
            </CustomButton>
          </Modal.Footer>
        </Modal>
      )}

      {/* ADD TO EXISTING LABEL */}
      {showAddToLabel && (
        <Modal
          show={showAddToLabel}
          onHide={() => setShowAddToLabel(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Select a Label</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
            {labels.map((label) => (
              <div className="flex-col" key={label.id}>
                <CustomButton
                  variant="danger"
                  onClick={() => addToExistingLabel(label)}
                >
                  {label.name}
                </CustomButton>
              </div>
            ))}
            {loading && (
              <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
              />
            )}
          </Modal.Body>
          <Modal.Footer>
            <CustomButton variant="secondary" onClick={() => setShowAddToLabel(false)}>
              Cancel
            </CustomButton>
          </Modal.Footer>
        </Modal>
      )}
      {/* CREATE NEW LABEL */}
      {showNewLabel && (
        <Modal
          show={showNewLabel}
          onHide={() => setShowNewLabel(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Create new Label</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <label className="text-center mb-2">Name of Label</label>
              <input
                type="text"
                value={label}
                required
                className="form-control"
                onChange={(e) => setLabel(e.target.value)}
              />
            </form>
            {loading && (
              <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
              />
            )}
          </Modal.Body>
          <Modal.Footer>
            <CustomButton variant="danger" onClick={createNewLabel}>
              Add
            </CustomButton>
            <CustomButton variant="secondary" onClick={() => setShowNewLabel(false)}>
              Cancel
            </CustomButton>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default MoreIconModal;
