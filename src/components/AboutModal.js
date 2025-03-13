import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import ReactMarkdown from 'react-markdown';

const AboutModal = ({ open, onClose }) => {
  const [markdown, setMarkdown] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open) {
      setLoading(true);
      fetch('/about.md')
        .then(response => response.text())
        .then(text => {
          setMarkdown(text);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching markdown:', error);
          setMarkdown('# Error\nCould not load about information.');
          setLoading(false);
        });
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="about-dialog-title"
      PaperProps={{
        sx: {
          borderRadius: 2,
          bgcolor: 'background.paper',
        }
      }}
    >
      <DialogTitle id="about-dialog-title" sx={{ pr: 6 }}>
        About
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'text.secondary',
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent dividers>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <ReactMarkdown>{markdown}</ReactMarkdown>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AboutModal;