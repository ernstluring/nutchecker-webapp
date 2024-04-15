import { authOptions } from "@/lib/auth";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

export const runtime = "edge";

interface RouteHandlerContext {
  params: { nextauth: string[] };
}

const handler = async (req: NextRequest, context: RouteHandlerContext) => {
  return NextAuth(req, context, authOptions);
};

export { handler as GET, handler as POST };
