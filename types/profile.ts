export interface UserProfile {
  id: string;

  first_name: string;

  last_name: string;

  email: string;

  avatar_url: string | null;

  team_name: string | null;

  jersey_number: number | null;

  gender: string | null;

  height_cm: number | null;

  weight_kg: number | null;

  date_of_birth: string | null;

  medical_notes: string | null;
}

export interface UserProfileStats {
  attendance_rate: number;

  total_programs: number;

  total_payments: number;

  unread_messages: number;

  average_score: number;
}
