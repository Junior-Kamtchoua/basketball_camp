export interface TeamPlayer {
  player_id: string;

  first_name: string;

  last_name: string;

  email: string;
}

export interface Team {
  id: string;

  name: string;

  age_group?: string;

  logo_url?: string;

  coach_id?: string;

  win_rate: number;

  created_at: string;

  players_count: number;

  players?: TeamPlayer[];
}
