export interface Message {
  id: string;

  sender_id: string;

  receiver_id: string;

  sender_name: string;

  receiver_name: string;

  content: string;

  is_read: boolean;

  created_at: string;
}
