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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import { Product } from "@/types/Product";
import { Category } from "@/types/Category";
import { ProductTableSkeleton } from "@/_components/ProductTableSkeleton";
import { ProductTableItem } from "@/_components/ProductTableItem";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [showDeleteDialog, setshowDeleteDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product>();
  const [loadingDelete, setLoadingDelete] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    setLoading(true);
    setProducts(await api.getProducts());
    setCategories(await api.getCategories());
    setLoading(false);
  };

  const handleNewProduct = () => {};

  const handleEditProduct = (product: Product) => {};

  // Delete Product
  const handleDeleteProduct = (product: Product) => {
    setProductToDelete(product);
    setshowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (productToDelete) {
      setLoadingDelete(true);
      await api.deleteProduct(productToDelete.id);
      setLoadingDelete(false);
      setshowDeleteDialog(false);
      getProducts();
    }
  };

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
              <TableCell sx={{ width: { xs: 50, md: 130 } }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && (
              <>
                <ProductTableSkeleton />
                <ProductTableSkeleton />
                <ProductTableSkeleton />
              </>
            )}
            {!loading &&
              products.map((item) => (
                <ProductTableItem
                  key={item.id}
                  item={item}
                  onEdit={handleEditProduct}
                  onDelete={handleDeleteProduct}
                />
              ))}
          </TableBody>
        </Table>

        <Dialog
          open={showDeleteDialog}
          onClose={() => (!loadingDelete ? setshowDeleteDialog(false) : null)}
        >
          <DialogTitle>
            Tem certeza que deseja deletar este produto?
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Não é possível voltar atrás após confirmar esta ação.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              disabled={loadingDelete}
              onClick={() => setshowDeleteDialog(false)}
            >
              Não
            </Button>
            <Button disabled={loadingDelete} onClick={handleConfirmDelete}>
              Sim
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default Page;
