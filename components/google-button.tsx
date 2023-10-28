"use client";
import { Button, Center, Text } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

export function GoogleButton({
  children,
  ...props
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Button w={"full"} variant={"outline"} leftIcon={<FcGoogle />} {...props}>
      <Center>{children}</Center>
    </Button>
  );
}
