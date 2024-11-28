import React from "react";
import styles from "./CartItem.module.scss";
import Text from "shared/ui/Text";
import Button from "shared/ui/Button";
import {Product} from "pages/ProductsPage/stores/ProductsStore";

type CartItemProps = {
    item: Product;
    quantity: number;
    onRemove: (id: number) => void;
    onChangeQuantity: (id: number, quantity: number) => void;
};


export const CartItem: React.FC<CartItemProps> = ({item, quantity, onRemove, onChangeQuantity}) => {
    return (
        <div className={styles.cart__item}>
            <div className={styles.cart__item_info}>
                <img
                    src={item.images[0]}
                    alt={item.title}
                    className={styles.cart__item_image}
                />
                <Text view="p-20" weight="medium">{item.title}</Text>
            </div>
            <div className={styles.cart__item_tools}>
                <Text view="p-18">${item.price}</Text>
                <div className={styles.item__quantity}>
                    <Button
                        className={styles.quantity__btn}
                        onClick={() => onChangeQuantity(item.id, quantity - 1)}
                        disabled={quantity <= 1}
                    >
                        -
                    </Button>
                    <span className={styles.quantity__text}>{quantity}</span>
                    <Button
                        className={styles.quantity__btn}
                        onClick={() => onChangeQuantity(item.id, quantity + 1)}
                    >
                        +
                    </Button>
                </div>
                <Button onClick={() => onRemove(item.id)}>Удалить</Button>
            </div>
        </div>
    );
};