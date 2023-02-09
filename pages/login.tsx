import React from "react";
import { Database } from "../lib/Database/supabase";
import { signIn } from "../Admin/lib/SupaBase/signIn";
import Link from "next/link";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const login = () => {
  const supabaseClient = useSupabaseClient<Database>();

  const handleSubmit = async (event: React.MouseEvent) => {
    if (event) event.preventDefault();
    await signIn("guidesubaruquebec@gmail.com", "GSQAdmin!$", supabaseClient);
  };
  return (
    <>
      <button onClick={handleSubmit}>Connect</button>
      <Link href="/admin">Admin</Link>
      <Link href="/admin/test">2Admin</Link>
    </>
  );
};

export default login;
