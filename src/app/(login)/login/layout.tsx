"use client";

import React, { useState } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import {
  AppBar,
  Toolbar,
  IconButton,
  Grid,
  Container,
  Box,
  Button,
  Typography,
  Link as MuiLink,
  CssBaseline,
} from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { deepOrange, grey } from "@mui/material/colors";

import LightModeIcon from "@mui/icons-material/LightMode";
import Brightness2Icon from "@mui/icons-material/Brightness2";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: deepOrange,
    text: {
      primary: "#fff",
      secondary: grey[500],
    },
  },
});

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const [theme, setTheme] = useState(lightTheme);

  const [icon, setIcon] = useState(<LightModeIcon />);

  const toggleTheme = () => {
    if (theme.palette.mode === "light") {
      setTheme(darkTheme);
      setIcon(<Brightness2Icon />);
    } else {
      setTheme(lightTheme);
      setIcon(<LightModeIcon />);
    }
  };

  const getLogoSrc = () => {
    if (theme.palette.mode === "light") {
      return "/logo-light.svg";
    } else {
      return "./logo-dark.svg";
    }
  };

  return (
    <html lang="pt-br">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppBar position="static">
            <Toolbar>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "start",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <img
                    src={getLogoSrc()}
                    alt="Logo"
                    width={100}
                    className="logo"
                  />
                  <Box
                    sx={{
                      m: 1,
                      filter: "drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.5))",
                    }}
                  >
                    <Typography variant="h6"> - Delivery</Typography>
                  </Box>
                </Box>

                <Grid item>
                  <IconButton edge="end" color="inherit" onClick={toggleTheme}>
                    {icon}
                  </IconButton>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                mt: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  filter: "drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <img
                  src={getLogoSrc()}
                  alt="Logo"
                  width={180}
                  className="logo"
                />

                <Typography variant="h3" marginLeft={1}>
                  - Delivery
                </Typography>
              </Box>

              <Typography component="h5" variant="h5">
                Painel do estabelecimento
              </Typography>

              {children}
            </Box>
          </Container>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default Layout;
