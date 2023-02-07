import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { User, useSupabaseClient } from "@supabase/auth-helpers-react";
import { GetServerSidePropsContext } from "next";
import React from "react";
import AdminLayout from "../../Admin/components/AdminLayout";
import { signOut } from "../../Admin/lib/signIn";
import { Database } from "../../lib/Database/supabase";

const index = ({ user }: { user: User }) => {
  const supabaseClient = useSupabaseClient<Database>();

  return (
    <div>
      Hello {user.id}{" "}
      <button onClick={() => signOut(supabaseClient)}>LogOut</button>
    </div>
  );
};

export default index;

index.getLayout = function getLayout(page: React.ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
  // Check if we have a session
  console.log(await supabase.auth.getSession());
  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log(session);
  if (!session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};
