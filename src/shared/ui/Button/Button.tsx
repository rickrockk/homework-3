import React from 'react';
import Loader from '../Loader';
import classNames from 'classnames';
import styles from './Button.module.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ loading = false, className, children, disabled, ...props }) => {
  const buttonClasses = classNames(styles.button, className, {
    [styles.button_loading]: loading && !disabled,
    [styles.button_disabled]: disabled || loading,
  });

  return (
    <button className={buttonClasses} disabled={loading || disabled} {...props}>
      {loading && <Loader className={styles.loaderWrapper} size="s" color="white" />}
      {children}
    </button>
  );
};

export default Button;
