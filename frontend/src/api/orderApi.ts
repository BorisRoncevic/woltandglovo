import { buildHeaders } from "../context/http";
const BASE_URL = "http://localhost:8080/orders";

export async function completeOrder({ token }: { token: string | null }) {
  const res = await fetch(`${BASE_URL}/complete`, {
    method: "POST",
    headers: buildHeaders({ token, guestId: null }),
  });

  if (!res.ok) {
    throw new Error("Failed to complete order");
  }

  return res.json();
}

export async function getMyOrders({ token }: { token: string | null }) {
  const res = await fetch(`${BASE_URL}/myOrders`, {
    headers: buildHeaders({ token, guestId: null }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch orders");
  }

  return res.json();
}

export async function getPendingOrders({ token }: { token: string | null }) {
  const res = await fetch(`${BASE_URL}/pending`, {
    headers: buildHeaders({ token, guestId: null }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch pending orders");
  }

  return res.json();
}

export async function acceptOrder(
  orderId: number,
  { token }: { token: string | null }
) {
  const res = await fetch(`${BASE_URL}/${orderId}/accept`, {
    method: "POST",
    headers: buildHeaders({ token, guestId: null }),
  });

  if (!res.ok) {
    throw new Error("Failed to accept order");
  }

  return res.json();
}

export async function getOrderById(
  id: number,
  { token }: { token: string | null }
) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    headers: buildHeaders({ token, guestId: null }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch order");
  }

  return res.json();
}