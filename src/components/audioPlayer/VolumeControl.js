import React from "react";
import IconButton from "@mui/material/IconButton";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";

const VolumeControl = ({ volume, isMuted, onVolumeChange, onToggleMute }) => {
  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      sx={{ width: "30%" }}
    >
      <IconButton onClick={onToggleMute} size="small" color="inherit">
        {isMuted || volume === 0 ? <VolumeOffIcon /> : <VolumeUpIcon />}
      </IconButton>
      <Slider
        size="small"
        value={isMuted ? 0 : volume}
        max={1}
        min={0}
        step={0.01}
        onChange={onVolumeChange}
        aria-label="Volume"
        sx={{ color: "#ce93d8" }}
      />
    </Stack>
  );
};

export default VolumeControl;