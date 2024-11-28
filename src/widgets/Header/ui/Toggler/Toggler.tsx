import React from 'react';
import styles from './Toggler.module.scss';
import classNames from 'classnames';

type TogglerProps = {
  isFolded: boolean;
  onClick: () => void;
  className?: string;
};

export const Toggler: React.FC<TogglerProps> = ({ isFolded, onClick, className }) => {
  const togglerClass = classNames(styles.toggler, className, {
    [styles.toggler_toggled]: !isFolded,
  });

  return (
    <button onClick={onClick} className={togglerClass}>
      <span></span>
    </button>
  );
};
