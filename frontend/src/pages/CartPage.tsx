import { useEffect } from "react";
import { completeOrder } from "../api/orderApi";
import { useCart } from "../context/CartContext";
import "../css/CartPage.css";

export default function CartPage() {
  const { cart, loading, removeItem, refresh } = useCart();

  useEffect(() => {
    refresh();
  }, []);

  if (loading || cart === null) {
    return <p className="empty-text">Loading...</p>;
  }

  if (!cart.items || cart.items.length === 0) {
    return <p className="empty-text">Korpa je prazna</p>;
  }

  const handleRemove = async (id: number) => {
    await removeItem(id);
  };

  const handleOrder = async () => {
    await completeOrder();
    await refresh();
  };

  const total = cart.items.reduce(
    (sum, ci) => sum + ci.item.price * ci.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h2 className="cart-title">Korpa</h2>

      {cart.items.map(ci => (
        <div key={ci.item.id} className="cart-item">
          <div className="cart-item-name">{ci.item.name}</div>

          <div className="cart-item-info">
            Količina: {ci.quantity}
          </div>

          <div className="cart-item-info">
            Cena: {ci.item.price * ci.quantity} RSD
          </div>

          <button
            className="cart-remove"
            onClick={() => handleRemove(ci.item.id)}
          >
            Ukloni
          </button>
        </div>
      ))}

      <div className="cart-total">
        Ukupno: {total} RSD
      </div>

      <button className="cart-order" onClick={handleOrder}>
        Poruči
      </button>
    </div>
  );
}