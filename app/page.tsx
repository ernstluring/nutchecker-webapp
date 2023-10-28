import { NutcheckerApp } from "@/components/nutchecker-app";
import { getAuthSession } from "@/lib/session";

export default async function Home() {
  const session = await getAuthSession();
  return <NutcheckerApp session={session} />;
}
