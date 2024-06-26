import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import IGuideContent from "../../interfaces/IGuideContent";
import { getGuide, getGuidesPaths } from "../../lib/Database/guides";
import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next";
import withLayout from "../../layouts/withLayout";
import handleError from "../../utils/handleError";
import { addError } from "../../lib/Database/errors";
import styles from "../../styles/guide.module.css";
import Head from "next/head";

type Props = {
  guide?: IGuideContent;
  errors?: string;
};

const Guide = ({ guide, errors }: Props) => {
  const router = useRouter();
  if (router.isFallback) <div>Loading...</div>;
  if (errors) return <div>Erreur...</div>;
  if (!guide) return <div>Données manquantes</div>;

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={addJsonLd(guide.title, guide.description.replace("\n", ""))}
          key="jsonld"
        ></script>
      </Head>
      <div className={styles.mainText}>
        <h2>{guide.title}</h2>
        {guide.paragraphs.map((guide, idx) => (
          <React.Fragment key={idx}>
            {guide.title && <h3 key={idx}>{guide.title}</h3>}
            {guide.inline && (
              <p key={idx}>
                {guide.inline.map((inline, idx) => (
                  <React.Fragment key={idx}>
                    {inline.strong && <strong>{inline.strong}</strong>}
                    {inline.text && inline.text}
                    {inline.link && (
                      <Link href={`/${inline.link.to}`}>
                        {inline.link.text}
                      </Link>
                    )}
                    &nbsp;
                  </React.Fragment>
                ))}
              </p>
            )}
            {/*guide.image && (
                {<div className="imageBPV">
                  <img alt="Bypass Valve" src={guide.image.src} />
                  <h4 className="desc">{guide.image.desc}</h4>
              </div>}
              )*/}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default Guide;

Guide.getLayout = withLayout();

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const data = await getGuidesPaths();
    if (data) {
      const paths = data.map((post) => ({
        params: { link: post.link },
      }));
      return {
        paths: paths,
        fallback: "blocking",
      };
    }
    return {
      paths: [],
      fallback: "blocking",
    };
  } catch (error) {
    return {
      paths: [],
      fallback: false,
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const link = params?.link;

    if (!link || typeof link !== "string") throw new Error("Erreur de lien.");
    const guide = await getGuide(link);
    if (!guide) throw new Error("Pas de guide à ce lien");
    return {
      props: {
        guide,
      },
      revalidate: 3000,
    };
  } catch (error) {
    const errorMessage = handleError(error);
    addError(errorMessage, "Admin index");
    return {
      props: {
        error: errorMessage,
      },
      revalidate: 10,
    };
  }
};

function addJsonLd(headline: string, description: string) {
  return {
    __html: `{
      "@context": "http://schema.org",
      "@type": "Article",
      "headline": "${headline}",
      "description": "${description}"
    }
`,
  };
}
