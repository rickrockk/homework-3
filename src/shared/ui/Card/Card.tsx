import React from 'react';
import Text from "../Text";
import classNames from "classnames";
import styles from "./Card.module.scss"

export type CardProps = {
    /** Дополнительный classname */
    className?: string,
    /** URL изображения */
    image: string;
    /** Слот над заголовком */
    captionSlot?: React.ReactNode;
    /** Заголовок карточки */
    title: React.ReactNode;
    /** Описание карточки */
    subtitle: React.ReactNode;
    /** Содержимое карточки (футер/боковая часть), может быть пустым */
    contentSlot?: React.ReactNode;
    /** Клик на карточку */
    onClick?: React.MouseEventHandler;
    /** Слот для действия */
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

    const cardClasses = classNames(styles.card, className)

    return (
        <div className={cardClasses} onClick={onClick}>
            <img src={image} alt="Фото карточки"/>
            <div className={styles.card__text}>
                {captionSlot && <Text className={styles.card__caption} view="p-14" weight="medium" color="secondary">
                    {captionSlot}
                </Text>}
                <Text className={styles.card__title} view="p-20" maxLines={2} color="primary" weight="medium">
                    {title}
                </Text>
                <Text className={styles.card__subtitle} view="p-16" maxLines={3} color="secondary" weight="normal">
                    {subtitle}
                </Text>
                <div className={styles.card__footer}>
                    {
                        contentSlot && <Text className={styles.card__contentSlot} tag="span" view="p-18" weight="bold">
                            {contentSlot}
                        </Text>
                    }
                    {actionSlot && actionSlot}
                </div>
            </div>
        </div>
    )
};

export default Card;
