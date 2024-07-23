"use client";

import React, { useState } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Header } from "@/_components/Header";

import { Container } from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#90caf9",
      light: "#bbdefb",
      dark: "#64b5f6",
      contrastText: "#000",
    },
    secondary: {
      main: "#ffc107",
      light: "#ffeb3b",
      dark: "#ffb74d",
      contrastText: "#000",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#303f9f",
      light: "#78909c",
      dark: "#1976d2",
      contrastText: "#fff",
    },
    secondary: {
      main: "#dc004e",
      light: "#ec407a",
      dark: "#c51162",
      contrastText: "#000",
    },
    text: {
      primary: "#ffffff",
      secondary: grey[300],
    },
  },
});

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const [theme, setTheme] = useState(lightTheme);

  const [icon, setIcon] = useState(<LightModeIcon />);
  const [iconColor, setIconColor] = useState("#ffeb3b");

  const toggleTheme = () => {
    if (theme.palette.mode === "light") {
      setTheme(darkTheme);
      setIcon(<DarkModeIcon />);
      setIconColor("#fff");
    } else {
      setTheme(lightTheme);
      setIcon(<LightModeIcon />);
      setIconColor("#ffeb3b");
    }
  };

  const getLogoSrc = () => {
    return theme.palette.mode === "dark" ? "/logo-dark.svg" : "/logo-light.svg";
  };

  return (
    <html lang="pt-br">
      <body style={{ margin: 0 }}>
        <ThemeProvider theme={theme}>
          <Header />
          <Container component="section" maxWidth="lg">
            {children}
          </Container>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default Layout;
