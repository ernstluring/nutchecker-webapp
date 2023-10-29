"use client";
import { Button, HStack } from "@chakra-ui/react";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export function SocialButtons() {
  return (
    <HStack>
      <Button w={210} colorScheme="linkedin" leftIcon={<FaLinkedin />}>
        <a href="https://www.linkedin.com/in/ernstluring" target="_blank">
          ernstluring
        </a>
      </Button>
      <Button leftIcon={<MdEmail />}>
        <a href="mailto:ernst@ejldigital.com" target="_blank">
          ernst@ejldigital.com
        </a>
      </Button>
    </HStack>
  );
}
