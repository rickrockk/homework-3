import React, {useCallback} from "react";
import Text from "shared/ui/Text";
import Button from "shared/ui/Button";
import styles from "./EmptyView.module.scss";
import {useNavigate} from "react-router-dom";

export const EmptyView = () => {
    const navigate = useNavigate();
    const handleClick = useCallback(() => navigate('/'), [navigate]);

    return (
        <div className={`${styles.cart__block} ${styles.cart__block_fullWidth}`}>
            <Text className={styles.empty__text} view="p-20" weight="medium">
                В корзине пока пусто.
            </Text>
            <Text className={styles.empty__text} view="p-16">Загляните на главную страницу, чтобы выбрать товары.</Text>
            <Button className={styles.cart__btn} onClick={handleClick}>
                На главную
            </Button>
        </div>
    );
};