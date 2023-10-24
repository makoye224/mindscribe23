import React from 'react';
import { Typography, Paper } from '@mui/material';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 'bold',
}));

const StyledContent = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
}));

const JournalDisplay = ({ entry }) => {
  return (
    <StyledPaper elevation={3}>
      <StyledTitle variant="h3">{entry?.title}</StyledTitle>
      <hr/>
      <StyledContent>{entry?.contents}</StyledContent>
    </StyledPaper>
  );
};

export default JournalDisplay;
