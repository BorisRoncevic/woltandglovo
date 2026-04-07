import { completeOrder } from "../api/orderApi";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart, loading, removeItem, refresh } = useCart();


  const handleRemove = async (id: number) => {
    await removeItem(id);
  };


  const handleOrder = async () => {
    await completeOrder();
    await refresh(); 
  };

  if (loading) return <p>Loading...</p>;

  if (!cart || !cart.items || cart.items.length === 0) {
    return <p>Korpa je prazna</p>;
  }

  const total = cart.items.reduce(
    (sum, ci) => sum + ci.item.cena * ci.quantity,
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
          <p>Cena: {ci.item.cena * ci.quantity} RSD</p>

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