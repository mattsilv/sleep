import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

/**
 * NarratorSelector component for selecting audio narrator
 * Used by: ../AudioPlayer.js
 * Can accept props directly or use the context
 */
const NarratorSelector = ({ narrator, onChange }) => {
  return (
    <FormControl component="fieldset" sx={{ mb: 2, width: "100%" }}>
      <FormLabel component="legend" sx={{ color: "text.secondary", mb: 1 }}>
        Choose your guide:
      </FormLabel>
      <RadioGroup
        row
        aria-label="narrator"
        name="narrator-group"
        value={narrator}
        onChange={onChange}
        sx={{ justifyContent: "center" }}
      >
        <FormControlLabel value="peter" control={<Radio />} label="Peter" />
        <FormControlLabel
          value="brittney"
          control={<Radio />}
          label="Brittney"
        />
      </RadioGroup>
    </FormControl>
  );
};

export default NarratorSelector;