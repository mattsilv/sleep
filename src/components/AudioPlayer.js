import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import TimeSlider from "./audioPlayer/TimeSlider";
import VolumeControl from "./audioPlayer/VolumeControl";
import PlayPauseButton from "./audioPlayer/PlayPauseButton";
import NarratorSelector from "./audioPlayer/NarratorSelector";
import { AudioProvider, useAudioContext } from "./audioPlayer/context/AudioContext";

/**
 * AudioPlayer presentation component
 * Uses components from:
 *   - ./audioPlayer/TimeSlider.js
 *   - ./audioPlayer/VolumeControl.js
 *   - ./audioPlayer/PlayPauseButton.js
 *   - ./audioPlayer/NarratorSelector.js
 * State management via:
 *   - ./audioPlayer/context/AudioContext.js
 * Which uses:
 *   - ./audioPlayer/hooks/useAudio.js
 */
const AudioPlayerContent = () => {
  // Get all state and handlers from context
  const {
    isPlaying,
    duration,
    currentTime,
    volume,
    isMuted,
    narrator,
    isLoading,
    togglePlay,
    handleTimeChange,
    handleVolumeChange,
    toggleMute,
    handleNarratorChange,
  } = useAudioContext();

  return (
    <Card
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: 3,
      }}
    >
      <CardContent>
        <NarratorSelector 
          narrator={narrator} 
          onChange={handleNarratorChange} 
        />

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" color="text.secondary" align="center">
            {isLoading ? "Loading audio..." : ""}
          </Typography>
        </Box>

        <TimeSlider 
          currentTime={currentTime}
          duration={duration}
          isLoading={isLoading}
          onChange={handleTimeChange}
        />

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="space-between"
          sx={{ mt: 2 }}
        >
          <VolumeControl 
            volume={volume}
            isMuted={isMuted}
            onVolumeChange={handleVolumeChange}
            onToggleMute={toggleMute}
          />

          <PlayPauseButton 
            isPlaying={isPlaying}
            isLoading={isLoading}
            onClick={togglePlay}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

/**
 * Main AudioPlayer component
 * Wraps presentation component with the AudioProvider context
 */
const AudioPlayer = () => {
  return (
    <AudioProvider>
      <AudioPlayerContent />
    </AudioProvider>
  );
};

export default AudioPlayer;
