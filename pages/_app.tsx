import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import {
  Session,
  createBrowserSupabaseClient,
} from "@supabase/auth-helpers-nextjs";
import { NextPage } from "next";
import { ReactElement, ReactNode, useState } from "react";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      {getLayout(<Component {...pageProps} />)}
    </SessionContextProvider>
  );
}
