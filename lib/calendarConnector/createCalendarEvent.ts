import { CalendarEventProps } from "../types";

export default async function createCalendarEvent(props: CalendarEventProps) {
  // const body = buildEventBody(props)
  // const apiUrl = new URL(
  //   "https://www.googleapis.com/calendar/v3/calendars/primary/events"
  // )
  // apiUrl.searchParams.set("sendNotifications", "true")
  // apiUrl.searchParams.set("conferenceDataVersion", "1")
  // return fetch(apiUrl, {
  //   cache: "no-cache",
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${await getAccessToken()}`,
  //   },
  //   body: JSON.stringify(body),
  // })
}
