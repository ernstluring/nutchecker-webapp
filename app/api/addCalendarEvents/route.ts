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

  const t = await gCal.calendars.insert({
    requestBody: {
      description: "Test",
      summary: "hello world",
    },
  });

  // const all = await gCal.calendarList.list();

  return NextResponse.json({});
}
