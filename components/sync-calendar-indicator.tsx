"use client";
import {
  Center,
  Flex,
  List,
  ListIcon,
  ListItem,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { CiCircleRemove } from "react-icons/ci";
import { GiPeanut } from "react-icons/gi";
import { MdOutlineDone } from "react-icons/md";

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
          <List spacing={3} maxW={"3xl"} textAlign={"left"}>
            <ListItem>
              <ListIcon as={GiPeanut} color="brown" />
              Trying to connect to your Google Calendar...
            </ListItem>
            <ListItem>
              <ListIcon as={GiPeanut} color="brown" />
              Creating the special Nutchecker calendar and adding reminder
              events...
            </ListItem>
          </List>
          <Text>Note: this can take some time.</Text>
        </VStack>
      </Center>
    </Flex>
  );
}
