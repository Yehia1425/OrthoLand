export interface IOrderItem {
  name: string;
  price: number;
  quantity: number;
  description: string;
  itemTotalPrice: number;
  offerApplied: boolean;
  productId: number;
}