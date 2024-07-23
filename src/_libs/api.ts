import { Order } from "@/types/Order";
import { OrderStatus } from "@/types/OrderStatus";
import { Product } from "@/types/Product";

const tmpProduct: Product = {
  id: 999,
  image:
    "https://saopaulosecreto.com/wp-content/uploads/2022/10/Get-Burger-1024x683.jpg",
  category: { id: 99, name: "Burgers" },
  name: "Burgão Boladão",
  price: 35.3,
  description: "Um burger bolaão muito legal",
};

export const api = {
  login: async (
    email: string,
    password: string
  ): Promise<{ error: string; token?: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email !== "evandromsantana@hotmail.com") {
          resolve({ error: "E-mail e/ou senha não batem." });
        } else {
          resolve({ error: "", token: "123" });
        }
      }, 1000);
    });
  },
  forgotPassword: async (email: string): Promise<{ error: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ error: "" });
      }, 1000);
    });
  },
  redifinePassword: async (
    password: string,
    token: string
  ): Promise<{ error: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ error: "" });
      }, 1000);
    });
  },
  getOrders: async (): Promise<Order[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const orders: Order[] = [];
        const statuses: OrderStatus[] = ["preparing", "sent", "delivered"];

        for (let i = 0; i < 6; i++) {
          orders.push({
            id: parseInt("12" + i),
            status: statuses[Math.floor(Math.random() * 3)],
            OrderDate: "2024-01-03 18:30",
            userid: "1",
            userName: "Pedro",
            shippinAddress: {
              id: 99,
              cep: "99999999",
              address: "Rua bla bla",
              number: "1200",
              neighborhood: "Algum",
              city: "Teresina",
              state: "PI",
              complement: "AAAA2",
            },
            shippingPrice: 12,
            paymentType: "card",
            changeValue: 0,
            cupom: "BLA",
            cupomDiscount: 2,
            products: [
              { qt: 2, product: tmpProduct },
              {
                qt: 3,
                product: { ...tmpProduct, id: 888, name: "Burger Vegetariano" },
              },
            ],
            subtotal: 99,
            total: 120,
          });
        }

        resolve(orders);
      }, 1000);
    });
  },
  changeOrderStatus: async (id: number, newStatus: OrderStatus) => {
    return true;
  },
};
