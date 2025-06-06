import React, { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import AudioPlayer from "./AudioPlayer";
import AboutModal from "./AboutModal";
import { useAudioContext } from "./audioPlayer/context/AudioContext";

const MainContent = () => {
  const [aboutOpen, setAboutOpen] = useState(false);
  const { mode } = useAudioContext();

  const handleOpenAbout = () => {
    setAboutOpen(true);
  };

  const handleCloseAbout = () => {
    setAboutOpen(false);
  };

  // Dynamic content based on mode
  const getTechniqueTitle = () => {
    return "Relax";
  };

  const getTechniqueDescription = () => {
    return "Learn more";
  };

  return (
    <Box className="app-container">
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 300, color: "#909090" }}
          >
            Relax
          </Typography>

          <IconButton
            aria-label="information"
            onClick={handleOpenAbout}
            edge="end"
            sx={{ color: "#909090" }}
          >
            <InfoIcon sx={{ fontSize: "150%" }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" className="content" sx={{ px: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            py: 5,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            align="center"
            sx={{
              fontWeight: 300,
              mb: 1,
              color: "#909090",
            }}
          >
            {getTechniqueTitle()}
          </Typography>
          
          <Typography 
            variant="body2" 
            component="p" 
            align="center"
            onClick={handleOpenAbout}
            sx={{
              color: "#707070",
              mb: 4,
              cursor: "pointer",
              textDecoration: "underline",
              textDecorationOpacity: 0.5,
              textDecorationThickness: "0.7px",
              textUnderlineOffset: "2px",
              "&:hover": {
                color: "#909090",
              }
            }}
          >
            {getTechniqueDescription()}
          </Typography>

          <AudioPlayer />

          <Box
            sx={{
              mt: 4,
              textAlign: "center",
              opacity: 0.6,
            }}
          >
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontSize: "99%" }}
            >
              a micro app for public good by{" "}
              <a
                href="https://www.silv.app"
                style={{
                  color: "inherit",
                  textDecoration: "underline",
                  textDecorationOpacity: 0.5,
                  textDecorationThickness: "0.7px",
                  textUnderlineOffset: "2px",
                }}
              >
                silv
              </a>
            </Typography>
          </Box>
        </Box>
      </Container>

      <AboutModal open={aboutOpen} onClose={handleCloseAbout} mode={mode} />
    </Box>
  );
};

export default MainContent;