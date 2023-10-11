import { CalendarEventProps } from "../types";
import getAccessToken from "./getAccessToken";

function _getDescription(location: string) {
  const baseDescription = `Hello world, this is a description!\n\n`;

  return baseDescription;
}

function _createEventBody({
  start,
  end,
  summary,
  email,
  location,
  requestId,
  name,
}: CalendarEventProps) {
  const description = _getDescription(location);

  return {
    start: {
      dateTime: start,
    },
    end: {
      dateTime: end,
    },
    summary,
    description,
    attendees: [
      {
        email,
        displayName: name,
      },
    ],
    ...(location === `phone`
      ? { location: process.env.OWNER_PHONE_NUMBER ?? `TBD` }
      : {
          conferenceData: {
            createRequest: {
              requestId,
              conferenceSolutionKey: {
                type: `hangoutsMeet`,
              },
            },
          },
        }),
  };
}

export default async function createCalendarEvent(props: CalendarEventProps) {
  const body = _createEventBody(props);
  const apiUrl = new URL(
    "https://www.googleapis.com/calendar/v3/calendars/primary/events"
  );
  apiUrl.searchParams.set("sendNotifications", "true");
  apiUrl.searchParams.set("conferenceDataVersion", "1");
  return fetch(apiUrl, {
    cache: "no-cache",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await getAccessToken()}`,
    },
    body: JSON.stringify(body),
  });
}
