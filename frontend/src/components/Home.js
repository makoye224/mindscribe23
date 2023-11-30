import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container, useMediaQuery } from '@mui/material';
import front from '../media/frontimage.png'
import img1 from '../media/img1.png';
import img2 from '../media/img2.png';
import img3 from '../media/img3.png';

const Home = () => {
  const cardStyle = {
    marginBottom: '40px',
    height: '330px',
    backgroundColor:'#D3D3D3',
    // backgroundColor: 'grey',
    // borderRadius: '5px',
  };

  const cardImgStyle = {
    height: '200px',
    width: '100%',
  };
  const isLargeScreen = useMediaQuery('(min-width: 992px)');  

  const containerStyle = {
    backgroundColor: '#0275d8', 
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: isLargeScreen ? '80vh' : '90vh',
    color: 'white',
    padding: '10px',
    
  };

 
  

  return (
    <>
      <div style={containerStyle}>
     
      <div className="flex container">
  <div className="md:w-1/2">
    <img src={front} alt="frontpage" className="img-fluid" />
  </div>
  <div className={`md:w-1/2 ${isLargeScreen ? 'mt-10' : 'mt-0'}`}>
    {isLargeScreen ? <div className="h-20"></div> : null}
    <h4>A DIGITIZED APPROACH TO JOURNALING.</h4>
    <br />
    <p>Got a strike of inspiration? Need to vent? See something interesting?</p>
    <br />
    <p>Journal on the go anywhere, anytime.</p>
  </div>
</div>


</div>
      <br/>
      <Container>
      <div>
        <br />
        <h3>What is MindScribe?</h3>
        <br />
      </div>
      <div>
      <ul >
      <li>A structured platform to record your daily activities, emotions, goals, and observations</li>
      <br/>
      <li>A versatile platform that allows users to prioritize their mental wellbeing </li>
      <br/>
      <li>A modern solution, re-imagining, and digitizing the traditional journaling experience </li>
      <br/>
    </ul>

      </div>
      <br />
      <div>
      <h3>What are the Major Features?</h3>
      <br />
      <Row>
      
        <Col md={4}>
          <Card style={{...cardStyle, borderRadius:'0.5rem', backgroundColor:'#F6F8FC'}}>
            <Card.Img
              variant='top'
              src={img1}
              className='img-fluid'
              style={{...cardImgStyle, borderRadius:'0.5rem', objectFit:'cover'}}
            />
            <Card.Body>
             <Card.Title style={{ textAlign: 'center' }}>Create New Entries</Card.Title>
              <Card.Text>
               Start a new entry and edit it whenever.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
        <Card style={{...cardStyle, borderRadius:'0.5rem', backgroundColor:'#F6F8FC'}}>
            <Card.Img
              variant='top'
              src={img2}
              className='img-fluid'
              style={{...cardImgStyle, borderRadius:'0.5rem', objectFit:'cover'}}
            />
            <Card.Body>
              <Card.Title style={{ textAlign: 'center' }}>Labels</Card.Title>
              <Card.Text>
                Organize your entries into a specific, separate section of the application.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
        <Card style={{...cardStyle, borderRadius:'0.5rem', backgroundColor:'#F6F8FC'}}>
            <Card.Img
              variant='top'
              src={img3}
              className='img-fluid'
              style={{...cardImgStyle, borderRadius:'0.5rem', objectFit:'cover'}}
            />
            <Card.Body>
              <Card.Title style={{ textAlign: 'center' }}>Bookmark Entries</Card.Title>
              <Card.Text>
                Save and reflect on your biggest life moments without digging around.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      </div>
      </Container>
    </>
  );
};

export default Home;
