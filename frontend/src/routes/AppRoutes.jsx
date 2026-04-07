import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import RestaurantsPage from "./pages/RestaurantsPage";
import RestaurantDetails from "./pages/RestaurantDetails";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreateRestaurantPage from "./pages/CreateRestaurantPage";
import CreateItemPage from "./pages/CreateItemPage";

import Navbar from "./components/Navbar";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/restaurants/:city" element={<RestaurantsPage />} />
        <Route path="/restaurant/:id" element={<RestaurantDetails />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/create-restaurant" element={<CreateRestaurantPage />} />
        <Route path="/create-item/:restaurantId" element={<CreateItemPage />} />
      </Routes>
    </>
  );
}