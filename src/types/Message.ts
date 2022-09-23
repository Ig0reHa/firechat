interface I_ChatMessage {
  id: string;
  author_id: string;
  chat_id: string;
  text: string;
  created_at: string;
}

interface I_ChatUsers {
  [key: string]: {
    id: string;
    name: string;
    userName: string;
    user_id: string;
    chats: string[];
    created_at: string;
  };
}

export type { I_ChatMessage, I_ChatUsers };
