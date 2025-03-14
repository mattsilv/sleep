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
      main: "#90caf9",
    },
    secondary: {
      main: "#ce93d8",
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
              sx={{ flexGrow: 1, fontWeight: 300 }}
            >
              Sleep
            </Typography>

            <IconButton
              color="inherit"
              aria-label="information"
              onClick={handleOpenAbout}
              edge="end"
            >
              <InfoIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Container maxWidth="sm" className="content">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              py: 4,
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
              }}
            >
              Box Breathing Technique
            </Typography>

            <AudioPlayer />
          </Box>
        </Container>

        <AboutModal open={aboutOpen} onClose={handleCloseAbout} />
      </Box>
    </ThemeProvider>
  );
}

export default App;
