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

  const result = await res.json(); // ✔

  // sačuvaj token
  localStorage.setItem("token", result.token);

  // opcionalno:
  localStorage.setItem("username", result.username);

  return result;
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