import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { google } from "googleapis";
import { getAuthSession } from "@/lib/session";

export async function GET(request: Request) {
  const session = await getAuthSession();

  if (!session) {
    NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const accessToken = session?.accessToken as string;
  const refreshToken = session?.refreshToken as string;

  const gAuthClient = new google.auth.OAuth2({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  });
  gAuthClient.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  const gCal = google.calendar({
    auth: gAuthClient,
    version: "v3",
  });

  // First, let's check if the Nutchecker calendar already exists
  const allCalendars = await gCal.calendarList.list();
  const nutcheckerCal = allCalendars.data.items?.find((cal) => {
    return cal.summary === "Nutchecker Reminder";
  });
  if (nutcheckerCal) {
    // Fill it with reminder events
    return NextResponse.json({ message: nutcheckerCal.id });
  }

  // If the Nutchecker calender does not exists, we create it
  const createdCal = await gCal.calendars.insert({
    requestBody: {
      description: "Test",
      summary: "Nutchecker Reminder",
    },
  });

  // End fill it with reminder events

  return NextResponse.json({ message: createdCal.data.id });
}
