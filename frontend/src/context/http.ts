export function buildHeaders({
    token,
    guestId,
  }: {
    token: string | null;
    guestId: string | null;
  }): Headers {
    const headers = new Headers();
  
    headers.append("Content-Type", "application/json");
  
    if (token) {
      headers.append("Authorization", `Bearer ${token}`);
    } else if (guestId) {
      headers.append("X-Guest-Id", guestId);
    }
  
    return headers;
  }