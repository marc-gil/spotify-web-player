import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ url, request, cookies }) => {
  const code = url.searchParams.get("code");

  const state = url.searchParams.get("state");

  if (!code) {
    return new Response("Missing code", { status: 400 });
  }

  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        btoa(`${import.meta.env.SPOTIFY_CLIENT_ID}:${import.meta.env.SPOTIFY_CLIENT_SECRET}`),
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: import.meta.env.SPOTIFY_REDIRECT_URI,
    }),
  });

  const token = await tokenRes.json();

  if (!token.access_token) {
    return new Response("Token exchange failed", { status: 500 });
  }

  // Store token securely
  cookies.set("spotify_access_token", token.access_token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: token.expires_in,
  });

  const redirectUrl = new URL(`/track/${state}`, request.url);
  return Response.redirect(redirectUrl.toString(), 302);
}