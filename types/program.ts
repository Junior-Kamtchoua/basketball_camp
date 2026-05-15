export interface Program {
  id: string;

  title: string;

  description: string | null;

  price: number;

  duration_weeks: number | null;

  created_at: string;
}
