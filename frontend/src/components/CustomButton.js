import React from 'react';
import Button from '@mui/material/Button';

function CustomButton(props) {
  return (
    <Button {...props} style={{ textTransform: 'none' }}>
      {props.children}
    </Button>
  );
}

export default CustomButton;
