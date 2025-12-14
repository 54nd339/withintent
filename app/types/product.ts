export type ProductStatus = "AVAILABLE" | "RESERVED" | "SOLD";

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  status: ProductStatus;
  image: string;
  hoverImage: string;
}
