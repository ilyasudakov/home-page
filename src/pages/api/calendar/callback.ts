import type { APIRoute } from "astro";
import { google } from "googleapis";
import * as dotenv from "dotenv";

dotenv.config();

export const GET: APIRoute = async ({ request, cookies }) => {
  try {
    // Get the full URL from request
    const url = new URL(request.url);

    // Parse URL and get all parameters
    const params = Object.fromEntries(url.searchParams);
    const code = params.code;

    console.log("Parsed code: ", code);

    if (!code) {
      throw new Error("No authorization code provided");
    }

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      "http://localhost:4321/api/calendar/callback"
    );

    // Exchange code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    console.log("Received tokens:", {
      access_token: tokens.access_token ? "present" : "missing",
      refresh_token: tokens.refresh_token ? "present" : "missing",
    });

    // Store the tokens in cookies with minimal restrictions for local development
    if (tokens.access_token) {
      cookies.set("google_calendar_token", tokens.access_token, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        httpOnly: false, // Allow JavaScript access
        secure: false, // Allow HTTP for local development
        sameSite: "lax",
      });
    }

    if (tokens.refresh_token) {
      cookies.set("google_calendar_refresh_token", tokens.refresh_token, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
        httpOnly: true, // Keep refresh token secure
        secure: false, // Allow HTTP for local development
        sameSite: "lax",
      });
    }

    // Redirect back to integrations page
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/integrations",
      },
    });
  } catch (error: any) {
    console.error("Error in callback:", error);
    // Return more detailed error information
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        fullUrl: request.url,
        debugInfo: {
          url: request.url,
          headers: Object.fromEntries(request.headers.entries()),
          method: request.method,
        },
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
