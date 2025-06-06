import React, { memo } from "react";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

/**
 * ModeSelector component for selecting Sleep or Relax mode
 * Used by: ../AudioPlayer.js
 * Memoized to prevent unnecessary re-renders
 */
const ModeSelector = memo(({ mode, onChange }) => {
  return (
    <Box sx={{ mb: 2, width: "100%" }}>
      <Typography 
        variant="body2" 
        align="center" 
        sx={{ 
          color: "text.secondary", 
          mb: 1.5,
          fontWeight: 500 
        }}
      >
        Choose your technique
      </Typography>
      
      <Stack 
        direction="row" 
        spacing={3} 
        justifyContent="center" 
        alignItems="center"
      >
        <FormControlLabel 
          value="sleep" 
          control={
            <Radio 
              checked={mode === "sleep"} 
              onChange={onChange} 
              value="sleep" 
              name="mode-group"
              sx={{ padding: 0.75 }}
            />
          } 
          label="Sleep" 
          sx={{ marginRight: 0 }}
        />
        <FormControlLabel
          value="relax"
          control={
            <Radio 
              checked={mode === "relax"} 
              onChange={onChange} 
              value="relax" 
              name="mode-group"
              sx={{ padding: 0.75 }}
            />
          }
          label="Relax"
          sx={{ marginLeft: 0 }}
        />
      </Stack>
    </Box>
  );
});

export default ModeSelector;