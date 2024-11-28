import React, { useCallback } from 'react';
import styles from './MobileMenu.module.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Text from 'shared/ui/Text';
import { Cart } from 'widgets/Header/ui/Cart';
import { Profile } from 'widgets/Header/ui/Profile';
import {ThemeSwitcher} from "widgets/Header/ui/ThemeSwitcher";
import { NavItem } from 'widgets/Header/ui/Navigation';

type MobileMenuProps = {
  navItems: NavItem[];
  isFolded: boolean;
  setIsFolded: (arg0: boolean) => void;
  currentPath: string;
};

export const MobileMenu: React.FC<MobileMenuProps> = ({ navItems, isFolded, setIsFolded, currentPath }) => {
  const mobileMenuClass = classNames(styles.mobileMenu, {
    [styles.mobileMenu_open]: !isFolded,
  });

  const mobileMenuWrapperClass = classNames(styles.mobileMenu__wrapper, {
    [styles.mobileMenu__wrapper_visible]: !isFolded,
  });

  const handleCloseMenu = useCallback(() => setIsFolded(true), [setIsFolded]);

  return (
    <div className={mobileMenuWrapperClass} onClick={handleCloseMenu}>
      <div className={mobileMenuClass} onClick={(e) => e.stopPropagation()}>
        <ul className={styles.mobileMenu__list}>
          {navItems.map(({ path, label }) => (
            <li
              key={path}
              className={classNames(styles.mobileMenu__item, {
                [styles.mobileMenu__item_selected]: currentPath === path,
              })}
            >
              <Link to={path} onClick={() => setIsFolded(true)}>
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
          <li className={styles.mobileMenu__item}>
            <Link to="/cart" onClick={handleCloseMenu}>
              <Cart />
            </Link>
          </li>
          <li className={styles.mobileMenu__item}>
            <Profile />
          </li>
          <li className={styles.mobileMenu__item}>
            <ThemeSwitcher/>
          </li>
        </ul>
      </div>
    </div>
  );
};
