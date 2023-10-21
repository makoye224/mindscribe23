import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useStateContext } from '../context/context';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  // State to store email and password inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()
  const {
    login,
    authenticated,
    setAuthenticated,
   } = useStateContext();

 // Function to handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();

  // Perform form validation
  const form = e.currentTarget;
  if (!form.checkValidity()) {
    e.stopPropagation();
    form.classList.add('was-validated');
    return;
  }

  // Perform login logic with the email and password values
  // You can use these values to make an API request or handle authentication as needed
  try {
    const response = await login(email, password);

    if (response.data) {
      // Store the user's email in localStorage upon successful login
      localStorage.setItem('user', email);
      setAuthenticated(true);
      navigate('/home');
    }
  } catch (e) {
    alert('Wrong credentials');
  }
};


  return (
    <div className='d-flex justify-content-center align-items-center vh-10'>
      <Card style={{ width: '24rem' }}>
        <Card.Body>
          <Card.Title>Log In</Card.Title>
          <Form onSubmit={handleSubmit} noValidate>
            <div className='mb-3'>
            
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required // Field is required
              />
              <div className='invalid-feedback'>
                Please provide a valid email address.
              </div>
            </div>
            <div className='mb-3'>
              
              <Form.Control
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required // Field is required
              />
              <div className='invalid-feedback'>
                Please provide your password.
              </div>
            </div>
            <div className='mb-3'>
              <Button
                type='submit'
                className='btn btn-primary btn-block'
                style={{ width: '100%' }}
              >
                Log In
              </Button>
            </div>
          </Form>
          <div className="mt-3 d-flex justify-content-between">
            <a href='/reset_password'>Forgot Password?</a>
            <a href='/register'>Sign Up</a>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
