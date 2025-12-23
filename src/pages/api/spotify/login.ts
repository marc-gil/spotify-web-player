import type { APIRoute } from "astro";

export const GET: APIRoute = async (request) => {
  const clientId = import.meta.env.SPOTIFY_CLIENT_ID;
  const redirectUri = import.meta.env.SPOTIFY_REDIRECT_URI;

  const scopes = [
    "streaming",
    "user-read-email",
    "user-read-private",
    "user-modify-playback-state",
    "user-read-playback-state",
  ].join(" ");
  
  const state = request.url.searchParams.get("state");
  console.log("State " + state)

  const redirectUrl =
    "https://accounts.spotify.com/authorize?" +
    new URLSearchParams({
      response_type: "code",
      client_id: clientId,
      scope: scopes,
      state: state!,
      redirect_uri: redirectUri,
    });

  return Response.redirect(redirectUrl, 302);
}