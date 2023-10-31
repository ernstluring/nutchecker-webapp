"use client";

import { Text } from "@chakra-ui/react";
import { GoogleButton } from "./google-button";
import { signOut } from "next-auth/react";

export default function DisconnectButton() {
  return (
    <GoogleButton
      onClick={() =>
        signOut({
          callbackUrl: "/",
        })
      }
    >
      <Text>{"Signout"}</Text>
    </GoogleButton>
  );
}
