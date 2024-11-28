import React, { useState, useEffect } from 'react';
import styles from './Header.module.scss';
import { MobileMenu } from 'widgets/Header/ui/MobileMenu';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { Navigation } from 'widgets/Header/ui/Navigation';

export function Header() {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState<string>(location.pathname);
  const [isFolded, setIsFolded] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(e.clientY <= 50);
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const headerClass = classNames(styles.header, {
    [styles.header_hovered]: isVisible,
  });

  const navItems = [
    { path: '/', label: 'Products' },
    { path: '/about', label: 'About us' },
  ];

  return (
    <header className={headerClass}>
      <Navigation navItems={navItems} isFolded={isFolded} setIsFolded={setIsFolded} currentPath={currentPath} />
      <MobileMenu navItems={navItems} isFolded={isFolded} setIsFolded={setIsFolded} currentPath={currentPath} />
    </header>
  );
}
