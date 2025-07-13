export interface Product {
  id: string;
  title: string;
  price: number;
  original_price?: number;
  discount?: number;
  currency_id: string;
  condition: string;
  thumbnail?: string;
  installments?: {
    quantity: number;
    amount: number;
  };
  shipping?: {
    free_shipping: boolean;
    arrive_date?: string;
  };
  reviews?: {
    rating_average: number;
    total: number;
  };
  official_store_name?: string;
  seller?: string;
  variations?: string[];
}
