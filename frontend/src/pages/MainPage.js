import * as React from "react";
import Typography from "@mui/material/Typography";
import LabelModal from "../components/JournalEntryModal";
import { JournalEntry } from "../components/JournalEntry";
import SearchBar from "../components/SearchBar";
import Container from "@mui/material/Container";
import { Row, Col, Button } from "react-bootstrap";
import AddIcon from "@mui/icons-material/Add";
import { useStateContext } from "../context/context";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Login from "../authentication/Login";

const rectangleStyles = {
  width: "150px",
  height: "100px",
  backgroundColor: "#f2f3f5",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const plusIconStyles = {
  fontSize: 50,
  color: "black",
};


export default function MainPage() {
  // State for controlling the visibility of the modal
  const [modalShow, setModalShow] = React.useState(false);

  // Retrieve user data from localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate()

  const {
   journals,
   fetchJournals,
  } = useStateContext();

  const handleCloseModal = () => {
    setModalShow(false);
  };

  const handlePlusClick =()=>{
    setModalShow(true);
    
  }

  return (
    <>
    { user ? (
    <Container>
      <div>
    
        <SearchBar />
        <br />
        <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">Recents</Typography>
        {journals.length !==0 &&  <Button variant='secondary' onClick={handlePlusClick}>New Journal</Button>}
       
        </Box>
        
        <br />
        <div>
          {journals.length === 0 ? (
            <> 
            <div onClick={handlePlusClick} style={{cursor: 'pointer'}}>
        <div style={rectangleStyles}>
    <AddIcon style={plusIconStyles} />
  </div>
  </div>
            
            </>
          ) : (
            
              <Row>
          {journals?.map((entry) => (
            <Col key={entry?.title} lg={4} md={6} xs={12}>
            <JournalEntry entry = {entry} />
              <br />
            </Col>
          ))}
        </Row>
          )}
        </div>
        
        <LabelModal show={modalShow} onHide={handleCloseModal}/>

      </div>
    </Container>
    ) : (<Login/>)
    }
    </>
  );
}
