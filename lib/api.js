const API_URL = process.env.API_URL || "http://localhost:5000";

async function getJson(path) {
  try {
    const res = await fetch(`${API_URL}${path}`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    return null;
  }
}

// Latest six studio listings for the home page
export async function getFeaturedStudios() {
  return (await getJson("/api/studios?limit=6")) || [];
}

// Studios for the explore page. Returns null if the server could not be reached.
export async function getStudios({ category, search, sort } = {}) {
  const query = new URLSearchParams();
  if (category && category !== "all") query.set("category", category);
  if (search) query.set("search", search);
  if (sort) query.set("sort", sort);
  const queryString = query.toString();
  return await getJson(`/api/studios${queryString ? `?${queryString}` : ""}`);
}

// One studio by id. Returns null if it does not exist.
export async function getStudio(id) {
  return await getJson(`/api/studios/${id}`);
}