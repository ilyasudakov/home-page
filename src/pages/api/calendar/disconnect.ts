import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ cookies }) => {
  try {
    // Remove the tokens
    cookies.delete("google_calendar_token", { path: "/" });
    cookies.delete("google_calendar_refresh_token", { path: "/" });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
