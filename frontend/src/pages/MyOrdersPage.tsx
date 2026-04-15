import { useEffect, useState } from "react";
import { getMyOrders, delivered } from "../api/orderApi";
import "../css/MyOrders.css";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    getMyOrders().then(setOrders);
  }, []);

  const handleDelivered = async (orderId: number) => {
    await delivered(orderId);
    const updated = await getMyOrders();
    setOrders(updated);
  };

  if (!orders.length) {
    return <p className="empty-text">Nema porudžbina</p>;
  }

  return (
    <div className="myorders-container">
      <h2 className="myorders-title">Moje porudžbine</h2>

      {orders.map(order => (
        <div key={order.id} className="order-card">

          <div className="order-header">
            <span className="order-status">{order.status}</span>
            <span>{order.restaurant?.name}</span>
          </div>

          <div className="order-items">
            {order.items.map((item: any) => (
              <div key={item.id} className="order-item">
                {item.item.name} x {item.quantity}
              </div>
            ))}
          </div>

          {order.status === "DELIVERING" && (
            <button
              className="order-button"
              onClick={() => handleDelivered(order.id)}
            >
              Delivered
            </button>
          )}
        </div>
      ))}
    </div>
  );
}