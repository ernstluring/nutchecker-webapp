"use client";

import { myColors } from "@/lib/colors";
import { Link } from "@chakra-ui/next-js";
import { Button } from "@chakra-ui/react";
import { GoogleButton } from "./google-button";
import { signOut } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function DisconnectButton() {
  return (
    <GoogleButton>
      <Link href="/api/auth/signout" _hover={{ textDecoration: "none" }}>
        Disconnect
      </Link>
    </GoogleButton>
  );
}
