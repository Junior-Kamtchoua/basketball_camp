import { getPrograms } from "@/services/programs/getPrograms";

import { joinProgram } from "@/services/programs/joinProgram";

import { createProgram } from "@/services/programs/createProgram";

import { approveProgramApplication } from "@/services/programs/approveProgramApplication";

import { rejectProgramApplication } from "@/services/programs/rejectProgramApplication";

interface CreateProgramArgs {
  input: {
    title: string;

    description?: string;

    price: number;

    duration_weeks: number;

    max_players: number;
  };
}

interface JoinProgramArgs {
  programId: string;
}

interface ProgramApplicationArgs {
  applicationId: string;
}

interface GraphQLContext {
  user: {
    id: string;
  } | null;
}

export const programResolver = {
  Mutation: {
    createProgram: async (
      _: unknown,

      { input }: CreateProgramArgs,
    ) => {
      return await createProgram(input);
    },

    joinProgram: async (
      _: unknown,

      { programId }: JoinProgramArgs,

      context: GraphQLContext,
    ) => {
      if (!context.user) {
        throw new Error("Unauthorized");
      }

      return await joinProgram(
        context.user.id,

        programId,
      );
    },

    approveProgramApplication: async (
      _: unknown,

      { applicationId }: ProgramApplicationArgs,
    ) => {
      return await approveProgramApplication(applicationId);
    },

    rejectProgramApplication: async (
      _: unknown,

      { applicationId }: ProgramApplicationArgs,
    ) => {
      return await rejectProgramApplication(applicationId);
    },
  },

  Query: {
    programs: async () => {
      return await getPrograms();
    },
  },
};
