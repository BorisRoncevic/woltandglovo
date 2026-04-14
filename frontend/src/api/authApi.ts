const BASE_URL = "http://localhost:8080";

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

  const result = await res.json(); 

  localStorage.setItem("token", result.token);

  localStorage.setItem("username", result.username);

  return result.token;
}

export async function register(data: any) {
  console.log("Saljem na backend:", data);

  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const text = await res.text();

  console.log("HTTP status:", res.status);
  console.log("Response body:", text);

  if (!res.ok) {
    throw new Error(text || "Register failed");
  }

  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return text;
  }
}

export async function logout() {
  localStorage.removeItem("token");
  const newGuestid = crypto.randomUUID();
  localStorage.setItem("guestId",newGuestid);
}