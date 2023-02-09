import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import {
  SupabaseClient,
  User,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";
import { GetServerSidePropsContext } from "next";
import React from "react";
import AdminLayout from "../../Admin/components/AdminLayout";
import withAdminLayout from "../../Admin/components/withAdminLayout";
import { checkServerAuth } from "../../Admin/lib/SupaBase/checkSession";
import { signOut } from "../../Admin/lib/SupaBase/signIn";
import { Database } from "../../lib/Database/supabase";

const Index = ({ user }: { user: User }) => {
  const supabaseClient = useSupabaseClient<Database>();
  const user2 = useUser();
  return (
    <div>
      Hello {user.id} {user2?.id}
      <button onClick={() => signOut(supabaseClient)}>LogOut</button>
    </div>
  );
};

export default Index;

Index.getLayout = withAdminLayout()

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx);
  const lol = ctx.req.cookies['supabase-auth-token']
  const lol2 = JSON.parse(JSON.stringify(lol));
  console.log(lol2[0]);
  console.log(await supabase.auth.getUser(ctx.req.cookies['supabase-auth-token']))
  const session = await checkServerAuth(supabase);
  if (!session)
    return {
      redirect: {
        destination: "/login",
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
