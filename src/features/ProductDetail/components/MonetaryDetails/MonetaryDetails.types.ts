export default interface MonetaryDetailsProps {
  title: string;
  price: number;
  original_price?: number;
  installments?: { quantity: number; amount: number };
  shipping: { free_shipping: boolean };
  condition: string;
  warranty?: string;
  seller_address: { city: { name: string }; state: { name: string } };
  sold_quantity: number;
  reviews?: { rating_average: number; total: number };
}