import { useEffect, useRef, useCallback } from "react";

/**
 * Simplified audio hook using native HTML5 Audio API
 */
const useAudio = ({
  isPlaying,
  setIsPlaying,
  duration,
  setDuration,
  currentTime,
  setCurrentTime,
  volume,
  setVolume,
  isMuted,
  setIsMuted,
  prevVolume,
  setPrevVolume,
  narrator,
  setNarrator,
  isLoading,
  setIsLoading,
  mode,
  setMode,
}) => {
  // Audio element reference
  const audioRef = useRef(null);

  // Initialize audio element on first render
  useEffect(() => {
    // Create audio element if it doesn't exist
    if (!audioRef.current) {
      const audio = new Audio();
      audio.preload = "auto";
      audio.playbackRate = 1.0; // Explicitly set normal playback rate
      audioRef.current = audio;
    }
    
    // Cleanup on unmount
    return () => {
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audio.src = "";
        audio.load();
      }
    };
  }, []);

  // Setup event listeners when audio element is created
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    
    // Event handlers
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };
    
    const handleLoadStart = () => {
      setIsLoading(true);
    };
    
    const handleCanPlayThrough = () => {
      setIsLoading(false);
    };
    
    const handlePlay = () => {
      setIsPlaying(true);
    };
    
    const handlePause = () => {
      setIsPlaying(false);
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };
    
    const handleError = (e) => {
      setIsLoading(false);
      setIsPlaying(false);
    };
    
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };
    
    // Add event listeners
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("canplaythrough", handleCanPlayThrough);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    
    // Cleanup function to remove listeners
    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("canplaythrough", handleCanPlayThrough);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [setIsLoading, setIsPlaying, setDuration, setCurrentTime]);
  
  // Set audio preload hint
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.preload = "auto";
    }
  }, []);

  // Update audio src when narrator or mode changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    
    // Always ensure audio is paused when switching
    if (!audio.paused) {
      audio.pause();
    }
    
    // Reset UI state to default (not playing, time at 0)
    setIsPlaying(false);
    setCurrentTime(0);
    
    // Get the audio source based on narrator and mode
    const newPath = `/${narrator}-${mode}.mp3`; // peter-sleep.mp3 or peter-relax.mp3
    
    // Set source and reset position
    audio.src = newPath;
    audio.currentTime = 0;
    
    // Load the new audio (but don't play)
    audio.load();
    
    // When metadata is loaded, update duration
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };
    
    // Add temporary listener to handle metadata loading
    audio.addEventListener('loadedmetadata', handleLoadedMetadata, { once: true });
    
    // Cleanup function to remove listener if component unmounts before metadata loads
    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [narrator, mode, setIsLoading, setDuration, setIsPlaying, setCurrentTime]);
  
  // Update volume when it changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  // Toggle play/pause
  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    
    if (audio.paused) {
      // Create a promise to handle autoplay restrictions
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          setIsPlaying(false);
        });
      }
    } else {
      audio.pause();
    }
  }, [setIsPlaying]);

  // Handle time slider change
  const handleTimeChange = useCallback((_, newValue) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.currentTime = newValue;
    setCurrentTime(newValue);
  }, [setCurrentTime]);

  // Handle volume change
  const handleVolumeChange = useCallback((_, newValue) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    setVolume(newValue);
    audio.volume = newValue;
    
    if (isMuted) {
      setIsMuted(false);
    }
  }, [setVolume, isMuted, setIsMuted]);

  // Toggle mute
  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (isMuted) {
      setIsMuted(false);
      audio.volume = prevVolume;
    } else {
      setPrevVolume(volume);
      setIsMuted(true);
      audio.volume = 0;
    }
  }, [isMuted, setIsMuted, prevVolume, setPrevVolume, volume]);

  // Handle narrator change with debounce to prevent rapid re-renders
  const handleNarratorChange = useCallback((event) => {
    // Use timeout to prevent UI lag during radio button changes
    setTimeout(() => {
      // When changing narrator, we'll:
      // 1. Pause playback (handled in useEffect)
      // 2. Reset position to beginning (handled in useEffect)
      // 3. Update the narrator value
      setNarrator(event.target.value);
      
      // Log narrator change for debugging
    }, 0);
  }, [setNarrator]);

  // Handle mode change
  const handleModeChange = useCallback((event) => {
    // Use timeout to prevent UI lag during radio button changes
    setTimeout(() => {
      // When changing mode, we'll:
      // 1. Pause playback (handled in useEffect)
      // 2. Reset position to beginning (handled in useEffect)
      // 3. Update the mode value
      setMode(event.target.value);
      
      // Log mode change for debugging
    }, 0);
  }, [setMode]);

  return {
    soundRef: audioRef,
    togglePlay,
    handleTimeChange,
    handleVolumeChange,
    toggleMute,
    handleNarratorChange,
    handleModeChange,
  };
};

export default useAudio;