import React from 'react';
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const CheckEmail = () => {
  // Access the location object using the useLocation hook
  const location = useLocation();

  // Access the email parameter from the location state
  const email = location.state?.email;

  return (
    <Container className="py-5 text-center">
      <h4 className="mb-4">A link was sent to your email</h4>
      <p className="mt-3">Use the link to reset your password</p>
      <p style={{ fontStyle: 'italic' }}>
        <strong> Check spam folder if you don't immediately see the email in your inbox </strong>
      </p>
    </Container>
  );
};

export default CheckEmail
