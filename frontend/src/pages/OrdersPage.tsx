import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getOrdersByRestaurant,
  acceptOrder,
  rejectOrder,
  pickedUp
} from "../api/orderApi";
import "../css/OrdersPage.css";

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

  const handlePickedUp = async (orderId: number) => {
    await pickedUp(orderId);
    loadOrders(); // 🔥 KLJUČNO
  };

  return (
    <div className="orders-container">
      <h2 className="orders-title">Porudžbine</h2>

      {orders.map(order => (
        <div key={order.id} className="order-card">

          <div className="order-status">
            Status: {order.status}
          </div>

          <div className="order-actions">

            {/* PENDING */}
            {order.status === "PENDING" && (
              <>
                <button
                  className="btn btn-accept"
                  onClick={() => handleAccept(order.id)}
                >
                  Accept
                </button>

                <button
                  className="btn btn-reject"
                  onClick={() => handleReject(order.id)}
                >
                  Reject
                </button>
              </>
            )}

            {/* PREPARING */}
            {order.status === "PREPARING" && (
              <button
                className="btn btn-picked"
                onClick={() => handlePickedUp(order.id)}
              >
                Picked Up
              </button>
            )}

          </div>
        </div>
      ))}
    </div>
  );
}