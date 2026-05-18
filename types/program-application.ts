export interface ProgramApplication {
  application_id: string;

  player_id: string;

  user_id: string;

  first_name: string;

  last_name: string;

  email: string;

  program_id: string;

  program_title: string;

  status: string;

  payment_proof: string | null;

  created_at: string;
}
