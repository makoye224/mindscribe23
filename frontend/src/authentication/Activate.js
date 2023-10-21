import React, { useEffect, useState } from 'react';
import { useStateContext } from '../context/context';
import { useParams } from 'react-router-dom';

const Activate = () => {
  useEffect(() => {
    // Scroll to the top of the page after the route change
    window.scrollTo(0, 0);
  }, []);

// Extract 'uid' and 'token' from the URL parameters
  const { uid, token } = useParams(); 
  const { verify } = useStateContext();
  const [verified, setVerified] = useState(false);

  console.log('params ', uid, token)

  const verify_account = async() => {
    // Check if 'uid' and 'token' are not null (URL parameters exist)
    if (uid && token) {
      try{
        await verify(uid, token);
        setVerified(true);
      }
     catch(err){
      console.log('error activating account ', err)
     }
    }
  };

  if (verified) {
    // Render something when verification is successful
    return (
      <div className="container">
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ marginTop: '200px' }}
        >
          <h1>Account Verified</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ marginTop: '200px' }}
      >
        <h1>Verify your Account:</h1>
        <button
          onClick={verify_account}
          style={{ marginTop: '50px', borderRadius: '1rem' }}
          type="button"
          className="btn btn-primary"
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default Activate;
