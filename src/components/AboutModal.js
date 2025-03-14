import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import ReactMarkdown from 'react-markdown';
import { styled } from '@mui/material/styles';

// Custom styled component for compact markdown content
const CompactContent = styled(Box)(({ theme }) => ({
  '& p': {
    marginTop: '0.6em',
    marginBottom: '0.6em',
  },
  '& h3': {
    marginTop: '1em',
    marginBottom: '0.4em',
  },
  '& ul': {
    marginTop: '0.4em',
    marginBottom: '0.4em',
    paddingLeft: '1.5em',
  },
  '& li': {
    marginTop: '0.2em',
    marginBottom: '0.2em',
  },
}));

const AboutModal = ({ open, onClose }) => {
  const [markdown, setMarkdown] = useState('');
  const [title, setTitle] = useState('Box Breathing Technique');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open) {
      setLoading(true);
      fetch('/about.md')
        .then(response => response.text())
        .then(text => {
          // Process the content to separate title and content
          const lines = text.split('\n');
          if (lines[0].startsWith('## ')) {
            setTitle(lines[0].replace('##', '').trim());
            // Join the rest of the content, skipping the title
            setMarkdown(lines.slice(1).join('\n').trim());
          } else {
            setMarkdown(text);
          }
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
      <DialogTitle id="about-dialog-title" sx={{ pr: 6, pb: 1 }}>
        {title}
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
      
      <DialogContent sx={{ pt: 0.5 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <CompactContent>
            <ReactMarkdown
              components={{
                a: ({ node, ...props }) => (
                  <a 
                    {...props} 
                    style={{ 
                      color: '#b0b0b0', 
                      textDecoration: 'underline',
                      textDecorationThickness: '0.7px',
                      textUnderlineOffset: '2px',
                    }} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  />
                )
              }}
            >
              {markdown}
            </ReactMarkdown>
          </CompactContent>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AboutModal;