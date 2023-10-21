import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../context/context';

const ResetPassword = () => {
  // Scroll to the top of the page after the route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    reset_password,
   } = useStateContext();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
  });

  const { email } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    try{
      const response = await reset_password(email)
      console.log(response)
      if(response){
        navigate('/check_email')
      }
    }
    catch(e){
      console.log(e)
    }
   
    
  };

  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center">
      <Card style={{ width: '30rem' }}>
        <Card.Body>
          <h3 className="text-center mb-4">Reset Password</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                type="email"
                placeholder="Enter your email address"
                name="email"
                value={email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <br/>
            <Button
              variant="primary"
              type="submit"
              className="btn-block"
              style={{width: '100%'}}
            >
              Reset Password
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ResetPassword;
