import { google, calendar_v3 } from "googleapis";

import { getAuthSession } from "@/lib/session";
import { isGoogleProvider } from "@/lib/provider";
import { NextResponse } from "next/server";

function getNextThursday() {
  var today = new Date();
  // Get the current day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  var currentDay = today.getDay();

  // Calculate the number of days until Thursday
  var daysUntilThursday = 4 - currentDay;
  if (daysUntilThursday <= 0) {
    daysUntilThursday += 7; // If it's already Thursday, add 7 days for the next week
  }

  // Add the number of days to the current date
  var nextThursday = new Date(today);
  nextThursday.setDate(today.getDate() + daysUntilThursday);

  return nextThursday;
}

function formatDateToYMD(date: Date) {
  let day = date.getDate();
  let month = date.getMonth() + 1; // Note: January is 0
  let year = date.getFullYear();

  // Format day and month to have leading zeroes if they are single-digit
  let formattedDay = day < 10 ? "0" + day : day.toString();
  let formattedMonth = month < 10 ? "0" + month : month.toString();

  // Create the formatted date string in the format: day-month-year
  return `${year}-${formattedMonth}-${formattedDay}`;
}

export const maxDuration = 20;

// This route is used as callback from the Google OAuth provider.
// After the user has authenticated we want to connect to their Google Calendar,
// create a specific 'Nutchecker Reminder' calendar and fill it with reminder events.
export async function GET(request: Request) {
  const session = await getAuthSession();
  if (!session) {
    console.log("No session available");
    return NextResponse.json({});
  }

  const accessToken = session?.accessToken;
  const refreshToken = session?.refreshToken;

  if (isGoogleProvider(session?.provider)) {
    console.log("Connecting to Google Calendar");
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

    console.log("Creating and inserting new calendar");
    // Create nutchecker calendar
    const nutcheckerCal = await gCal.calendars.insert({
      requestBody: {
        description:
          "Increasing awareness of testicular cancer by helping you check your nuts.",
        summary: "Nutchecker Reminder",
      },
    });

    const eventDate = getNextThursday();
    const startDate = formatDateToYMD(eventDate);

    const newEvent: calendar_v3.Schema$Event = {
      summary: "It's nutchecking time!",
      description: `
      01 - Get steamy. A warm shower will put your nuts in the mood.
      02 - Roll one nut between thumb and fingers to check for lumps, swelling or pain.
      03 - Repeat with the other nut.
  
      You nuts should feel smooth, firm and sensitive but not painful. 
      If something doesn't feel right, see a doctor!
  
      Source: Movember.com
      https://cdn.movember.com/uploads/files/Your%20Health/TesticularSelfExamination.pdf
      `,
      start: {
        date: startDate,
      },
      end: {
        date: startDate,
      },
      recurrence: ["RRULE:FREQ=WEEKLY;BYDAY=TH;INTERVAL=2"],
    };

    console.log("creating and inserting events");
    try {
      // Fill with events
      await gCal.events.insert({
        calendarId: nutcheckerCal.data.id!,
        requestBody: newEvent,
      });
    } catch (e) {
      console.error("Inserting events unsuccesfull. " + e);
    }
  }

  return NextResponse.json({});
}
