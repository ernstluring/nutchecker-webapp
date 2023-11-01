"use client";

import Image from "next/image";
import { Session } from "next-auth";
import {
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Center,
  Divider,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { myColors } from "@/lib/colors";
import { ConnectButton } from "./connect-button";
import DisconnectButton from "./disconnect-button";
import { SocialButtons } from "./social-buttons";
import { GiPeanut } from "react-icons/gi";
import { CiCircleRemove } from "react-icons/ci";
import { MdOutlineDone } from "react-icons/md";

export type NutcheckerAppType = {
  session: Session | null;
};
export function NutcheckerApp({ session }: NutcheckerAppType) {
  return (
    <main>
      <Container maxW={"5xl"} paddingTop={10} paddingBottom={10}>
        <Center w={"full"} marginBottom={10}>
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
            src="/the-nutcheckers.png"
            alt="Nutchecker Logo"
            width={357}
            height={237}
            priority
          />
        </Center>
        <Stack
          textAlign={"center"}
          align={"center"}
          spacing={{ base: 8, md: 10 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Nut{" "}
            <Text as={"span"} color={myColors.red}>
              Checker
            </Text>
          </Heading>
          <Text maxW={"3xl"}>
            Teelbalkanker is de meest voorkomende kanker bij mannen tussen 15 en
            35 jaar. Bij vroegtijdige opsporing is de kans op genezing gelukkig
            zeer groot: wel 90 tot 100%.
          </Text>
          <Text maxW={"3xl"}>
            Daarom is het belangrijk om je zaakje af en toe te checken! En deze
            webapp helpt je daar bij:
          </Text>
          <List spacing={3} maxW={"3xl"} textAlign={"left"}>
            <ListItem>
              <ListIcon as={GiPeanut} color="brown" />
              1x in de 2 weken krijg je een &quot;nutchecking&quot; reminder in
              jouw Google Calendar omgeving
            </ListItem>
            <ListItem>
              <ListIcon as={GiPeanut} color="brown" />
              Inclusief stappenplan met drie eenvoudige stappen, gemaakt door de
              Movember Stichting
            </ListItem>
            <ListItem>
              <ListIcon as={MdOutlineDone} color="green" />
              Eenvoudig in te stellen
            </ListItem>
            <ListItem>
              <ListIcon as={CiCircleRemove} color="red" />
              Eenvoudig weer te verwijderen
            </ListItem>
          </List>
          <Stack spacing={6} direction={"column"}>
            {session ? <DisconnectButton /> : <ConnectButton />}
            <Button rounded={"full"} px={6}>
              <a
                href="https://nl.movember.com/donate/details?teamId=2422705"
                target="_blank"
              >
                Doneer aan Movember
              </a>
            </Button>
          </Stack>
          <Divider />
          <SocialButtons />
        </Stack>
      </Container>
    </main>
  );
}
