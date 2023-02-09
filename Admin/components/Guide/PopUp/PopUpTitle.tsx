import React, { useState, KeyboardEvent, FocusEvent } from "react";
import { IInline, IParagraph } from "../../../../interfaces/IEditable";
import styles from "../../../styles/admin-popup.module.css";

interface Props {
  title: string;
  setP: React.Dispatch<IParagraph>;
}

const PopUpTitle = ({ title, setP }: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleKeyboardEvent = (e: KeyboardEvent<HTMLHeadingElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.currentTarget.blur();
    }
  };

  const handleBlur = (e: FocusEvent<HTMLHeadingElement>) => {
    setIsEditing(false);
    setP({ title: e.target.innerHTML });
  };

  const handleClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <h2
      className={styles.title}
      suppressContentEditableWarning={true}
      contentEditable={isEditing}
      onDoubleClick={handleClick}
      onBlur={handleBlur}
      onKeyDown={handleKeyboardEvent}
    >
      {title}
    </h2>
  );
};

export default PopUpTitle;
