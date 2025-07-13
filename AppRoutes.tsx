import { Routes as RouterRoutes, Route } from "react-router-dom";
import ProductDetailPage from "./src/features/ProductDetail/ProductDetailPage";
import { MainLayout } from "./src/layouts/MainLayout";
import ProductsList from "./src/features/ProductsList/ProductsList";
import HomeScreen from "./src/features/HomeScreen/HomeScreen";
import ProductsNotFound from "./src/features/ProductsList/Components/EmptyScreen/EmptyScreen";
import ErrorScreen from "./src/features/ErrorScreen/ErrorScreen";

const AppRoutes = () => {
  return (
    <RouterRoutes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/products/:query" element={<ProductsList />} />
        <Route path="/products/not-found" element={<ProductsNotFound />} />
        <Route path="/details/:id" element={<ProductDetailPage />} />
        <Route path="/error" element={<ErrorScreen />} />
      </Route>
    </RouterRoutes>
  );
};

export default AppRoutes;
