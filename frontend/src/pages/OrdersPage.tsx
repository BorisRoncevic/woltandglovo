import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrdersByRestaurant, acceptOrder, rejectOrder, pickedUp } from "../api/orderApi";

export default function OrdersPage() {
  const { id } = useParams();
  const [orders, setOrders] = useState<any[]>([]);

  const loadOrders = () => {
    if (!id) return;
    getOrdersByRestaurant(Number(id)).then(setOrders);
  };

  useEffect(() => {
    loadOrders();
  }, [id]);

  const handleAccept = async (orderId: number) => {
    await acceptOrder(orderId);
    loadOrders(); 
  };

  const handleReject = async (orderId: number) => {
    await rejectOrder(orderId);
    loadOrders(); 
  };

  return (
    <div>
      <h2>Porudžbine</h2>

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

    {/* PENDING */}
    {order.status === "PENDING" && (
      <>
        <button onClick={() => handleAccept(order.id)}>
          Accept
        </button>

        <button onClick={() => handleReject(order.id)}>
          Reject
        </button>
      </>
    )}

    {/* ACCEPTED */}
    {order.status === "PREPARING" && (
      <button onClick={() => pickedUp(order.id)}>
        Picked Up
      </button>
    )}

  </div>
))}
    </div>
  );
}