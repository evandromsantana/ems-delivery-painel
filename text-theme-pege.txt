"use client";

import React, { useState, FormEvent, ReactNode } from "react";
import Link from "next/link";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Link as MuiLink,
  CssBaseline,
} from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { amber, deepOrange, grey } from "@mui/material/colors";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
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

const Page = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailField, setEmailField] = useState("");
  const [passwordField, setPasswordField] = useState("");
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!emailField || !passwordField) {
      setError("Preencha e-mail e senha.");
      return;
    }

    setError("");
    setLoading(true);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ p: 2 }}>
          <Button
            variant="contained"
            onClick={toggleTheme}
            size="small"
            sx={{ mt: 2, display: "flex", mx: "auto" }}
            endIcon={icon}
          >
            Trocar Tema
          </Button>

          <Typography
            component="p"
            sx={{ textAlign: "center", mt: 2, color: "#555" }}
          >
            Digite seus dados para entrar no painel administrativo do
            estabelecimento e gerenciar produtos/pedidos.
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              label="Digite seu e-mail"
              name="email"
              fullWidth
              autoFocus
              sx={{ mb: 2 }}
              onChange={(e) => setEmailField(e.target.value)}
              value={emailField}
              disabled={loading}
            />
            <TextField
              label="Digite sua senha"
              name="password"
              type="password"
              fullWidth
              sx={{ mb: 2 }}
              onChange={(e) => setPasswordField(e.target.value)}
              value={passwordField}
              disabled={loading}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
            >
              {loading ? "Carregando..." : "Entrar"} <ExitToAppIcon />
            </Button>

            {error && (
              <Alert variant="filled" severity="error" sx={{ mt: 3 }}>
                {error}
              </Alert>
            )}

            <Box sx={{ mt: 3 }}>
              <MuiLink href="/login/forgot" variant="body2" component={Link}>
                Esqueceu sua senha?
              </MuiLink>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Page;
