const BASE_URL = "http://localhost:8080/orders";

// 🔐 helper za JWT
function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  };
}

export async function completeOrder() {
    const res = await fetch(`${BASE_URL}/complete`, {
      method: "POST",
      headers: getAuthHeaders()
    });
  
    if (!res.ok) {
      throw new Error("Failed to complete order");
    }
  
    return res.json();
  }

  export async function getMyOrders() {
    const res = await fetch(`${BASE_URL}/myOrders`, {
      headers: getAuthHeaders()
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch orders");
    }
  
    return res.json();
  }

  export async function getPendingOrders() {
    const res = await fetch(`${BASE_URL}/pending`, {
      headers: getAuthHeaders()
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch pending orders");
    }
  
    return res.json();
  }


  export async function acceptOrder(orderId:any) {
    const res = await fetch(`${BASE_URL}/${orderId}/accept`, {
      method: "POST",
      headers: getAuthHeaders()
    });
  
    if (!res.ok) {
      throw new Error("Failed to accept order");
    }
  
    return res.json();
  }

  export async function getOrderById(id:any) {
    const res = await fetch(`${BASE_URL}/${id}`, {
      headers: getAuthHeaders()
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch order");
    }
  
    return res.json();
  }