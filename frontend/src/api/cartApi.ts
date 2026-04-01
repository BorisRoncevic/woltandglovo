const BASE_URL = "http://localhost:8080/items";

function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  };
}



export async function addToCart(itemId:any) {
    const res = await fetch(`${BASE_URL}/add?itemId=${itemId}`, {
      method: "POST",
      headers: getAuthHeaders()
    });
  
    if (!res.ok) {
      throw new Error("Failed to add item");
    }
  }


  export async function getCart() {
    const res = await fetch("http://localhost:8080/cart", {
      headers: getAuthHeaders()
    });
  
    return res.json();
  }

  export async function removeFromCart() {
    const res = await fetch("http://localhost:8080/cart/delete", {
      headers: getAuthHeaders()
    });
  
    return res.json();
  }