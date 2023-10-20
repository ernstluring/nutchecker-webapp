import { NextResponse } from "next/server";
import { google, calendar_v3 } from "googleapis";

import { getAuthSession } from "@/lib/session";
import { isGoogleProvider } from "@/lib/provider";
import { redirect } from "next/navigation";

async function GetOrCreateNutcheckerCalendar(
  gCal: calendar_v3.Calendar
): Promise<calendar_v3.Schema$Calendar> {
  const allCalendars = await gCal.calendarList.list();
  // First check if the Nutchecker calendar already exists
  const existingCal = allCalendars.data.items?.find((cal) => {
    return cal.summary === "Nutchecker Reminder";
  });
  if (existingCal) {
    return existingCal;
  }

  // If the Nutchecker calender does not exists, we create it
  const createdCal = await gCal.calendars.insert({
    requestBody: {
      description: "Test",
      summary: "Nutchecker Reminder",
    },
  });
  return createdCal.data;
}

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

var nextThursdayDate = getNextThursday();
console.log("Next Thursday's date: " + nextThursdayDate);

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

// This route is used as callback from the Google OAuth provider.
// After the user has authenticated we want to connect to their Google Calendar,
// create a specific 'Nutchecker Reminder' calendar and fill it with reminder events.
export async function GET(request: Request) {
  const session = await getAuthSession();

  if (!session) {
    return redirect("/");
  }

  const accessToken = session?.accessToken;
  const refreshToken = session?.refreshToken;

  if (isGoogleProvider(session?.provider)) {
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

    // Create nutchecker calendar
    const nutcheckerCal = await gCal.calendars.insert({
      requestBody: {
        description: "Test",
        summary: "Nutchecker Reminder",
      },
    });

    const eventDate = getNextThursday();
    const startDate = formatDateToYMD(eventDate);

    const newEvent: calendar_v3.Schema$Event = {
      summary: "Title",
      description: "Description",
      start: {
        date: startDate,
      },
      end: {
        date: startDate,
      },
      recurrence: ["RRULE:FREQ=WEEKLY;BYDAY=TH;INTERVAL=2"],
    };

    // Fill with events
    gCal.events.insert({
      calendarId: nutcheckerCal.data.id!,
      requestBody: newEvent,
    });
  }

  return redirect("/");
}
