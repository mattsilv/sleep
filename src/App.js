import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import AudioPlayer from "./components/AudioPlayer";
import AboutModal from "./components/AboutModal";

// Create dark theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#a0a0a0",
    },
    secondary: {
      main: "#a0a0a0",
    },
    text: {
      primary: "#b0b0b0",
      secondary: "#909090",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 300,
    },
    h2: {
      fontWeight: 300,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 28,
        },
      },
    },
  },
});

function App() {
  const [aboutOpen, setAboutOpen] = useState(false);

  const handleOpenAbout = () => {
    setAboutOpen(true);
  };

  const handleCloseAbout = () => {
    setAboutOpen(false);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box className="app-container">
        <AppBar position="static" color="transparent" elevation={0}>
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, fontWeight: 300, color: "#909090" }}
            >
              Sleep
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
                mb: 4,
                color: "#909090",
              }}
            >
              Box Breathing Technique
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
                sx={{ fontSize: "110%" }}
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

        <AboutModal open={aboutOpen} onClose={handleCloseAbout} />
      </Box>
    </ThemeProvider>
  );
}

export default App;
