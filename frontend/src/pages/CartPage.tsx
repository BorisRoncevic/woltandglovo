import { useEffect } from "react";
import { completeOrder } from "../api/orderApi";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart, loading, removeItem, refresh } = useCart();

  useEffect(() => {
    console.log("REFRESHING CART...");
    refresh();
  }, []);
  
  console.log("CART STATE:", cart);
  console.log("LOADING:", loading);
  
  if (loading || cart === null) {
    console.log("STILL LOADING...");
    return <p>Loading...</p>;
  }
  
  if (!cart.items || cart.items.length === 0) {
    console.log("EMPTY CART");
    return <p>Korpa je prazna</p>;
  }
  
  console.log("RENDERING ITEMS:", cart.items);

  const handleRemove = async (id: number) => {
    await removeItem(id);
  };

  const handleOrder = async () => {
    await completeOrder();
    await refresh();
  };

  if (loading || cart === null) {
    return <p>Loading...</p>;
  }

  if (!cart.items || cart.items.length === 0) {
    return <p>Korpa je prazna</p>;
  }

  const total = cart.items.reduce(
    (sum, ci) => sum + ci.item.price * ci.quantity,
    0
  );

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto" }}>
      <h2>Korpa</h2>

      {cart.items.map(ci => (
        <div
          key={ci.item.id}  
          style={{
            border: "1px solid gray",
            marginBottom: "10px",
            padding: "10px"
          }}
        >
          <h4>{ci.item.name}</h4>
          <p>Količina: {ci.quantity}</p>
          <p>Cena: {ci.item.price * ci.quantity} RSD</p>

          <button onClick={() => handleRemove(ci.item.id)}>
            Ukloni
          </button>
        </div>
      ))}

      <h3>Ukupno: {total} RSD</h3>

      <button onClick={handleOrder}>
        Poruči
      </button>
    </div>
  );
}