import React, { memo } from "react";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

/**
 * NarratorSelector component for selecting audio narrator
 * Used by: ../AudioPlayer.js
 * Can accept props directly or use the context
 * Memoized to prevent unnecessary re-renders
 */
const NarratorSelector = memo(({ narrator, onChange }) => {
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
        Choose your guide
      </Typography>
      
      <Stack 
        direction="row" 
        spacing={3} 
        justifyContent="center" 
        alignItems="center"
      >
        <FormControlLabel 
          value="peter" 
          control={
            <Radio 
              checked={narrator === "peter"} 
              onChange={onChange} 
              value="peter" 
              name="narrator-group"
              sx={{ padding: 0.75 }}
            />
          } 
          label="Peter" 
          sx={{ marginRight: 0 }}
        />
        <FormControlLabel
          value="brittney"
          control={
            <Radio 
              checked={narrator === "brittney"} 
              onChange={onChange} 
              value="brittney" 
              name="narrator-group"
              sx={{ padding: 0.75 }}
            />
          }
          label="Brittney"
          sx={{ marginLeft: 0 }}
        />
      </Stack>
    </Box>
  );
});

export default NarratorSelector;