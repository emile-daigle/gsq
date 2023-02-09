import React, { useEffect, useState } from "react";
import EditableContainer from "../../../Admin/components/Guide/EditableContainer";
import EditableParagraph from "../../../Admin/components/Guide/EditableParagraph";
import EditableTitle from "../../../Admin/components/Guide/EditableTitle";
import EditPopUp from "../../../Admin/components/Guide/PopUp/EditPopUp";
import Editable from "../../../components/Editable";
import IGuideContent, { IInline } from "../../../interfaces/IEditable";
import IContent, { IParagraph } from "../../../interfaces/IEditable";
import { getGuide } from "../../../lib/Database/guides";
import styles from "../../../Admin/styles/admin-guide.module.css";
import AdminLayout from "../../../Admin/components/AdminLayout";
import withAdminLayout from "../../../Admin/components/withAdminLayout";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { checkServerAuth } from "../../../Admin/lib/SupaBase/checkSession";
import { GetServerSidePropsContext } from "next";

type Props = {
  guideProp?: IGuideContent;
  errors?: string;
};

const Guide = ({ guideProp, errors }: Props) => {
  if (errors) return <p>Erreurs</p>;
  const [guide, setGuide] = useState<IGuideContent | undefined>(guideProp);
  const [editingID, setEditingID] = useState<number | null>(null);

  function renderSwitch(paragraph: IParagraph) {
    if (paragraph.title) return <EditableTitle text={paragraph.title} />;
    if (paragraph.inline)
      return <EditableParagraph inline={paragraph.inline} />;
    if (paragraph.image) return <EditableTitle text="image" />;
    //if(paragraph.text) return <Paragraph/>
  }

  const handleOpenPopUp = (pid: number) => {
    if (!pid && pid != 0) return;
    if (!guide) return;
    setEditingID(pid);
  };

  const handleSave = (paragraph: IParagraph) => {
    if (!editingID && editingID != 0) return;
    setGuide((guide) => {
      if (!guide) return;
      const paragraphs = guide.paragraphs;
      paragraphs[editingID] = paragraph;
      return {
        title: guide.title,
        paragraphs: paragraphs,
      };
    });
    setEditingID(null);
  };

  const handleCancel = () => {
    setEditingID(null);
  };

  const handleArrow = (up: boolean, pid: number) => {
    if (!guide) return;
    if (pid <= 0 && up) return;
    if (pid >= guide.paragraphs.length - 1 && !up) return;
    let paragraphs = guide.paragraphs;
    let element = paragraphs[pid];
    paragraphs.splice(pid, 1);
    paragraphs.splice(up ? pid - 1 : pid + 1, 0, element);
    setGuide((guide) => {
      if (!guide) return;
      return {
        title: guide.title,
        paragraphs: paragraphs,
      };
    });
  };

  const handleDelete = (pid: number) => {
    if (!guide) return;
    setGuide((guide) => {
      if (!guide) return;
      return {
        title: guide.title,
        paragraphs: guide.paragraphs.filter((s, i) => i != pid),
      };
    });
  };

  const handleAdd = (id: number, type: string) => {
    const addId = id + 1;
    if (!guide) return;
    let newParahraph: IParagraph = {};
    if (type === "paragraph") {
      newParahraph = { inline: [{ text: "Nouveau Paragraphe" }] };
    }
    if (type === "title") {
      newParahraph = { title: "Nouveau titre" };
    }
    setGuide((guide) => {
      if (!guide) return;
      return {
        title: guide.title,
        paragraphs: [
          ...guide.paragraphs.slice(0, addId),
          newParahraph,
          ...guide.paragraphs.slice(addId),
        ],
      };
    });
  };

  return (
    <>
      {guide ? (
        <>
          <div className={styles.container}>
            <div className={styles.controls}>ALLO</div>
            <div className={styles.mainText}>
              <h2>{guide.title}</h2>
              {guide.paragraphs.map((paragraph, pid) => (
                <EditableContainer
                  key={pid}
                  handleArrow={(up: boolean) => handleArrow(up, pid)}
                  handleOpenPopUp={() => handleOpenPopUp(pid)}
                  handleDelete={() => handleDelete(pid)}
                  handleAdd={(type: string) => handleAdd(pid, type)}
                >
                  {renderSwitch(paragraph)}
                </EditableContainer>
              ))}
            </div>
          </div>

          {editingID != null ? (
            <EditPopUp
              paragraph={guide.paragraphs[editingID]}
              handleSave={handleSave}
              handleCancel={handleCancel}
            />
          ) : null}
        </>
      ) : (
        <p>Erreur</p>
      )}
    </>
  );
};

export default Guide;

Guide.getLayout = withAdminLayout();

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const { id } = ctx.query;
    const supabase = createServerSupabaseClient(ctx);
    const session = await checkServerAuth(supabase);
    if (!session || !id)
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };

    const guide = await getGuide(id.toString());

    if (!guide) throw new Error("Pas de guide à ce lien");

    return {
      props: {
        guideProp: guide,
      },
    };
  } catch (error) {
    let errorMessage = "Error";
    console.log(error);

    if (typeof error === "string") {
      errorMessage = error;
    }
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return {
      redirect: {
        destination: `/error?error=${errorMessage}`,
        permanent: false,
      },
    };
  }
};
