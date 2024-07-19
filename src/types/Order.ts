import { Address } from "./Address";
import { CartItem } from "./CartItem";
import { OrderStatus } from "./OrderStatus";

export type Order = {
  id: number;
  status: OrderStatus;
  OrderDate: string;
  userid: string;
  userName?: string;
  shippinAddress: Address;
  shippingPrice: number;
  paymentType: "card" | "money";
  changeValue?: number;
  cupom?: string;
  cupomDiscount?: number;
  products: CartItem[];
  subtotal: number;
  total: number;
};
