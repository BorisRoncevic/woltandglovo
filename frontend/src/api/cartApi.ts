import { buildHeaders } from "../context/http";
const BASE_URL = "http://localhost:8080/cart";

export async function addToCart(
  itemId: number | string,
  {
    token,
    guestId,
  }: { token: string | null; guestId: string | null }
) {
  const res = await fetch(`${BASE_URL}/add?itemId=${itemId}`, {
    method: "POST",
    headers: buildHeaders({ token, guestId }),
  });

  if (!res.ok) {
    throw new Error("Failed to add item to cart");
  }
}

export async function getCart({
  token,
  guestId,
}: {
  token: string | null;
  guestId: string | null;
}) {
  const res = await fetch(BASE_URL, {
    headers: buildHeaders({ token, guestId }),
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    throw new Error("Failed to fetch cart");
  }

  return res.json();
}
export async function removeFromCart(
  itemId: number | string,
  {
    token,
    guestId,
  }: { token: string | null; guestId: string | null }
) {
  const res = await fetch(`${BASE_URL}/delete?itemId=${itemId}`, {
    method: "DELETE",
    headers: buildHeaders({ token, guestId }),
  });

  if (!res.ok) {
    throw new Error("Failed to remove item from cart");
  }
}
  export async function clearCart({
    token,
    guestId,
  }: {
    token: string | null;
    guestId: string | null;
  }) {
    const cart = await getCart({ token, guestId });
  
    if (!cart || !cart.items) return;
  
    for (const line of cart.items) {
      const id = line?.item?.id;
      if (id != null) {
        await removeFromCart(id, { token, guestId });
      }
    }
  }