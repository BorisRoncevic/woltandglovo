import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../css/Navbar.css";

export default function Navbar() {
  const { isAuthenticated, user, logout, loading: authLoading } = useAuth();
  const { cart, loading: cartLoading } = useCart();

  const navigate = useNavigate();

  if (authLoading) return null;

  const itemCount =
    cart?.items?.reduce<number>(
      (sum, i) => sum + i.quantity,
      0
    ) ?? 0;

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h1 onClick={() => navigate("/")}>My App</h1>
      </div>

      <div className="nav-right">
        {isAuthenticated && (
          <>
            <button onClick={() => navigate("/create-restaurant")}>
              Create Restaurant
            </button>

            <button onClick={() => navigate("/my-restaurants")}>
              My Restaurants
            </button>

            <button onClick={() => navigate("/my-orders")}>
              My Orders
            </button>
          </>
        )}

        <div
          className="cart"
          onClick={() => navigate("/cart")}
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

            <button
              className="logout"
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