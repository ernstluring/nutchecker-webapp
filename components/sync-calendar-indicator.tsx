"use client";
import { Center, Flex, Spinner, Text, VStack } from "@chakra-ui/react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SyncCalendar() {
  const router = useRouter();

  useEffect(() => {
    let mutex = true;
    fetch("/api/calendar").then((resp) => {
      router.push("/");
    });
    return () => {
      mutex = false;
    };
  }, []);

  return (
    <Flex
      width={"100vw"}
      height={"100vh"}
      alignContent={"center"}
      justifyContent={"center"}
    >
      <Center>
        <VStack>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </VStack>
      </Center>
    </Flex>
  );
}
