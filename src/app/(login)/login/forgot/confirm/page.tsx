"use client";

import React, { useState, FormEvent } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  LinearProgress,
} from "@mui/material";
import KeyIcon from "@mui/icons-material/Key";

import { api } from "@/_libs/api";

const Page = () => {
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordField, setPasswordField] = useState("");
  const [passwordField2, setPasswordField2] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!passwordField || !passwordField2) {
      setError("Preencha a senha.");
      return;
    }

    if (passwordField !== passwordField2) {
      setError("As senhas não batem.");
      return;
    }

    setError("");
    setInfo("");
    setLoading(true);
    const result = await api.redifinePassword(passwordField, "123");
    setLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      setInfo("Senha redefinida, agora você pode fazer o login.");
      setPasswordField("");
      setPasswordField2("");
    }
  };

  return (
    <>
      <Typography
        component="p"
        sx={{ textAlign: "center", mt: 2, color: "#555" }}
      >
        Olá **USUARIO**, defina sua nova senha abaixo.
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          label="Digite sua nova senha"
          name="password"
          type="password"
          fullWidth
          autoFocus
          sx={{ mb: 2 }}
          onChange={(e) => setPasswordField(e.target.value)}
          value={passwordField}
          disabled={loading}
        />
        <TextField
          label="confirme seu nova senha"
          name="password2"
          type="password"
          fullWidth
          autoFocus
          sx={{ mb: 2 }}
          onChange={(e) => setPasswordField2(e.target.value)}
          value={passwordField2}
          disabled={loading}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          endIcon={<KeyIcon />}
        >
          {loading ? (
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          ) : (
            "Definir nova senha"
          )}
        </Button>

        {error && (
          <Alert variant="filled" severity="error" sx={{ mt: 3 }}>
            {error}
          </Alert>
        )}
        {info && (
          <Alert variant="filled" severity="success" sx={{ mt: 3 }}>
            {info}
          </Alert>
        )}
      </Box>
    </>
  );
};

export default Page;
