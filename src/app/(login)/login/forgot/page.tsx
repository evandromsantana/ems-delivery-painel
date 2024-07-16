"use client";

import React, { useState, FormEvent } from "react";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";

import { api } from "@/_libs/api";

const Forgot = () => {
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailField, setEmailField] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!emailField) {
      setError("Preencha o seu e-mail.");
      return;
    }

    setError("");
    setInfo("");
    setLoading(true);
    const result = await api.forgotPassword(emailField);
    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      setInfo("Enviamos um e-mail para recuperação da sua senha.");
    }
  };

  return (
    <>
      <Typography
        component="p"
        sx={{ textAlign: "center", mt: 2, color: "#555" }}
      >
        Deseja recuperar sua senha?
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

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          endIcon={<LockOpenIcon />}
        >
          {loading ? "Carregando..." : "Recuperar senha"}
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

export default Forgot;
