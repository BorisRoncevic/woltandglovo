import { useEffect, useState } from "react";
import { getMyOrders ,delivered} from "../api/orderApi";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    getMyOrders().then(setOrders);
  }, []);

  if (!orders.length) {
    return <p>Nema porudžbina</p>;
  }

  const handleDelivered = async (orderId: number) => {
    await delivered(orderId);
    const updated = await getMyOrders(); 
    setOrders(updated);
  };

  return (
    <div>
      <h2>Moje porudžbine</h2>

      {orders.map(order => (
  <div
    key={order.id}
    style={{
      border: "1px solid gray",
      margin: "10px",
      padding: "10px"
    }}
  >
    <p>Status: {order.status}</p>
    <p>Restoran: {order.restaurant?.name}</p>

    {order.items.map((item: any) => (
      <div key={item.id}>
        <p>{item.item.name} x {item.quantity}</p>
      </div>
    ))}

    {/* ✔ Dugme samo za DELIVERING */}
    {order.status === "DELIVERING" && (
      <button onClick={() => handleDelivered(order.id)}>
        Delivered
      </button>
    )}
  </div>
))}
    </div>
  );
}