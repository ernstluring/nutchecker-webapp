"use client";
import { signIn } from "next-auth/react";
import { GoogleButton } from "./google-button";
import { Text } from "@chakra-ui/react";
import { track } from "@vercel/analytics";

export function ConnectButton() {
  return (
    <GoogleButton
      enabled={true}
      onClick={() => {
        track("Connect Calendar Button Clicked");
        signIn("google", { callbackUrl: "/syncCalendar" });
      }}
    >
      <Text>{"Connect your Google Calendar"}</Text>
    </GoogleButton>
  );
}
