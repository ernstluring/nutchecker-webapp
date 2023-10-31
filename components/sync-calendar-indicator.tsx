"use client";
import { Center, Flex, Spinner, Text, VStack } from "@chakra-ui/react";
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
  }, [router]);

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
          <Text>
            Creating the Nutchecker calendar and adding the reminder events...
          </Text>
          <Text>Note; this can take some time.</Text>
        </VStack>
      </Center>
    </Flex>
  );
}
