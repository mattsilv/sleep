import React from "react";
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

/**
 * A minimal play/pause button component that directly calls togglePlay
 */
const PlayPauseButton = ({ isPlaying, isLoading, onClick }) => (
  <IconButton
    onClick={onClick}
    size="large"
    disabled={isLoading}
    data-testid="play-pause-button"
    aria-label={isPlaying ? "Pause" : "Play"}
    sx={{
      bgcolor: "primary.main",
      color: "background.default",
      "&:hover": {
        bgcolor: "primary.dark",
      },
      width: 56,
      height: 56,
      "&.Mui-disabled": {
        bgcolor: "action.disabledBackground",
        color: "action.disabled",
      },
    }}
  >
    {isPlaying ? (
      <PauseIcon fontSize="large" />
    ) : (
      <PlayArrowIcon fontSize="large" />
    )}
  </IconButton>
);

export default PlayPauseButton;
