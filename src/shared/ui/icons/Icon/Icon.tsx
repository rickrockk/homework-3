import React from 'react';
import styles from './Icon.module.scss';
import classNames from 'classnames';

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
  width?: number;
  height?: number;
  disabled?: boolean;
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({
  className,
  color = 'primary',
  width = 24,
  height = 24,
  children,
  ...props
}) => {
  const colorClass = classNames(styles[`icon_${color}`], className);
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={colorClass}
      {...props}
    >
      {children}
    </svg>
  );
};

export default Icon;
