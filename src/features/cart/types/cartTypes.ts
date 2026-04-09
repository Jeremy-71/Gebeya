export interface CartResponse {
  carts: {
    id: number;

    products: {
      id: number;
      title: string;
      price: number;
      quantity: number;
      total: number;
      discountPercentage: number;
      discountedTotal: number;
      thumbnail: string;
    }[];

    total?: number;
    discountedTotal?: number;
    userId?: number;
    totalProducts?: number;
    totalQuantity?: number;

  }[];

  // pagination info (if API supports it)
  total?: number;
  skip?: number;
  limit?: number;
}