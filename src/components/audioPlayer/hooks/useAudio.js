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
}) => {
  // Audio element reference
  const audioRef = useRef(null);

  // Initialize audio element on first render
  useEffect(() => {
    // Create audio element if it doesn't exist
    if (!audioRef.current) {
      console.log("Creating new audio element");
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
    
    console.log("Setting up audio event listeners");
    
    // Event handlers
    const handleLoadedMetadata = () => {
      console.log("Audio metadata loaded, duration:", audio.duration);
      setDuration(audio.duration);
      setIsLoading(false);
    };
    
    const handleLoadStart = () => {
      console.log("Audio load started");
      setIsLoading(true);
    };
    
    const handleCanPlayThrough = () => {
      console.log("Audio can play through");
      setIsLoading(false);
    };
    
    const handlePlay = () => {
      console.log("Audio playing");
      setIsPlaying(true);
    };
    
    const handlePause = () => {
      console.log("Audio paused");
      setIsPlaying(false);
    };
    
    const handleEnded = () => {
      console.log("Audio ended");
      setIsPlaying(false);
      setCurrentTime(0);
    };
    
    const handleError = (e) => {
      console.error("Audio error:", e);
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
  
  // Update audio src when narrator changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    console.log("Updating audio source for narrator:", narrator);
    
    // Pause audio if playing
    if (!audio.paused) {
      audio.pause();
    }
    
    setIsLoading(true);
    
    // Determine the path based on narrator
    const path = `/${narrator === "peter" ? "peaceful-peter" : "brittney"}-full-meditation-raw.mp3`;
    console.log("Setting audio source to:", path);
    
    // Update source and load
    audio.src = path;
    audio.playbackRate = 1.0; // Ensure normal playback rate after source change
    audio.load();
    
  }, [narrator, setIsLoading]);
  
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
    
    console.log("Toggle play, currently playing:", !audio.paused);
    
    if (audio.paused) {
      // Create a promise to handle autoplay restrictions
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Play error:", error);
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

  // Handle narrator change
  const handleNarratorChange = useCallback((event) => {
    setNarrator(event.target.value);
  }, [setNarrator]);

  return {
    soundRef: audioRef,
    togglePlay,
    handleTimeChange,
    handleVolumeChange,
    toggleMute,
    handleNarratorChange,
  };
};

export default useAudio;