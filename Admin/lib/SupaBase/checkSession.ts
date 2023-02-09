import { SupabaseClient } from "@supabase/auth-helpers-nextjs";

export const checkServerAuth = async (supabase: SupabaseClient) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
};
