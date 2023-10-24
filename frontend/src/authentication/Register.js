import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../context/context';
import { toast } from 'react-toastify';

const Register = () => {
  // State to store form inputs
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(''); // State for error message

  const navigate = useNavigate()
  const {
    register,
   } = useStateContext();

   

  // Function to handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();

    // Perform form validation
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add('was-validated');
      return;
    }

    try{
      const response = await register(email, password, confirmPassword, firstName, lastName)
      if(response?.data){
        toast.success('Registered Successfully')
        navigate('/activate_account')

       }
    }catch(e){
      console.log(e?.response?.data)
      setError(e?.response?.data?.email ||e?.response?.data?.non_field_errors || 'something went wrong' )
      toast.error('try again')
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center vh-10'>
      <Card style={{ width: '30rem' }}>
        <Card.Body>
          <Card.Title>Sign Up</Card.Title>
          {error && (
            <div className="alert alert-danger">{error}</div>
          )}
          <Form onSubmit={handleSubmit} noValidate>
            <Form.Group controlId='firstName' className='mb-3'>
              <Form.Control
                type='text'
                placeholder='Enter your first name'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required // Field is required
              />
              <div className='invalid-feedback'>
                Please provide your first name.
              </div>
            </Form.Group>
            <Form.Group controlId='lastName' className='mb-3'>
              <Form.Control
                type='text'
                placeholder='Enter your last name'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required // Field is required
              />
              <div className='invalid-feedback'>
                Please provide your last name.
              </div>
            </Form.Group>
            <Form.Group controlId='email' className='mb-3'>
              <Form.Control
                type='email'
                placeholder='Enter your email address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required // Field is required
              />
              <div className='invalid-feedback'>
                Please provide a valid email address.
              </div>
            </Form.Group>
            <Form.Group controlId='password' className='mb-3'>
              <Form.Control
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required // Field is required
                minLength='6' // Minimum length of the password
              />
              <div className='invalid-feedback'>
                Password must be at least 6 characters.
              </div>
            </Form.Group>
            <Form.Group controlId='confirmPassword' className='mb-3'>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required // Field is required
                minLength='6' // Minimum length of the password
              />
              <div className='invalid-feedback'>
                Please confirm your password.
              </div>
            </Form.Group>
            <Button type='submit' className='btn btn-primary btn-block' style={{ width: '100%' }}>
              Sign Up
            </Button>
          </Form>
          <div className="mt-3 d-flex justify-content-between">
            <p>Already have an account? </p>
            <a href='/login'>Log In</a>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Register;
