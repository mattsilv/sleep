import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import { formatTime } from "./utils";

const TimeSlider = ({ currentTime, duration, isLoading, onChange }) => {
  return (
    <Box sx={{ mb: 1 }}>
      <Slider
        value={currentTime}
        max={duration || 100}
        onChange={onChange}
        disabled={isLoading}
        aria-label="audio timeline"
        sx={{ color: "#90caf9" }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          color: "text.secondary",
          fontSize: "0.75rem",
        }}
      >
        <Typography variant="caption">{formatTime(currentTime)}</Typography>
        <Typography variant="caption">{formatTime(duration)}</Typography>
      </Box>
    </Box>
  );
};

export default TimeSlider;