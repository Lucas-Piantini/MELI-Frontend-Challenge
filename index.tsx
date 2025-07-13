import ProductDetailPage from "./src/features/ProductDetail/ProductDetailPage";
import { Routes, Route } from "react-router-dom";
import { MainLayout } from "./src/layouts/MainLayout";
import ProductsList from "./src/features/ProductsList/ProductsList";
import HomeScreen from "./src/features/HomeScreen/HomeScreen";
import ProductsNotFound from "./src/features/ProductsList/Components/ProductsNotFound/EmptyScreen";
import ErrorScreen from "./src/features/ErrorScreen/ErrorScreen";

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
