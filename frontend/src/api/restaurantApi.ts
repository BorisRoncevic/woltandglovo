const BASE_URL = "http://localhost:8080/restaurants";

function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  };
}

export async function getRestaurantsByCity(city:any) {
    const res = await fetch(`${BASE_URL}/${city}`);
    return res.json();
  }

  export async function getRestaurantById(id:any) {
    const res = await fetch(`${BASE_URL}/${id}`);
    return res.json();
  }

  export async function createRestaurant(data:any) {
    const res = await fetch("http://localhost:8080/restaurants", {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
  
    if (!res.ok) {
      throw new Error("Failed to create restaurant");
    }
  
    return res.json();
  }