import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import TimerIcon from '@mui/icons-material/Timer';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

// Helper function to format time
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const AudioPlayer = () => {
  // Audio state
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(0.5);
  const [narrator, setNarrator] = useState('peter'); // Default to Peter
  
  // Sleep timer state
  const [timerAnchorEl, setTimerAnchorEl] = useState(null);
  const timerMenuOpen = Boolean(timerAnchorEl);
  const [sleepTimer, setSleepTimer] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);
  
  // Refs
  const audioRef = useRef(null);
  const timerRef = useRef(null);
  
  // Audio sources with direct paths
  const audioSources = {
    peter: '/peaceful-peter-full-meditation-raw.mp3',
    brittney: '/brittney-full-meditation-raw.mp3'
  };

  // Load audio metadata
  useEffect(() => {
    const audio = audioRef.current;
    
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };
    
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    
    // For browsers that already have the audio loaded
    if (audio.readyState >= 2) {
      setDuration(audio.duration);
    }
    
    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  // Update current time
  useEffect(() => {
    const audio = audioRef.current;
    
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };
    
    audio.addEventListener('timeupdate', handleTimeUpdate);
    
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  // Update audio source when narrator changes
  useEffect(() => {
    const audio = audioRef.current;
    const wasPlaying = isPlaying;
    
    // Remember current playback position
    const currentPos = audio.currentTime;
    
    // Update the audio source
    audio.src = audioSources[narrator];
    
    // Load the new audio
    audio.load();
    
    // When metadata is loaded, restore position if possible
    audio.onloadedmetadata = () => {
      if (currentPos <= audio.duration) {
        audio.currentTime = currentPos;
      }
      
      // Resume playback if it was playing before
      if (wasPlaying) {
        setTimeout(() => {
          const playPromise = audio.play();
          
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              console.error("Error playing audio:", error);
              setIsPlaying(false);
            });
          }
        }, 100);
      }
    };
  }, [narrator, audioSources, isPlaying]);

  // Handle play/pause
  useEffect(() => {
    const audio = audioRef.current;
    
    if (isPlaying) {
      // Add a small delay before playing to ensure the audio is ready
      setTimeout(() => {
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Error playing audio:", error);
            setIsPlaying(false);
          });
        }
      }, 100);
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // Handle volume change
  useEffect(() => {
    const audio = audioRef.current;
    
    if (isMuted) {
      audio.volume = 0;
    } else {
      audio.volume = volume;
    }
  }, [volume, isMuted]);

  // Handle sleep timer
  useEffect(() => {
    if (timeRemaining === null) return;
    
    if (timeRemaining <= 0) {
      setIsPlaying(false);
      setTimeRemaining(null);
      clearInterval(timerRef.current);
      return;
    }
    
    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(timerRef.current);
  }, [timeRemaining]);

  // Toggle play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Handle time slider change
  const handleTimeChange = (_, newValue) => {
    const audio = audioRef.current;
    audio.currentTime = newValue;
    setCurrentTime(newValue);
  };

  // Handle volume slider change
  const handleVolumeChange = (_, newValue) => {
    setVolume(newValue);
    if (isMuted) setIsMuted(false);
  };

  // Toggle mute
  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      setVolume(prevVolume);
    } else {
      setPrevVolume(volume);
      setIsMuted(true);
    }
  };

  // Handle narrator change
  const handleNarratorChange = (event) => {
    setNarrator(event.target.value);
  };

  // Sleep timer functions
  const handleTimerClick = (event) => {
    setTimerAnchorEl(event.currentTarget);
  };

  const handleTimerClose = () => {
    setTimerAnchorEl(null);
  };

  const setTimer = (minutes) => {
    if (minutes === 0) {
      // Cancel timer
      clearInterval(timerRef.current);
      setTimeRemaining(null);
      setSleepTimer(null);
    } else {
      // Set new timer
      clearInterval(timerRef.current);
      setTimeRemaining(minutes * 60);
      setSleepTimer(minutes);
    }
    handleTimerClose();
  };

  return (
    <Card 
      sx={{ 
        width: '100%', 
        bgcolor: 'background.paper', 
        borderRadius: 3, 
        overflow: 'hidden',
        boxShadow: 3
      }}
    >
      <CardContent>
        {/* Narrator Selection */}
        <FormControl component="fieldset" sx={{ mb: 2, width: '100%' }}>
          <FormLabel component="legend" sx={{ color: 'text.secondary', mb: 1 }}>Choose your guide:</FormLabel>
          <RadioGroup
            row
            aria-label="narrator"
            name="narrator-group"
            value={narrator}
            onChange={handleNarratorChange}
            sx={{ justifyContent: 'center' }}
          >
            <FormControlLabel value="peter" control={<Radio />} label="Peter" />
            <FormControlLabel value="brittney" control={<Radio />} label="Brittney" />
          </RadioGroup>
        </FormControl>
        
        <Box sx={{ mb: 2 }}>
          <Typography 
            variant="subtitle1" 
            color="text.secondary" 
            align="center"
          >
            {sleepTimer ? `Sleep timer: ${formatTime(timeRemaining)}` : ""}
          </Typography>
        </Box>
        
        {/* Time slider */}
        <Box sx={{ mb: 1 }}>
          <Slider
            value={currentTime}
            max={duration || 100}
            onChange={handleTimeChange}
            aria-label="audio timeline"
            sx={{ color: '#90caf9' }}
          />
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              color: 'text.secondary', 
              fontSize: '0.75rem' 
            }}
          >
            <Typography variant="caption">{formatTime(currentTime)}</Typography>
            <Typography variant="caption">{formatTime(duration)}</Typography>
          </Box>
        </Box>
        
        {/* Controls */}
        <Stack 
          direction="row" 
          spacing={1} 
          alignItems="center" 
          justifyContent="space-between"
          sx={{ mt: 2 }}
        >
          {/* Volume controls */}
          <Stack direction="row" spacing={1} alignItems="center" sx={{ width: '30%' }}>
            <IconButton 
              onClick={toggleMute} 
              size="small" 
              color="inherit"
            >
              {isMuted || volume === 0 ? <VolumeOffIcon /> : <VolumeUpIcon />}
            </IconButton>
            <Slider
              size="small"
              value={isMuted ? 0 : volume}
              max={1}
              min={0}
              step={0.01}
              onChange={handleVolumeChange}
              aria-label="Volume"
              sx={{ color: '#ce93d8' }}
            />
          </Stack>
          
          {/* Play/Pause button */}
          <IconButton 
            onClick={togglePlay} 
            size="large" 
            sx={{ 
              bgcolor: 'primary.main', 
              color: 'background.default',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
              width: 56,
              height: 56
            }}
          >
            {isPlaying ? <PauseIcon fontSize="large" /> : <PlayArrowIcon fontSize="large" />}
          </IconButton>
          
          {/* Sleep timer */}
          <Box sx={{ width: '30%', display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton
              aria-label="sleep timer"
              onClick={handleTimerClick}
              color={sleepTimer ? "primary" : "inherit"}
            >
              <TimerIcon />
            </IconButton>
            <Menu
              anchorEl={timerAnchorEl}
              open={timerMenuOpen}
              onClose={handleTimerClose}
              TransitionComponent={Fade}
            >
              <MenuItem onClick={() => setTimer(0)}>Off</MenuItem>
              <MenuItem onClick={() => setTimer(5)}>5 minutes</MenuItem>
              <MenuItem onClick={() => setTimer(10)}>10 minutes</MenuItem>
              <MenuItem onClick={() => setTimer(15)}>15 minutes</MenuItem>
              <MenuItem onClick={() => setTimer(30)}>30 minutes</MenuItem>
              <MenuItem onClick={() => setTimer(45)}>45 minutes</MenuItem>
              <MenuItem onClick={() => setTimer(60)}>60 minutes</MenuItem>
            </Menu>
          </Box>
        </Stack>
      </CardContent>
      
      {/* Hidden audio element */}
      <audio 
        ref={audioRef} 
        src={audioSources[narrator]} 
        preload="auto"
        crossOrigin="anonymous"
      />
    </Card>
  );
};

export default AudioPlayer;