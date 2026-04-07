import { buildHeaders } from "../context/http";
const BASE_URL = "http://localhost:8080/restaurants";

export async function getRestaurantsByCity(city: string) {
  const res = await fetch(`${BASE_URL}/${city}`);
  return res.json();
}

export async function getRestaurantById(id: number) {
  const res = await fetch(`${BASE_URL}/${id}`);
  return res.json();
}

export async function createRestaurant(
  data: any,
  { token }: { token: string | null }
) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: buildHeaders({ token, guestId: null }),
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create restaurant");
  }

  return res.json();
}