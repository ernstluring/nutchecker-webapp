"use client";
import { signIn } from "next-auth/react";

export function ConnectButton() {
  return (
    <button onClick={() => signIn("google", { callbackUrl: "/api/calendar" })}>
      Connect
    </button>
  );
}
