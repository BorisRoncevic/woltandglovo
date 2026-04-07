import { buildHeaders, getAuth } from "../context/http";

const BASE_URL = "http://localhost:8080/items";


export async function getItemsByRestaurant(restaurantId: number) {
  const res = await fetch(`${BASE_URL}/restaurant/${restaurantId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch items");
  }

  return res.json();
}


export async function getItemById(id: number) {
  const res = await fetch(`${BASE_URL}/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch item");
  }

  return res.json();
}

export async function createItem(data: any) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: buildHeaders(getAuth()),
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create item");
  }

  return res.json();
}