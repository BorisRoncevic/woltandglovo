import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

import {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
} from "../api/cartApi";

import { useAuth } from "./AuthContext";

export interface CartContextValue {
  cart: Cart | null;
  loading: boolean;
  addItem: (itemId: number | string) => Promise<void>;
  removeItem: (itemId: number | string) => Promise<void>;
  clear: () => Promise<void>;
  refresh: () => Promise<void>;
}

export type CartItem = {
  id: number;
  quantity: number;
  name: string;
};

export type Cart = {
  items: CartItem[];
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { token, guestId } = useAuth();

  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const loadCart = async () => {
    if ((!token && !guestId) || loading) return;

    setLoading(true);

    try {
      const data = await getCart({ token, guestId });
      setCart(data);
    } catch (err: any) {
      if (err.message === "Unauthorized") {
        setCart(null);
        return;
      }

      console.error("Cart error:", err);
      setCart(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInitialized(false);
  }, [token, guestId]);

  useEffect(() => {
    if (!token && !guestId) {
      setCart(null);
      return;
    }

    if (initialized) return;

    setInitialized(true);
    void loadCart();
  }, [token, guestId, initialized]);


  const addItem = async (itemId: number | string) => {
    if (!token && !guestId) return;

    await addToCart(itemId, { token, guestId });
    await loadCart();
  };

  const removeItem = async (itemId: number | string) => {
    if (!token && !guestId) return;

    await removeFromCart(itemId, { token, guestId });
    await loadCart();
  };

  const clear = async () => {
    if (!token && !guestId) {
      setCart(null);
      return;
    }

    await clearCart({ token, guestId });
    setCart(null);
  };

  const refresh = async () => {
    if (!token && !guestId) return;
    await loadCart();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addItem,
        removeItem,
        clear,
        refresh,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);

  if (ctx === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return ctx;
}