"use client";

import { Text } from "@chakra-ui/react";
import { GoogleButton } from "./google-button";
import { signOut } from "next-auth/react";
import { useState } from "react";

export default function DisconnectButton() {
  const [enabled, setEnabled] = useState(true);

  return (
    <GoogleButton
      enabled={enabled}
      onClick={() => {
        signOut({
          callbackUrl: "/",
        });
        setEnabled(false);
      }}
    >
      <Text>{"Signout"}</Text>
    </GoogleButton>
  );
}
