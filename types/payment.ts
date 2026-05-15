export interface Payment {
  id: string;

  amount: number;

  status: string;

  payment_method: string | null;

  created_at: string;
}
