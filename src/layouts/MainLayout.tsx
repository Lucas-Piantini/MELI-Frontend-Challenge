import { SearchBar } from "../features/SearchBar/SearchBar";
import { Outlet } from "react-router-dom";

export const MainLayout = () => (
  <div className="min-h-screen bg-gray-100">
    <SearchBar />
    <main>
      <Outlet />
    </main>
  </div>
);
