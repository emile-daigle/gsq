import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import IGuideContent from "../../interfaces/IGuideContent";
import { getGuide, getGuidesPaths } from "../../lib/Database/guides";
import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next";
import withLayout from "../../components/withLayout";

type Props = {
  guide?: IGuideContent;
  errors?: string;
};

const Guide = ({ guide, errors }: Props) => {
  const router = useRouter();
  if (router.isFallback) <div>Loading...</div>;
  if (errors) return <div>Error...</div>;
  if (!guide) return <div>missing data...</div>;

  return (
    <>
      {guide ? (
        <div className="maintext">
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
              {guide.image && (
                <div className="imageBPV">
                  <img alt="Bypass Valve" src={guide.image.src} />
                  <h4 className="desc">{guide.image.desc}</h4>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      ) : (
        <p>alllo</p>
      )}
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
        params: { link: JSON.stringify(post.link) },
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
      revalidate: 300,
    };
  } catch (error) {
    let errorMessage = "Error";
    if (typeof error === "string") {
      errorMessage = error
    }
    if (error instanceof Error) {
      errorMessage = error.message
    }
    return { props: { errors: errorMessage }, revalidate: 300 };
  }
};
