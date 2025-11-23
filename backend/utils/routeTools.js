// backend/utils/routeTools.js
import fetch from "node-fetch";

export async function callRouteAPI(type, source, destination) {
  try {
    const res = await fetch(
      `http://localhost:5000/api/${type}?source=${source}&destination=${destination}`
    );
    return await res.json();
  } catch (err) {
    return { error: "Route service unavailable" };
  }
}
