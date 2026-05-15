export interface Player {
  id: string;

  user_id: string;

  parent_id?: string;

  team_id?: string;

  jersey_number?: number;

  date_of_birth?: string;

  gender?: "MALE" | "FEMALE";

  height_cm?: number;

  weight_kg?: number;

  medical_notes?: string;

  joined_at: string;
}
