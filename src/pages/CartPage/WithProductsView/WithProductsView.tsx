import styles from "./WithProducts.module.scss";
import Text from "shared/ui/Text";
import React, {useCallback, useState} from "react";
import {Product} from "pages/ProductsPage/stores/ProductsStore";
import {CartItem} from "pages/CartPage/WithProductsView/CartItem";

type WithProductsViewProps = {
    cartItems: Product[];
    setCartItems: (arg0: Product[]) => void;
    setHasItems: (arg0: boolean) => void;
}

export const WithProductsView: React.FC<WithProductsViewProps> = ({cartItems, setCartItems, setHasItems}) => {
    const [quantities, setQuantities] = useState<Record<number, number>>({});

    const removeFromCart = useCallback(
        (id: number) => {
            const updatedCart = cartItems.filter((item) => item.id !== id);
            setCartItems(updatedCart);
            setQuantities((prevQuantities) => {
                const updatedQuantities = { ...prevQuantities };
                delete updatedQuantities[id];
                return updatedQuantities;
            });
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            if (updatedCart.length === 0) {
                setHasItems(false);
            }
        },
        [setCartItems, setHasItems, cartItems],
    );

    const changeQuantity = useCallback((id: number, quantity: number) => {
        setQuantities((prevQuantities) => {
            const updatedQuantities = { ...prevQuantities, [id]: quantity };
            return updatedQuantities;
        });
    }, []);

    const totalPrice = cartItems.reduce((total, item) => {
        const quantity = quantities[item.id] || 1;
        return total + item.price * quantity;
    }, 0);

    return (
        <React.Fragment>
            <div className={styles.cart__block}>
                <div className={styles.cart__items}>
                    {cartItems.map((item) => (
                        <CartItem
                            key={item.id}
                            item={item}
                            quantity={quantities[item.id] || 1}
                            onRemove={removeFromCart}
                            onChangeQuantity={changeQuantity}
                        />
                    ))}
                </div>
            </div>
            <div className={styles.cart__price}>
                <Text>
                    Итого: <b>${totalPrice}</b>
                </Text>
            </div>
        </React.Fragment>
    );
};