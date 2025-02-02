import type { APIRoute } from "astro";
import { google } from "googleapis";

export const GET: APIRoute = async ({ request, cookies }) => {
  const token = cookies.get("google_calendar_token")?.value;
  console.log("Found token in cookies:", token);

  if (!token) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), {
      status: 401,
    });
  }

  try {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: token });

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    // Get today's start and end
    const now = new Date();
    const endOfDay = new Date(now.setHours(23, 59, 59, 999));

    const response = await calendar.events.list({
      calendarId: "primary",
      timeMin: now.toISOString(),
      timeMax: endOfDay.toISOString(),
      maxResults: 3,
      singleEvents: true,
      orderBy: "startTime",
    });

    console.log("Event items:", response.data.items);

    const events =
      response.data.items?.map((event) => ({
        title: event.summary || "Untitled Event",
        description: event.description || "",
        time: event.start?.dateTime
          ? new Date(event.start.dateTime).toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })
          : "All day",
        status: event.status === "confirmed" ? "Confirmed" : "Tentative",
      })) || [];

    return new Response(JSON.stringify({ events }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching calendar events:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch calendar events" }),
      { status: 500 }
    );
  }
};
