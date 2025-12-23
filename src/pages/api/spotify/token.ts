import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ cookies }) => {
  const token = cookies.get("spotify_access_token")?.value;

  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }

  return new Response(JSON.stringify({ token }), {
    headers: { "Content-Type": "application/json" },
  });
};
