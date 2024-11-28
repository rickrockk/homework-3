import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './Navigation.module.scss';
import { Link } from 'react-router-dom';
import { Logo } from 'widgets/Header/ui/Logo';
import classNames from 'classnames';
import Text from 'shared/ui/Text';
import { Cart } from 'widgets/Header/ui/Cart';
import { Profile } from 'widgets/Header/ui/Profile';
import { Toggler } from 'widgets/Header/ui/Toggler';
import {ThemeSwitcher} from "widgets/Header/ui/ThemeSwitcher";

export interface NavItem {
  path: string;
  label: string;
}

type NavigationProps = {
  navItems: NavItem[];
  isFolded: boolean;
  setIsFolded: (arg0: boolean) => void;
  currentPath: string;
};

export const Navigation: React.FC<NavigationProps> = ({ isFolded, setIsFolded, currentPath }) => {
  const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });
  const navRef = useRef<HTMLUListElement | null>(null);

  const navItems = [
    { path: '/', label: 'Products' },
    { path: '/about', label: 'About us' },
  ];

  useEffect(() => {
    const activeItem = navRef.current?.querySelector(`.${styles.nav__item_selected}`) as HTMLElement;

    if (activeItem) {
      setUnderlineStyle({
        width: activeItem.offsetWidth,
        left: activeItem.offsetLeft,
      });
    } else {
      setUnderlineStyle({ width: 0, left: 0 });
    }
  }, [currentPath]);

  const toggleMenu = useCallback(() => {
    setIsFolded(!isFolded);
  }, [isFolded, setIsFolded]);

  return (
    <nav className={styles.header__nav}>
      <Link to="/">
        <Logo />
      </Link>
      <ul className={styles.nav__list} ref={navRef}>
        {navItems.map(({ path, label }) => (
          <li
            key={path}
            className={classNames(styles.nav__item, {
              [styles.nav__item_selected]: currentPath === path,
            })}
          >
            <Link to={path}>
              <Text
                view="p-18"
                color={currentPath === path ? 'accent' : 'primary'}
                weight={currentPath === path ? 'medium' : 'normal'}
              >
                {label}
              </Text>
            </Link>
          </li>
        ))}
        <div className={styles.nav__underline} style={underlineStyle} />
      </ul>
      <ul className={styles.nav__tools}>
        <li className={styles.nav__tool}>
          <ThemeSwitcher/>
        </li>
        <li className={styles.nav__tool}>
          <Link to="/cart">
            <Cart />
          </Link>
        </li>
        <li className={styles.nav__tool}>
          <Profile />
        </li>
      </ul>
      <Toggler isFolded={isFolded} onClick={toggleMenu} className={styles.nav__toggler} />
    </nav>
  );
};
