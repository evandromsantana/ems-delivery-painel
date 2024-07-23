"use client";

import { OrderItem } from "@/_components/OrderItem";
import { api } from "@/_libs/api";
import { Order } from "@/types/Order";
import { Refresh, Search } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

const Page = () => {
  const [searchInput, setSerchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);

  const getOrders = async () => {
    setSerchInput("");
    setOrders([]);
    setLoading(true);
    const orderList: Order[] = await api.getOrders();
    setOrders(orderList);
    setLoading(false);
  };

  useEffect(() => {
    getOrders();
  }, []);

  const handleSearchInput = () => {};

  const handleSearchKey = () => {};

  return (
    <Box sx={{ my: 3 }}>
      <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography component="h5" variant="h5" sx={{ color: "#555", mr: 2 }}>
            Pedidos
          </Typography>
          {loading && <CircularProgress size={24} />}
          {!loading && (
            <Button
              onClick={getOrders}
              size="small"
              sx={{ justifyContent: { xs: "flex-start", md: "center" } }}
            >
              <Refresh />
              <Typography
                component="div"
                sx={{ color: "#555", display: { xs: "none", sm: "block" } }}
              >
                Atualizar
              </Typography>
            </Button>
          )}
        </Box>
        <TextField
          value={searchInput}
          onChange={handleSearchInput}
          onKeyUp={handleSearchKey}
          placeholder="Pesquise um pedido"
          variant="standard"
          disabled={loading}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Grid container spacing={3} columns={{ xs: 1, sm: 2, md: 4 }}>
        {loading && (
          <>
            <Grid item xs={1}>
              <Skeleton variant="rectangular" height={220} />
            </Grid>
            <Grid item xs={1}>
              <Skeleton variant="rectangular" height={220} />
            </Grid>
            <Grid item xs={1}>
              <Skeleton variant="rectangular" height={220} />
            </Grid>
            <Grid item xs={1}>
              <Skeleton variant="rectangular" height={220} />
            </Grid>
          </>
        )}
        {!loading &&
          orders.map((item, index) => (
            <Grid key={index} item xs={1}>
              <OrderItem item={item} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default Page;
