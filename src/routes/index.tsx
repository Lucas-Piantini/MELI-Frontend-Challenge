import ProductDetailPage from "../features/ProductDetail/ProductDetailPage";
import { Routes, Route } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import ProductsList from "../features/ProductsList/ProductsList";
import HomeScreen from "../features/HomeScreen/HomeScreen";
import ProductsNotFound from "../features/ProductsList/Components/ProductsNotFound/EmptyScreen";
import ErrorScreen from "../features/ErrorScreen/ErrorScreen";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/products/:query" element={<ProductsList />} />
        <Route path="/products/not-found/" element={<ProductsNotFound />} />
        <Route path="/details/:id" element={<ProductDetailPage />} />
        <Route path="/error" element={<ErrorScreen />} />
      </Route>
    </Routes>
  );
}
