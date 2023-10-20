import NextAuth from "next-auth";
import { ProviderType } from "next-auth/providers/index";

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string | undefined;
    refreshToken: string | undefined;
    provider: string;
  }
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken: string | undefined;
    refreshToken: string | undefined;
    provider: string;
  }
}
