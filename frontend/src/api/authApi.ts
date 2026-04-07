const BASE_URL = "http://localhost:8080/auth";

export async function login(data: any) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  const token = await res.text(); 
  return token;
}

export async function register(data: any) {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw new Error("Register failed");
  }

  return res.json();
}

export async function logout() {
  localStorage.removeItem("token");
  const newGuestid = crypto.randomUUID();
  localStorage.setItem("guestId",newGuestid);
}