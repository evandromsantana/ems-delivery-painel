"use client";

import React from "react";
import { useState } from "react";
import Link from "next/link";
import { Margin, Menu } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Grid,
  CssBaseline,
} from "@mui/material";

import { useRouter } from "next/navigation";
import { grey } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import { HeaderDrawer } from "./HeaderDrawer";

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

export const Header = () => {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const pageTitle = " Painel Delivery";

  const handleLogout = () => {
    router.push("/login");
  };

  const handleDrowerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

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
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar
          component="nav"
          position="relative"
          sx={{ displayPrint: "none" }}
        >
          <Toolbar style={{ justifyContent: "space-between" }}>
            <IconButton
              color="inherit"
              edge="start"
              sx={{
                display: { sm: "none" },
              }}
              onClick={handleDrowerToggle}
            >
              <Menu />
            </IconButton>
            <Typography
              component="div"
              variant="h6"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              {/* Logo */}
              <Link
                href="/"
                style={{
                  color: "#FFF",
                  alignItems: "center",
                  textDecoration: "none",
                  filter: "drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.5))",
                }}
              >
                <img
                  src={getLogoSrc()}
                  alt="Logo"
                  width={80}
                  className="logo"
                />
                {pageTitle}
              </Link>
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Link href="/pedidos" style={{ textDecoration: "none" }}>
                <Button sx={{ color: "#FFF" }}>Pedidos</Button>
              </Link>
              <Link href="/produtos" style={{ textDecoration: "none" }}>
                <Button sx={{ color: "#FFF" }}>Produtos</Button>
              </Link>
              <Link href="/categorias" style={{ textDecoration: "none" }}>
                <Button sx={{ color: "#FFF" }}>Categorias</Button>
              </Link>
              <Button onClick={handleLogout} sx={{ color: "#FFF" }}>
                Sair
              </Button>
            </Box>
            <Grid item>
              {/* Button */}
              <IconButton
                size="small"
                edge="end"
                color="inherit"
                onClick={toggleTheme}
                style={{
                  marginRight: "4px",
                  padding: "4px",
                  backgroundColor:
                    theme.palette.mode === "dark" ? "#303f9f" : "#bbdefb",
                  borderRadius: "50%",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#fa8f04")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    theme.palette.mode === "dark" ? "#303f9f" : "#bbdefb")
                }
              >
                {React.cloneElement(icon, {
                  style: { fontSize: "18px", color: iconColor },
                })}
              </IconButton>
            </Grid>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <HeaderDrawer
            open={drawerOpen}
            onClose={handleDrowerToggle}
            title={pageTitle}
            onLogout={handleLogout}
          />
        </Box>
      </ThemeProvider>
    </>
  );
};
