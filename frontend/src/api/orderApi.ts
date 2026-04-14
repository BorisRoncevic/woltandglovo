import { buildHeaders, getAuth } from "../context/http";

const BASE_URL = "http://localhost:8080/orders";


export async function completeOrder() {
  const res = await fetch(`${BASE_URL}/complete`, {
    method: "POST",
    headers: buildHeaders(getAuth()),
  });

  if (!res.ok) {
    throw new Error("Failed to complete order");
  }

  return res.json();
}

export async function getMyOrders() {
  const res = await fetch(`${BASE_URL}/myOrders`, {
    headers: buildHeaders(getAuth()),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch orders");
  }

  return res.json();
}

export async function getOrdersByRestaurant(id: number) {
  const res = await fetch(`http://localhost:8080/orders/restaurant/${id}`, {
    headers: buildHeaders(getAuth()),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch orders");
  }

  return res.json();
}


export async function getPendingOrders() {
  const res = await fetch(`${BASE_URL}/pending`, {
    headers: buildHeaders(getAuth()),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch pending orders");
  }

  return res.json();
}


export async function acceptOrder(orderId: number) {
  const res = await fetch(`${BASE_URL}/${orderId}/accept`, {
    method: "POST",
    headers: buildHeaders(getAuth()),
  });

  if (!res.ok) {
    throw new Error("Failed to accept order");
  }

  return res.json();
}
export async function rejectOrder(orderId: number) {
  const res = await fetch(`${BASE_URL}/${orderId}/reject`, {
    method: "POST",
    headers: buildHeaders(getAuth()),
  });

  if (!res.ok) {
    throw new Error("Failed to reject order");
  }

  return res.json();
}
export async function pickedUp(orderId: number) {
  const res = await fetch(`${BASE_URL}/${orderId}/pickedUp`, {
    method: "POST",
    headers: buildHeaders(getAuth()),
  });

  if (!res.ok) {
    throw new Error("Failed to reject order");
  }

  return res.json();
}
export async function delivered(orderId: number) {
  const res = await fetch(`${BASE_URL}/${orderId}/delivered`, {
    method: "POST",
    headers: buildHeaders(getAuth()),
  });

  if (!res.ok) {
    throw new Error("Failed to reject order");
  }

  return res.json();
}

export async function getOrderById(id: number) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    headers: buildHeaders(getAuth()),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch order");
  }

  return res.json();
}