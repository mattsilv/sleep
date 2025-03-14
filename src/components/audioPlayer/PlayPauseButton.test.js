import React from 'react';
import { createRoot } from 'react-dom/client';
import PlayPauseButton from './PlayPauseButton';

// Super simple test with timeout - just verifies the component renders without crashing
it('renders without crashing', (done) => {
  // Set timeout to 5 seconds to prevent hanging
  jest.setTimeout(5000);
  
  const div = document.createElement('div');
  const root = createRoot(div);
  
  // Mock function for onClick
  const mockOnClick = jest.fn();
  
  try {
    // Render the play pause button in not playing state
    root.render(
      <PlayPauseButton 
        isPlaying={false} 
        isLoading={false} 
        onClick={mockOnClick} 
      />
    );
    
    // Force cleanup
    setTimeout(() => {
      root.unmount();
      done();
    }, 1000);
  } catch (error) {
    done(error);
  }
}, 5000); // 5 second timeout for the entire test