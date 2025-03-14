import React, { createContext, useContext, useState } from "react";
import useAudio from "../hooks/useAudio";

// Create context
const AudioContext = createContext();

// Provider component
export const AudioProvider = ({ children }) => {
  // Audio state
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(0.7);
  const [narrator, setNarrator] = useState("peter");
  const [isLoading, setIsLoading] = useState(true);

  // Get audio control functions from custom hook
  const {
    togglePlay,
    handleTimeChange,
    handleVolumeChange,
    toggleMute,
    handleNarratorChange,
  } = useAudio({
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
  });

  // Context value
  const value = {
    // State
    isPlaying,
    duration,
    currentTime,
    volume,
    isMuted,
    narrator,
    isLoading,

    // Functions
    togglePlay,
    handleTimeChange,
    handleVolumeChange,
    toggleMute,
    handleNarratorChange,
  };

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
};

// Custom hook to use the audio context
export const useAudioContext = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudioContext must be used within an AudioProvider");
  }
  return context;
};

export default AudioContext;