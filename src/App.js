import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AudioProvider } from "./components/audioPlayer/context/AudioContext";
import MainContent from "./components/MainContent";

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
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AudioProvider>
        <MainContent />
      </AudioProvider>
    </ThemeProvider>
  );
}

export default App;
