import React from 'react';
import classNames from 'classnames';
import styles from './Text.module.scss';

export type TextProps = {
  /** Дополнительный класс */
  className?: string;
  /** Стиль отображения */
  view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  /** Html-тег */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  /** Начертание шрифта */
  weight?: 'normal' | 'medium' | 'bold';
  /** Контент */
  children: React.ReactNode | string | number;
  /** Цвет */
  color?: 'primary' | 'secondary' | 'accent';
  /** Максимальное кол-во строк */
  maxLines?: number;
};

const Text: React.FC<TextProps> = ({ className, view, tag = 'p', weight, children, color, maxLines }) => {
  const Tag = tag as keyof JSX.IntrinsicElements;
  const textClass = classNames(
    className,
    view && styles[`text-${view}`],
    weight && styles[`text-${weight}`],
    color && styles[`text-color-${color}`],
    maxLines && styles[`line-clamp-${maxLines}`],
  );

  const style = maxLines
    ? ({
        WebkitLineClamp: maxLines,
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      } as React.CSSProperties)
    : undefined;

  return (
    <Tag className={textClass} style={style}>
      {children}
    </Tag>
  );
};

export default Text;
