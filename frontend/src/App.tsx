import { Routes, Route } from "react-router-dom";


import HomePage from "./pages/HomePage";
import RestaurantsPage from "./pages/RestaurantsPage";
import RestaurantDetails from "./pages/RestaurantDetails";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreateRestaurantPage from "./pages/CreateRestaurantPage";
import CreateItemPage from "./pages/CreateItemPage";

export default function App() {
  return (
    <>

      <Routes>
        {/* home */}
        <Route path="/" element={<HomePage />} />

        {/* restorani po gradu */}
        <Route path="/restaurants/:city" element={<RestaurantsPage />} />

        {/* detalji restorana */}
        <Route path="/restaurant/:id" element={<RestaurantDetails />} />

        {/* auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* kreiranje */}
        <Route path="/create-restaurant" element={<CreateRestaurantPage />} />
        <Route path="/create-item/:restaurantId" element={<CreateItemPage />} />
      </Routes>
    </>
  );
}