export interface ChatUser {
  id: string;

  first_name: string;

  last_name: string;

  avatar_url?: string | null;

  online: boolean;
}

export interface ChatMessage {
  id: string;

  sender_id: string;

  receiver_id: string;

  content: string;

  attachment_url?: string | null;

  audio_url?: string | null;

  is_read: boolean;

  delivered: boolean;

  created_at: string;

  sender_name?: string;

  receiver_name?: string;
}

export interface TypingUser {
  userId: string;
}

export interface VoiceMessage {
  id: string;

  audio_url: string;

  created_at: string;
}
