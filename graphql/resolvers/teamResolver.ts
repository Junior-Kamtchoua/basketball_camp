import { getAllTeams } from "@/services/teams/getAllTeams";

import { createTeam } from "@/services/teams/createTeam";

import { updateTeam } from "@/services/teams/updateTeam";

import { deleteTeam } from "@/services/teams/deleteTeam";

import { assignPlayerToTeam } from "@/services/teams/assignPlayerToTeam";

import { Team } from "@/types/team";

interface CreateTeamArgs {
  input: {
    name: string;

    age_group?: string;
  };
}

interface UpdateTeamArgs {
  input: {
    id: string;

    name: string;

    age_group?: string;

    win_rate: number;
  };
}

interface DeleteTeamArgs {
  teamId: string;
}

interface AssignPlayerArgs {
  playerId: string;

  teamId: string;
}

interface MutationResponse {
  success: boolean;
}

export const teamResolver = {
  Query: {
    teams: async (): Promise<Team[]> => {
      return await getAllTeams();
    },
  },

  Mutation: {
    createTeam: async (
      _: unknown,

      { input }: CreateTeamArgs,
    ): Promise<Team> => {
      return await createTeam(input);
    },

    updateTeam: async (
      _: unknown,

      { input }: UpdateTeamArgs,
    ): Promise<Team> => {
      return await updateTeam(input);
    },

    deleteTeam: async (
      _: unknown,

      { teamId }: DeleteTeamArgs,
    ): Promise<MutationResponse> => {
      return await deleteTeam(teamId);
    },

    assignPlayerToTeam: async (
      _: unknown,

      { playerId, teamId }: AssignPlayerArgs,
    ): Promise<MutationResponse> => {
      return await assignPlayerToTeam(playerId, teamId);
    },
  },
};
