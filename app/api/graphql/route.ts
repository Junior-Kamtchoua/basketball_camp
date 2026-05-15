import { ApolloServer } from "@apollo/server";

import { startServerAndCreateNextHandler } from "@as-integrations/next";

import { NextRequest } from "next/server";

import { typeDefs } from "@/graphql/typeDefs";

import { resolvers } from "@/graphql/resolvers";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const apolloHandler = startServerAndCreateNextHandler<NextRequest>(server);

export async function GET(request: NextRequest) {
  return apolloHandler(request);
}

export async function POST(request: NextRequest) {
  return apolloHandler(request);
}
