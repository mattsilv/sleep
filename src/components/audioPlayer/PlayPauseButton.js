import React from "react";
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

/**
 * A minimal play/pause button component
 */
const PlayPauseButton = ({ isPlaying, isLoading, onClick }) => (
  <IconButton
    onClick={onClick}
    disabled={isLoading}
    data-testid="play-pause-button"
    aria-label={isPlaying ? "Pause" : "Play"}
    sx={{
      bgcolor: "primary.main",
      color: "white",
      "&:hover": {
        bgcolor: "primary.dark",
      },
      width: 32,
      height: 32,
      p: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      "&.Mui-disabled": {
        bgcolor: "action.disabledBackground",
        color: "action.disabled",
      },
    }}
  >
    {isPlaying ? (
      <PauseIcon sx={{ fontSize: 16 }} />
    ) : (
      <PlayArrowIcon sx={{ fontSize: 16 }} />
    )}
  </IconButton>
);

export default PlayPauseButton;
