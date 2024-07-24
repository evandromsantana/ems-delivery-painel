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
  TextField,
  Typography,
} from "@mui/material";
import { dateFormat } from "@/_libs/dateFormat";

const Page = () => {
  const [searchInput, setSerchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [printOrder, setPrintOrder] = useState<Order | null>(null);

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

  useEffect(() => {
    setSerchInput("");
    setFilteredOrders(orders);
  }, [orders]);

  const handleSearchKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code.toLowerCase() === "enter") {
      if (searchInput != "") {
        let newOrders: Order[] = [];

        for (let i in orders) {
          if (orders[i].id.toString() === searchInput) {
            newOrders.push(orders[i]);
          }
        }

        setFilteredOrders(newOrders);
      } else {
        setFilteredOrders(orders);
      }
    }
  };

  const handleChangeStatus = async (id: number, newStatus: OrderStatus) => {
    await api.changeOrderStatus(id, newStatus);
    getOrders();
  };

  const handlePrintAction = (order: Order) => {
    setPrintOrder(order);
    setTimeout(() => {
      if (window) window.print();
    }, 200);
  };

  return (
    <>
      {/* TODO: Depois ver theme */}
      <CssBaseline />
      <Box sx={{ my: 3, displayPrint: "none" }}>
        <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              component="h5"
              variant="h5"
              sx={{ color: "#555", mr: 2 }}
            >
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
            onChange={(e) => setSerchInput(e.target.value)}
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
            filteredOrders.map((item, index) => (
              <Grid key={index} item xs={1}>
                <OrderItem
                  item={item}
                  onchangeStatus={handleChangeStatus}
                  onPrint={handlePrintAction}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
      <Box sx={{ display: "none", displayPrint: "block" }}>
        {printOrder && (
          <>
            <Typography component="h5" variant="h5">
              Pedido
            </Typography>
            <Box>ID: #{printOrder.id}</Box>
            <Box>Data do pedido: {dateFormat(printOrder.OrderDate)}</Box>
            <Box>Cliente: {printOrder.userName}</Box>

            <Typography component="h5" variant="h5">
              Pagamento
            </Typography>
            <Box>
              Tipo de pagamento:
              {printOrder.paymentType === "card" ? "catão" : "Dinheiro"}
            </Box>
            <Box>Subtotal: R$ {printOrder.subtotal.toFixed(2)}</Box>
            <Box>Entrega: R$ {printOrder.shippingPrice.toFixed(2)}</Box>
            {printOrder.cupomDiscount && (
              <Box>Desconto: -R$ {printOrder.cupomDiscount.toFixed(2)}</Box>
            )}
            <Box>Total: R$ {printOrder.total.toFixed(2)}</Box>

            <Typography component="h5" variant="h5">
              Endereço
            </Typography>
            <Box>Rua: {printOrder.shippinAddress.address}</Box>
            <Box>Número: {printOrder.shippinAddress.number}</Box>
            <Box>Complemento: {printOrder.shippinAddress.complement}</Box>
            <Box>CEP: {printOrder.shippinAddress.cep}</Box>
            <Box>Bairro: {printOrder.shippinAddress.neighborhood}</Box>
            <Box>Cidade: {printOrder.shippinAddress.city}</Box>
            <Box>Estado: {printOrder.shippinAddress.state}</Box>

            <Typography component="h5" variant="h5">
              Itens
            </Typography>
            {printOrder.products.map((item, index) => (
              <Box key={index}>
                {item.qt}x {item.product.name}
              </Box>
            ))}
          </>
        )}
      </Box>
    </>
  );
};

export default Page;
