import { IOrderItem } from "./iorder-item";

export interface IOrder {

  userName: string;
  userNumber: string;
  orderDate: string;
  totalPrice: number;
  address: string;
  notes: string;
  paymentWay: number;

  items: IOrderItem[];

}