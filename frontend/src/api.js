export const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export async function listLinks() {
  const res = await fetch(`${API_BASE}/api/links`);
  return res.json();
}

export async function createLink(payload) {
  const res = await fetch(`${API_BASE}/api/links`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok) throw { status: res.status, body: data };
  return data;
}

export async function getLink(code) {
  const res = await fetch(`${API_BASE}/api/links/${code}`);
  if (!res.ok) throw res;
  return res.json();
}

export async function deleteLink(code) {
  const res = await fetch(`${API_BASE}/api/links/${code}`, { method: 'DELETE' });
  const data = await res.json();
  if (!res.ok) throw { status: res.status, body: data };
  return data;
}
