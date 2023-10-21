import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../context/context';
import { useParams } from 'react-router-dom'; // Import useParams

const ResetPasswordConfirm = () => {
  const navigate = useNavigate();
  const { reset_password_confirm } = useStateContext();
  const { uid, token } = useParams(); // Use useParams to access route parameters

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    new_password: '',
    re_new_password: '',
  });

  const { new_password, re_new_password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
     const response =  await reset_password_confirm(uid, token, new_password, re_new_password);
     if(response){
      navigate('/login');
     }
    } catch (error) {
      console.error('Password reset failed:', error);
    }
  };

  return (
    <div className='container mt-5 d-flex justify-content-center'>
      <Card style={{ width: '30rem' }}>
        <Card.Body>
          <Card.Title className="text-center">Reset Password</Card.Title>
          <Form onSubmit={onSubmit}>
            <Form.Group>
              <Form.Control
                type='password'
                placeholder='New Password'
                name='new_password'
                value={new_password}
                onChange={onChange}
                minLength='6'
                required
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Control
                type='password'
                placeholder='Confirm New Password'
                name='re_new_password'
                value={re_new_password}
                onChange={onChange}
                minLength='6'
                required
              />
            </Form.Group>
            <br />
            <Button
              variant='primary'
              type='submit'
              style={{ width: '100%' }}
            >
              Reset Password
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ResetPasswordConfirm;
