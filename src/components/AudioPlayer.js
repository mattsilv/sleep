import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import TimeSlider from "./audioPlayer/TimeSlider";
import VolumeControl from "./audioPlayer/VolumeControl";
import PlayPauseButton from "./audioPlayer/PlayPauseButton";
import ModeSelector from "./audioPlayer/ModeSelector";
// import NarratorSelector from "./audioPlayer/NarratorSelector";
import { useAudioContext } from "./audioPlayer/context/AudioContext";

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
    // narrator,
    isLoading,
    mode,
    togglePlay,
    handleTimeChange,
    handleVolumeChange,
    toggleMute,
    // handleNarratorChange,
    handleModeChange,
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
      <CardContent sx={{ p: 3 }}>
        <ModeSelector mode={mode} onChange={handleModeChange} />
        {/* <NarratorSelector narrator={narrator} onChange={handleNarratorChange} /> */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mt: 3,
            mb: 2,
            position: "relative",
            height: 40,
          }}
        >
          <Box
            sx={{
              mr: 2,
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 1,
            }}
          >
            <PlayPauseButton
              isPlaying={isPlaying}
              isLoading={isLoading}
              onClick={togglePlay}
            />
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              pl: 6,
              display: "flex",
              alignItems: "center",
              height: "100%",
            }}
          >
            <TimeSlider
              currentTime={currentTime}
              duration={duration}
              isLoading={isLoading}
              onChange={handleTimeChange}
            />
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 1 }}>
          <VolumeControl
            volume={volume}
            isMuted={isMuted}
            onVolumeChange={handleVolumeChange}
            onToggleMute={toggleMute}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

/**
 * Main AudioPlayer component
 */
const AudioPlayer = () => {
  return <AudioPlayerContent />;
};

export default AudioPlayer;
