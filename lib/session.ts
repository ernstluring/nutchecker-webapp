import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export async function getAuthSession() {
  const session = await getServerSession(authOptions);
  return session;
}

export async function getProvider() {
  const session = await getAuthSession();
  return session?.provider;
}
