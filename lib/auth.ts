import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const scopes = [
  "openid",
  "https://www.googleapis.com/auth/calendar.app.created",
  "https://www.googleapis.com/auth/calendar.readonly",
];

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          scope: scopes.join(" "),
        },
      },
    }),
  ],
  secret: process.env.NEXTAUT_SECRET,
  callbacks: {
    jwt: ({ token, account }) => {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.provider = account.provider;
      }
      return token;
    },
    session: ({ session, token }) => {
      // Add extra information to the session.
      // You can find the typings in types/next-auth.d.ts
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.provider = token.provider;
      return session;
    },
  },
};
