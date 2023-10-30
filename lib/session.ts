import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { isGoogleProvider } from "./provider";
import { calendar_v3, google } from "googleapis";
import { redirect } from "next/navigation";

export async function getAuthSession() {
  const session = await getServerSession(authOptions);
  return session;
}
