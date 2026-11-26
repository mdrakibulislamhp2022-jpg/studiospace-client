const API_URL = process.env.API_URL || "http://localhost:5000";

// Latest six studio listings for the home page
export async function getFeaturedStudios() {
  try {
    const res = await fetch(`${API_URL}/api/studios?limit=6`, { cache: "no-store" });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    return [];
  }
}