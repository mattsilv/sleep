import React, { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TimerIcon from "@mui/icons-material/Timer";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";

const SleepTimer = ({ sleepTimer, onSetTimer }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTimerSelection = (minutes) => {
    onSetTimer(minutes);
    handleClose();
  };

  return (
    <Box sx={{ width: "30%", display: "flex", justifyContent: "flex-end" }}>
      <IconButton
        aria-label="sleep timer"
        onClick={handleClick}
        color={sleepTimer ? "primary" : "inherit"}
      >
        <TimerIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={() => handleTimerSelection(0)}>Off</MenuItem>
        <MenuItem onClick={() => handleTimerSelection(5)}>5 minutes</MenuItem>
        <MenuItem onClick={() => handleTimerSelection(10)}>10 minutes</MenuItem>
        <MenuItem onClick={() => handleTimerSelection(15)}>15 minutes</MenuItem>
        <MenuItem onClick={() => handleTimerSelection(30)}>30 minutes</MenuItem>
        <MenuItem onClick={() => handleTimerSelection(45)}>45 minutes</MenuItem>
        <MenuItem onClick={() => handleTimerSelection(60)}>60 minutes</MenuItem>
      </Menu>
    </Box>
  );
};

export default SleepTimer;