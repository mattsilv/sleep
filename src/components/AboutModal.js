import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import ReactMarkdown from 'react-markdown';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
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

const AboutModal = ({ open, onClose, mode = "sleep" }) => {
  const [sleepContent, setSleepContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0); // 0 for Sleep, 1 for Relax

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    if (open) {
      setLoading(true);
      
      // Load the box breathing content from about.md
      fetch('/about.md')
        .then(response => response.text())
        .then(text => {
          // Remove the title line if it exists and store the content
          const lines = text.split('\n');
          if (lines[0].startsWith('## ')) {
            setSleepContent(lines.slice(1).join('\n').trim());
          } else {
            setSleepContent(text);
          }
          setLoading(false);
        })
        .catch(error => {
          setSleepContent('Could not load about information.');
          setLoading(false);
        });
    }
  }, [open]);

  const relaxContent = `The guided meditation uses a 2-minute focused breathing technique specifically designed for anxiety relief and stress management. This scientifically-backed approach activates the parasympathetic nervous system to create immediate calming effects.

### How the Session Works:

1. **15-second focused introduction** to help you settle and prepare
2. **6-7 complete breathing cycles** (approximately 90 seconds) of guided rhythmic breathing
3. **15-second gentle closing** to help you transition back to your day

### Why 2 Minutes is Optimal:

- **Accessible:** Short enough to use anywhere - during work breaks, before stressful events, or when anxiety strikes
- **Effective:** Sufficient time to activate your body's natural relaxation response and reduce cortisol levels
- **Sustainable:** People are more likely to use a brief tool regularly, building a consistent practice

### Benefits:

- Reduces acute anxiety and stress levels within 60-90 seconds
- Provides immediate nervous system regulation
- Gives you a sense of control during anxious moments
- Can be repeated as needed for continued relief

Research shows that even brief periods of controlled breathing can significantly reduce anxiety and stress hormones, making this an ideal tool for managing everyday stress and anxiety spikes.`;

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
        Techniques
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
      
      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange} 
          aria-label="technique tabs"
          variant="fullWidth"
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontSize: '0.95rem',
              fontWeight: 500,
            }
          }}
        >
          <Tab label="Sleep" />
          <Tab label="Relax" />
        </Tabs>
      </Box>

      <DialogContent sx={{ pt: 2 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <CompactContent>
            {activeTab === 0 && (
              <ReactMarkdown
                components={{
                  a: ({ node, children, ...props }) => (
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
                    >
                      {children}
                    </a>
                  )
                }}
              >
                {`## Sleep - Box breathing\n\n${sleepContent}`}
              </ReactMarkdown>
            )}

            {activeTab === 1 && (
              <ReactMarkdown
                components={{
                  a: ({ node, children, ...props }) => (
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
                    >
                      {children}
                    </a>
                  )
                }}
              >
                {`## Relax - 2 minute breathing\n\n${relaxContent}`}
              </ReactMarkdown>
            )}
          </CompactContent>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AboutModal;