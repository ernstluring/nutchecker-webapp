"use client";
import { signIn } from "next-auth/react";
import { GoogleButton } from "./google-button";
import { Text } from "@chakra-ui/react";

export function ConnectButton() {
  return (
    <GoogleButton
      enabled={true}
      onClick={() => signIn("google", { callbackUrl: "/syncCalendar" })}
    >
      <Text>{"Connect your Google Calendar"}</Text>
    </GoogleButton>
  );
}
