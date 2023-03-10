import React from 'react'
import Link from "next/link";
import styles from "../styles/home-card.module.css"
import Image from 'next/image';

const HomeCard = ({path, label, src, text}: { path: string, label: string, src: string, text: string}) => {
  return (
    <>
      <li className={styles.card}>
        <Link className={styles.card__link} href={path}>
          <figure className={styles.card__imgWrap} data-category={label}>
            <Image
              className={styles.card__img}
              alt='Travel Image'
              src={src}
              fill
            />
          </figure>
          <div className={styles.card__info}>
            <h5 className={styles.card__text}>{text}</h5>
          </div>
        </Link>
      </li>
    </>
  )
}

export default HomeCard