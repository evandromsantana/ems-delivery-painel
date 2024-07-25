import { Order } from "@/types/Order";
import { OrderStatus } from "@/types/OrderStatus";
import { Product } from "@/types/Product";
import { Category } from "@/types/Category";

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
  getCategories: async (): Promise<Category[]> => {
    const list: Category[] = [
      { id: 99, name: "Burgers" },
      { id: 98, name: "Refrigerantes" },
      { id: 97, name: "Doces" },
    ];
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(list);
      }, 200);
    });
  },
  getProducts: async (): Promise<Product[]> => {
    const list: Product[] = [
      { ...tmpProduct, id: 123 },
      { ...tmpProduct, id: 124 },
      { ...tmpProduct, id: 125 },
      { ...tmpProduct, id: 126 },
      { ...tmpProduct, id: 127 },
      { ...tmpProduct, id: 128 },
      { ...tmpProduct, id: 129 },
      { ...tmpProduct, id: 130 },
      { ...tmpProduct, id: 131 },
      { ...tmpProduct, id: 132 },
      { ...tmpProduct, id: 133 },
      { ...tmpProduct, id: 134 },
      { ...tmpProduct, id: 135 },
    ];
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(list);
      }, 500);
    });
  },
  deleteProduct: async (id: number): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  },
};
