import styles from './Header.module.scss'
import classNames from "classnames";
import Text from "shared/ui/Text";
import logo from '../../../../public/logo.svg'
import {useState, useEffect } from "react";
import { useLocation, Link } from 'react-router-dom';
import bag from '../../../../public/bag.svg'
import user from '../../../../public/user.svg'

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
                    <img src={logo} alt="Логотип"/>
                </Link>
                <ul className={styles.nav__list}>
                    <li className={`${styles.nav__item} ${styles.nav__item_selected}`}>
                        <Text view="p-18" color="accent" weight="medium">
                            Products
                        </Text>
                    </li>
                    <li className={styles.nav__item}>
                        <Text view="p-18">
                            Categories
                        </Text>
                    </li>
                    <li className={styles.nav__item}>
                        <Text view="p-18">
                            About us
                        </Text>
                    </li>
                </ul>
                <ul className={styles.nav__tools}>
                    <li className={styles.nav__tool}>
                        <img src={bag} alt="Корзина"/>
                    </li>
                    <li className={styles.nav__tool}>
                        <img src={user} alt="Кабинет"/>
                    </li>
                </ul>
            </nav>
        </header>
    );
}