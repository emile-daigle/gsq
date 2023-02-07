import { SupabaseClient, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "../../lib/Database/supabase";

export const signIn = async (email: string, password: string, supabaseClient : SupabaseClient) => {
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) return error;
  if (data?.session) return data.session;
  return null;
};
export const signOut = async (supabaseClient : SupabaseClient) => {
  const { error } = await supabaseClient.auth.signOut();
  if (error) return error;
};

export const currentSession = async (supabaseClient : SupabaseClient) => {
  const { data, error } = await supabaseClient.auth.getSession();
  if (error) return error;
  if (data?.session) return data.session;
  return null;
};
