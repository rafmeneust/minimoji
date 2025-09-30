// src/lib/api.js
import { auth } from "@/lib/firebaseClient";
import { apiPost } from "@/lib/api";
const { url } = await apiPost("/api/stripe-portal");
window.location.href = url;

export async function apiPost(path, body) {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");
  const idToken = await user.getIdToken();
  const res = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch { data = { raw: text }; }
  if (!res.ok) throw new Error(`${res.status} ${data?.error || text}`);
  return data;
}