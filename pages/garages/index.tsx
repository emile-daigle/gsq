import React, { useEffect, useState } from "react";
import IGarage from "../../interfaces/IGarage";
import dynamic from "next/dynamic";
import { supabase } from "../../lib/Database/supabase";
import { getGarages } from "../../lib/Database/garages";
import { redirect } from "next/dist/server/api-utils";
import MapPlaceHolder from "../../components/MapPlaceHolder";
import { GetStaticProps } from "next";
import withLayout from "../../components/withLayout";
import { redirectError } from "../../lib/SSR/redirect";

const MapL = dynamic(import("../../components/MapL"), {
  ssr: false,
  loading: () => (
    <div style={{ textAlign: "center", paddingTop: 20 }}>Chargement…</div>
  ),
});

const Garages = ({ garages }: { garages: IGarage[] }) => {
  return (
    <>{garages.length ? <MapL garages={garages} /> : <MapPlaceHolder />}</>
  );
};

export default Garages;

Garages.getLayout = withLayout();

export const getStaticProps = async () => {
  try {
    const garages = await getGarages();
    return {
      props: {
        garages,
      },
      revalidate: 300,
    };
  } catch (error) {
    return redirectError(error);
  }
};
