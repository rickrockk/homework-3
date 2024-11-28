import React, { useEffect, useState } from 'react';
import styles from './CartPage.module.scss';
import Text from 'shared/ui/Text';
import { Product } from 'pages/ProductsPage/stores/ProductsStore';
import {EmptyView} from "pages/CartPage/EmptyView";
import {WithProductsView} from "pages/CartPage/WithProductsView";

export const CartPage = () => {
  const [hasItems, setHasItems] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
    setHasItems(cart.length > 0);
  }, []);

  return (
    <section className={styles.main__cart}>
      <div className={styles.cart__container}>
        <Text view="title">Cart</Text>
        <div className={styles.cart__products}>
          {!hasItems ? (
            <EmptyView/>
          ) : (
            <WithProductsView cartItems={cartItems} setCartItems={setCartItems} setHasItems={setHasItems}/>
          )}
        </div>
      </div>
    </section>
  );
};
