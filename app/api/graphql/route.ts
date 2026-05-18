import { ApolloServer } from "@apollo/server";

import { startServerAndCreateNextHandler } from "@as-integrations/next";

import { NextRequest } from "next/server";

import { typeDefs } from "@/graphql/typeDefs";

import { resolvers } from "@/graphql/resolvers";

import { getCurrentUser } from "@/lib/getCurrentUser";

const server = new ApolloServer({
  typeDefs,

  resolvers,
});

const handler = startServerAndCreateNextHandler(server, {
  context: async () => {
    const user = await getCurrentUser();

    return {
      user,
    };
  },
});

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}
