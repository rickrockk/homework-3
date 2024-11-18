import React from 'react';
import styles from './Header.module.scss';
import Text from 'shared/ui/Text';
// import {useState, useEffect } from "react";
import { Link } from 'react-router-dom';

export function Header() {
  // const location = useLocation();
  // const [currentPath, setCurrentPath] = useState(location.pathname);
  // useEffect(() => {
  //     setCurrentPath(location.pathname);
  // }, [location.pathname]);
  // const navItemClasses = classNames(styles.nav__item, {
  //     (currentPath === "/"): "styles.nav__item",
  // })

  return (
    <header className={styles.header}>
      <nav className={styles.header__nav}>
        <Link to="/">
          <img src="/logo.svg" alt="Логотип" />
        </Link>
        <ul className={styles.nav__list}>
          <li className={`${styles.nav__item} ${styles.nav__item_selected}`}>
            <Text view="p-18" color="accent" weight="medium">
              Products
            </Text>
          </li>
          <li className={styles.nav__item}>
            <Text view="p-18">Categories</Text>
          </li>
          <li className={styles.nav__item}>
            <Text view="p-18">About us</Text>
          </li>
        </ul>
        <ul className={styles.nav__tools}>
          <li className={styles.nav__tool}>
            <img src="/bag.svg" alt="Корзина" />
          </li>
          <li className={styles.nav__tool}>
            <img src="/user.svg" alt="Кабинет" />
          </li>
        </ul>
      </nav>
    </header>
  );
}
