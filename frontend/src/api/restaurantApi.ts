import { buildHeaders, getAuth } from "../context/http";

const BASE_URL = "http://localhost:8080/restaurants";

export async function getRestaurantsByCity(city: string) {
  const res = await fetch(`${BASE_URL}/city?city=${city}`);

  if (!res.ok) {
    throw new Error("Failed to fetch restaurants");
  }

  return res.json();
}

export async function getRestaurantById(id: number) {
  const res = await fetch(`${BASE_URL}/restaurant/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch restaurant");
  }

  return res.json();
}

export async function createRestaurant(data: any) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: buildHeaders(getAuth()),
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create restaurant");
  }

  return res.json();
}


export async function getMyRestaurants() {
  const res = await fetch(`${BASE_URL}/my`, {
    headers: buildHeaders(getAuth()), // 🔥 šalje Authorization header
  });

  if (!res.ok) {
    throw new Error("Failed to fetch my restaurants");
  }

  return res.json();
}