// Calls the Express API through the /backend proxy so the JWT cookie is sent along.
// If the token cookie is missing or expired, it requests a fresh one once and retries.
export async function apiFetch(path, options = {}) {
  const run = () =>
    fetch(`/backend${path}`, {
      credentials: "include",
      ...options,
      headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    });

  let response = await run();

  if (response.status === 401) {
    const tokenResponse = await fetch("/api/token", { method: "POST" });
    if (tokenResponse.ok) {
      response = await run();
    }
  }

  return response;
}