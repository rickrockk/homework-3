import React, { useState } from 'react';
import Text from '../Text';
import classNames from 'classnames';
import styles from './Card.module.scss';

export type CardProps = {
  className?: string;
  image: string;
  captionSlot?: React.ReactNode;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  contentSlot?: React.ReactNode;
  onClick?: React.MouseEventHandler;
  actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
  className,
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot,
}) => {
  const [currentImage, setCurrentImage] = useState<string>(image);

  const handleImageError = () => {
    setCurrentImage('/product.jpg');
  };

  const cardClasses = classNames(styles.card, className);

  return (
    <div className={cardClasses} onClick={onClick}>
      <img src={currentImage} alt="Фото карточки" onError={handleImageError} />
      <div className={styles.card__text}>
        {captionSlot && (
          <Text className={styles.card__caption} view="p-14" weight="medium" color="secondary">
            {captionSlot}
          </Text>
        )}
        <Text className={styles.card__title} view="p-20" maxLines={2} color="primary" weight="medium">
          {title}
        </Text>
        <Text className={styles.card__subtitle} view="p-16" maxLines={3} color="secondary" weight="normal">
          {subtitle}
        </Text>
        <div className={styles.card__footer}>
          {contentSlot && (
            <Text className={styles.card__contentSlot} tag="span" view="p-18" weight="bold">
              {contentSlot}
            </Text>
          )}
          {actionSlot && actionSlot}
        </div>
      </div>
    </div>
  );
};

export default Card;
