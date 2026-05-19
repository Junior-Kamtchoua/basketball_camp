// app/api/graphql/route.ts

import { ApolloServer } from "@apollo/server";

import { startServerAndCreateNextHandler } from "@as-integrations/next";

import { NextRequest } from "next/server";

import { typeDefs } from "@/graphql/typeDefs";
import { resolvers } from "@/graphql/resolvers";

import { getCurrentUser } from "@/lib/getCurrentUser";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: process.env.NODE_ENV !== "production",
});

const handler = startServerAndCreateNextHandler(server, {
  context: async () => {
    try {
      const user = await getCurrentUser();

      return {
        user,
      };
    } catch (error) {
      console.error("GraphQL context error:", error);

      return {
        user: null,
      };
    }
  },
});

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}
