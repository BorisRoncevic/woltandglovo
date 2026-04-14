import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import HomePage from "./pages/HomePage";
import RestaurantsPage from "./pages/RestaurantsPage";
import RestaurantDetails from "./pages/RestaurantDetails";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreateRestaurantPage from "./pages/CreateRestaurantPage";
import CreateItemPage from "./pages/CreateItemPage";
import { CartProvider } from "./context/CartContext";
import OrdersPage from "./pages/OrdersPage";

import Navbar from "./components/Navbar";
import CartPage from "./pages/CartPage";
import MyRestaurants from "./pages/MyRestaurants";
import MyOrdersPage from "./pages/MyOrdersPage";

export default function App() {
  return (
    <CartProvider>
      <Navbar />   {/* 🔥 OVO FALI */}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/restaurants/:city" element={<RestaurantsPage />} />
        <Route path="/details/:id" element={<RestaurantDetails />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/create-restaurant"
          element={
            <ProtectedRoute>
              <CreateRestaurantPage />
            </ProtectedRoute>
          }
        />

<Route
  path="/my-orders"
  element={
    <ProtectedRoute>
      <MyOrdersPage />
    </ProtectedRoute>
  }
/>

        <Route
          path="/create-item/:restaurantId"
          element={
            <ProtectedRoute>
              <CreateItemPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-restaurants"
          element={
            <ProtectedRoute>
              <MyRestaurants />
            </ProtectedRoute>
          }
        />

        <Route
          path="/restaurant/:id/orders"
          element={<OrdersPage/>}
        />

        {/* 🔥 DODAJ OVO */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </CartProvider>
  );
}