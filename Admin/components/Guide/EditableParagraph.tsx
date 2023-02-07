import Link from "next/link";
import React from "react";
import { IInline } from "../../../interfaces/IEditable";

interface Props {
  inline: IInline[];
}

function renderSwitch(inline: IInline, id: number) {
  if (inline.text) return <span key={id}>{inline.text} </span>;
  if (inline.strong) return <strong key={id}>{inline.strong} </strong>;
  if (inline.link)
    return (
      <Link href={inline.link.to} key={id}>
        {inline.link.text}{" "}
      </Link>
    );
}

const EditableParagraph = ({ inline }: Props) => {
  return <p>{inline.map((section, id) => renderSwitch(section, id))}</p>;
};

export default EditableParagraph;
