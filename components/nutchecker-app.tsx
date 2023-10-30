"use client";

import Image from "next/image";
import ConnectForm from "./connect-form";
import { Session } from "next-auth";
import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  IconProps,
  Center,
  HStack,
  VStack,
  Divider,
} from "@chakra-ui/react";
import { myColors } from "@/lib/colors";
import { ConnectButton } from "./connect-button";
import DisconnectButton from "./disconnect-button";
import { SocialButtons } from "./social-buttons";

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
          <Text color={"gray.600"} maxW={"3xl"}>
            De webapp die bijdraagt aan bewustwording en vroegtijdige
            signalering van teelbalkanker.
          </Text>
          <Text color={"gray.600"} maxW={"3xl"}>
            Teelbalkanker is de meest voorkomende kanker bij mannen tussen 15 en
            35 jaar. Bij vroegtijdige opsporing is de kans op genezing gelukkig
            zeer groot: wel 90 tot 100%.
          </Text>
          <Stack spacing={6} direction={"column"}>
            {session ? <DisconnectButton /> : <ConnectButton />}
            <Button rounded={"full"} px={6}>
              <a
                href="https://nl.movember.com/donate/details?teamId=2422705"
                target="_blank"
              >
                Movember actie
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
