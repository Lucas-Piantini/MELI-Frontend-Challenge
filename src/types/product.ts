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

export interface ProductDetail {
  id: string;
  title: string;
  price: number;
  original_price?: number;
  currency_id: string;
  available_quantity: number;
  sold_quantity: number;
  condition: string;
  permalink: string;
  pictures: {
    id: string;
    url: string;
  }[];
  installments?: {
    quantity: number;
    amount: number;
    rate: number;
    currency_id: string;
  };
  shipping: {
    free_shipping: boolean;
    mode?: string;
    logistic_type?: string;
    store_pick_up?: boolean;
  };
  seller_address: {
    city: {
      name: string;
    };
    state: {
      name: string;
    };
  };
  attributes: {
    id: string;
    name: string;
    value_name: string;
  }[];
  warranty?: string;
  description: {
    plain_text: string;
  };
  reviews?: {
    rating_average: number;
    total: number;
  };
}
