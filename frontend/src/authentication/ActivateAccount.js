import React from 'react';
import { Container, Typography, Box } from '@mui/material';

function ActivateAccount() {
  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          marginTop: 4,
        }}
      >
        <Typography variant="h4" component="h2">
          Activate Your Account
        </Typography>
        <Typography variant="body1">
          Thank you for signing up! To activate your account, please check your
          email and click on the activation link we've sent to you.
        </Typography>
        <Typography variant="body1">
          If you don't see the email in your inbox, please check your spam folder.
        </Typography>
      </Box>
    </Container>
  );
}

export default ActivateAccount;
