import { createContext, useContext, useState, useEffect } from "react";
import { getCart, addToCart, removeFromCart, clearCart } from "../api/cartApi";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {

  const { token } = useAuth();

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 učitaj cart kada se user uloguje
  useEffect(() => {

    if (!token) {
      setCart(null);
      setLoading(false);
      return;
    }

    loadCart();

  }, [token]);

  // 🔄 load cart
  const loadCart = async () => {
    try {
      const data = await getCart();
      setCart(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ➕ add item
  const addItem = async (itemId) => {
    await addToCart(itemId);
    await loadCart(); // refresh
  };

  // ➖ remove item
  const removeItem = async (itemId) => {
    await removeFromCart(itemId);
    await loadCart();
  };

  // 🧹 clear
  const clear = async () => {
    await clearCart();
    setCart(null);
  };

  return (
    <CartContext.Provider value={{
      cart,
      loading,
      addItem,
      removeItem,
      clear,
      refresh: loadCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

// custom hook
export function useCart() {
  return useContext(CartContext);
}