import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import { formatTime } from "./utils";

const TimeSlider = ({ currentTime, duration, isLoading, onChange }) => {
  // If duration is 0 (not loaded yet), use a reasonable default
  const displayDuration = duration || 300; // 5 minutes default duration
  
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          px: 1,
          display: "flex",
          alignItems: "center",
          height: "50%",
          position: "relative",
        }}
      >
        <Slider
          value={currentTime}
          max={displayDuration}
          onChange={onChange}
          // Never disable the slider during narrator switching
          disabled={false}
          aria-label="audio timeline"
          size="small"
          sx={{
            color: "primary.main",
            height: 4,
            "& .MuiSlider-thumb": {
              width: 12,
              height: 12,
            },
            padding: "15px 0",
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          height: "50%",
        }}
      >
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ minWidth: "35px" }}
        >
          {formatTime(currentTime)}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
        >
          {formatTime(displayDuration)}
        </Typography>
      </Box>
    </Box>
  );
};

export default TimeSlider;
