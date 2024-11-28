import React, { useCallback } from 'react';
import styles from './Products.module.scss';
import Text from 'shared/ui/Text';
import Skeleton from 'react-loading-skeleton';
import { Product } from 'pages/ProductsPage/stores/ProductsStore';
import { Link } from 'react-router-dom';
import Card from 'shared/ui/Card';
import Button from 'shared/ui/Button';

type ProductsProps = {
  products: Product[];
  isLoading: boolean;
  isFetching: boolean;
};

export const Products: React.FC<ProductsProps> = ({ products, isLoading, isFetching }) => {
  const handleAddToCart = useCallback((product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');

    const existingItem = cart.find((item: Product) => item.id === product.id);
    if (!existingItem) {
      cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
  }, []);

  return (
    <div className={styles.catalog__block}>
      <div className={styles.catalog__stats}>
        <Text className={styles.stats__title} weight="bold">
          Total Product
        </Text>
        <Text view="p-20" color="accent" weight="bold">
          {products.length}
        </Text>
      </div>
      <div className={styles.catalog__wrapper}>
        {isLoading ? (
          [...Array(10)].map((_, index) => (
            <Skeleton key={index} className={styles.skeletonItem} />
          ))
        ) : products.length === 0 ? (
          <div className={styles.notFound}>
            <img className={styles.notFound__img} src="/eyes.svg" alt="Not Found" />
            <Text view="title" className={styles.notFound__text}>
              Товар не найден
            </Text>
          </div>
        ) : (
          <>
            {products.map((card: Product) => (
              <Link to={`/product/${card.id}`} key={card.id}>
                <Card
                  image={card.images[0]}
                  captionSlot={card.category.name}
                  title={card.title}
                  subtitle={card.description}
                  contentSlot={`$${card.price}`}
                  actionSlot={<Button onClick={(e) => handleAddToCart(card, e)}>Add to Cart</Button>}
                />
              </Link>
            ))}
            {isFetching && [...Array(10)].map((_, index) => <Skeleton key={index} className={styles.skeletonItem} />)}
          </>
        )}
      </div>
    </div>
  );
};
