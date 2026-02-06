import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#000000", 
    },
    background: {
      default: "#ffffff",
      paper: "rgba(255,255,255,0.85)", 
    },
    text: {
      primary: "#000",
      secondary: "#6B7280",
    },
    grey: {
      100: "#F3F4F6",
      300: "#D1D5DB",
    },
  },

  typography: {
    fontFamily: "Satoshi, sans-serif",

    h3: {
      fontWeight: 800,
      fontSize: "32px",
      color: "#F3F4F6",
    },

    h4: {
      fontWeight: 800,
      fontSize: "24px",
    },

    body1: {
      fontSize: "16px",
      color: "#374151",
    },

    body2: {
      fontSize: "14px",
      color: "#F3F4F6",
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 16,
  },
});
