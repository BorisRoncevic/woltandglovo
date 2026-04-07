import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import type { CartItem } from "../model/model";

export default function Navbar() {
  const { isAuthenticated, user, logout, loading: authLoading } = useAuth();
  const { cart, loading: cartLoading } = useCart();

  const navigate = useNavigate();

  if (authLoading) return null;

  const itemCount =
    cart?.items?.reduce(
      (sum: number, i: CartItem) => sum + i.quantity,
      0
    ) ?? 0;

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h1 onClick={() => navigate("/")}>My App</h1>
      </div>

      <div className="nav-right">
        <div
          className="cart"
          onClick={() => navigate("/cart")}
          style={{ cursor: "pointer" }}
        >
          🛒
          {!cartLoading && itemCount > 0 && (
            <span className="badge">{itemCount}</span>
          )}
        </div>

        {!isAuthenticated ? (
          <>
            <button onClick={() => navigate("/login")}>
              Login
            </button>
            <button onClick={() => navigate("/register")}>
              Register
            </button>
          </>
        ) : (
          <>
            <span className="user">{user?.username}</span>
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}