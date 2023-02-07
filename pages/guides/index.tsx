import { GetStaticProps } from "next";
import React, { useEffect, useState } from "react";
import GuideCard from "../../components/GuideCard";
import SearchBar from "../../components/SearchBar";
import withLayout from "../../components/withLayout";
import IGuide from "../../interfaces/IGuide";
import { getGuides } from "../../lib/Database/guides";
import styles from "../../styles/guides.module.css";
import { supabase } from "../../lib/Database/supabase";

type Props = {
  guides?: IGuide[];
  errors?: string;
};

const Guides = ({ guides, errors }: Props) => {
  const [searchWord, setSearchWord] = useState("");
  if (errors) return <div>Error...</div>;
  if (!guides?.length) return <div>missing data...</div>;

  return (
    <div className={styles.container}>
      <SearchBar searchWord={searchWord} setSearchWord={setSearchWord} />
      <div className={styles.cards}>
        {guides
          .filter((guide) =>
            (guide.titre.toLowerCase() + guide.desc.toLowerCase()).includes(
              searchWord.toLowerCase()
            )
          )
          .map((guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
      </div>
    </div>
  );
};

export default Guides;

Guides.getLayout = withLayout();

export const getStaticProps: GetStaticProps = async () => {
  try {
    const guides = await getGuides();
    return {
      props: {
        guides,
      },
      revalidate: 300,
    };
  } catch (error) {
    console.log(error);
    if (typeof error === "string") {
      return { props: { errors: error }, revalidate: 300 };
    }
    if (error instanceof Error) {
      return { props: { errors: error.message }, revalidate: 300 };
    }
    return { props: { errors: "Error" }, revalidate: 300 };
  }
};
