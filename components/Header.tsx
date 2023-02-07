import React, { useState } from "react";
import Link from "next/link";
import styles from "../styles/header.module.css";
import Image from "next/image";

const Header = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.container}>
          <Link href="/" className={styles.logo}>
            <img src="/GSQ.png" alt="Logo" width={75} />
          </Link>
          <div className={styles.navMenu__icon} onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul
            className={
              click ? [styles.navMenu, styles.active].join(" ") : styles.navMenu
            }
          >
            <li>
              <Link
                href="/"
                className={styles.navMenu__link}
                onClick={closeMobileMenu}
              >
                Accueil
              </Link>
            </li>
            <li>
              <Link
                href="/garages"
                className={styles.navMenu__link}
                onClick={closeMobileMenu}
              >
                Garages
              </Link>
            </li>
            <li>
              <Link
                href="/guides"
                className={styles.navMenu__link}
                onClick={closeMobileMenu}
              >
                Guides
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className={styles.navMenu__link}
                onClick={closeMobileMenu}
              >
                Products
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
