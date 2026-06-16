const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

export function getToken(): string | null {
  return localStorage.getItem("admin_token");
}

export function setToken(token: string | null) {
  if (token) localStorage.setItem("admin_token", token);
  else localStorage.removeItem("admin_token");
}

export async function api<T>(path: string, options?: RequestInit): Promise<T> {
  const token = getToken();
  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || "Request failed");
  }
  return res.json();
}
