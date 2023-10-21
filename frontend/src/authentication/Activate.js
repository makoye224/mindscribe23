import React, { useEffect, useState} from 'react';
import { useStateContext } from '../context/context';


const Activate = ({ match }) => {
  useEffect(() => {
    // Scroll to the top of the page after the route change
    window.scrollTo(0, 0);
  }, []);

  const {
    verify,
   } = useStateContext();
  const [verified, setVerified] = useState(false);

  const verify_account = () => {
    const uid = match.params.uid;
    const token = match.params.token;

    verify(uid, token);
    setVerified(true);
  };

  if (verified) {
    
  }

  return (
    <div className='container'>
      <div
        className='d-flex flex-column justify-content-center align-items-center'
        style={{ marginTop: '200px' }}
      >
        <h1>Verify your Account:</h1>
        <button
          onClick={verify_account}
          style={{ marginTop: '50px', borderRadius: '1rem'}}
          type='button'
          className='btn btn-primary'
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default Activate;
