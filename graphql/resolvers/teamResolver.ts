import { getAllTeams } from "@/services/teams/getAllTeams";

export const teamResolver = {
  teams: async () => {
    return await getAllTeams();
  },
};
