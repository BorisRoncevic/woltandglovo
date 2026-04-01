const BASE_URL = "http://localhost:8080/items";

function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  };
}


export async function getItemsByRestaurant(restoranId:any) {
    const res = await fetch(`${BASE_URL}/restaurant/${restoranId}`);
    return res.json();
  }

export async function getItemById(id:any) {
  const res = await fetch(`${BASE_URL}/${id}`);
  return res.json();
}

export async function createItem(data:any) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw new Error("Failed to create item");
  }

  return res.json();
}