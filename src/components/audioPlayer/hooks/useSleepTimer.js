import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for managing sleep timer functionality
 * Used by: ../context/AudioContext.js
 */
const useSleepTimer = ({ soundRef, isPlaying, setIsPlaying }) => {
  const [sleepTimer, setSleepTimer] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const timerRef = useRef(null);

  // Handle sleep timer
  useEffect(() => {
    if (timeRemaining === null) return;

    if (timeRemaining <= 0) {
      if (soundRef.current && isPlaying) {
        soundRef.current.pause();
      }
      setIsPlaying(false);
      setTimeRemaining(null);
      clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [timeRemaining, isPlaying, soundRef, setIsPlaying]);

  // Sleep timer functions
  const handleSetTimer = (minutes) => {
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
  };

  return {
    sleepTimer,
    timeRemaining,
    handleSetTimer,
  };
};

export default useSleepTimer;