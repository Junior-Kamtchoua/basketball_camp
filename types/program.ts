export interface Program {
  id: string;

  title: string;

  description: string | null;

  price: number;

  duration_weeks: number | null;

  max_players: number;

  current_players: number;

  image_url?: string | null;

  is_active: boolean;

  created_at: string;

  /*
    IMPORTANT
  */

  player_program_id?: string;
}
