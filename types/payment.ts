export interface Payment {
  id: string;

  player_program_id?: string | null;

  amount: number;

  status: string;

  payment_method: string | null;

  payment_proof_url?: string | null;

  transaction_id?: string | null;

  created_at: string;

  paid_at?: string | null;

  player_name?: string;

  player_email?: string;

  program_title?: string;
}
