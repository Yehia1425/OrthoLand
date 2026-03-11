
export interface IProductSpec {
  id: number;
  name: string;
  description: string;
  price: number;
  picturesUrls: string[];
  size: string ;
  color: string ;
  rate: number;
  type: string ;
  stock: number;
  categoryId: number;
  soldNumber: number;
}