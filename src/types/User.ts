/** Private db User object */
interface I_dbUser {
  app_metadata: {
    provider: string;
    providers: string[];
  };
  aud: string;
  confirmed_at: string;
  created_at: string;
  email: string;
  email_confirmed_at: string;
  id: string;
  identities: Record<string, unknown>;
  last_sign_in_at: string;
  phone: string;
  role: string;
  updated_at: string;
  user_metadata: Record<string, unknown>;
}

/** Original db user object from Supabase */
interface I_dbUserObj {
  access_token: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  token_type: string;
  user: I_dbUser;
}

/** User object for use in the app */
interface I_User {
  chats: string[];
  created_at: string;
  id: string;
  name: string;
  userName: string;
  user_id: string;
}

export type { I_dbUser, I_dbUserObj, I_User };
