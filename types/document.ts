export interface Document {
  id: string;

  user_id: string;

  payment_id: string | null;

  file_url: string;

  document_type: string;

  created_at: string;

  user_name?: string;

  user_email?: string;
}
