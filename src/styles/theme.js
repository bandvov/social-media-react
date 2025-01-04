import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2", // Blue
    },
    secondary: {
      main: "#dc004e", // Pink
    },
    background: {
      default: "#fafafa", // Light gray
    },
    text: {
      primary: "#000000", // Black text
      secondary: "#757575", // Gray text
    },
  },
  typography: {
    h1: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 500,
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark", // Enable dark mode
    primary: {
      main: "#fafafa",
    },
    secondary: {
      main: "#03dac6",
    },
    background: {
      default: " #333333", // Light gray
    },
    text: {
      primary: "#fafafa",
      secondary: "#e0e0e0",
    },
  },
  typography: {
    h1: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 500,
    },
  },
});
