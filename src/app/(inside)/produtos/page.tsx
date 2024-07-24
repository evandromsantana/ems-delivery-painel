"use client";

import React, { KeyboardEvent } from "react";
import { useEffect, useState } from "react";
import { api } from "@/_libs/api";

import { Order } from "@/types/Order";

import { OrderStatus } from "@/types/OrderStatus";

import { OrderItem } from "@/_components/OrderItem";
import { Refresh, Search } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  CssBaseline,
  Grid,
  InputAdornment,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { dateFormat } from "@/_libs/dateFormat";

const Page = () => {
  const [loading, setLoading] = useState(false);

  const handleNewProduct = () => {};

  return (
    <>
      {/* TODO: Depois ver theme */}
      <CssBaseline />
      <Box sx={{ my: 3 }}>
        <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}>
          <Typography component="h5" variant="h5" sx={{ color: "#555", mr: 2 }}>
            Produtos
          </Typography>
          <Button onClick={handleNewProduct}>Novo Produto</Button>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ width: 50, display: { xs: "none", md: "table-cell" } }}
              >
                ID
              </TableCell>
              <TableCell>Imagem</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                Preço
              </TableCell>
              <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                Categoria
              </TableCell>
              <TableCell sx={{ xs: 50, md: 130 }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody></TableBody>
        </Table>
      </Box>
    </>
  );
};

export default Page;
