import React, { useCallback } from 'react';
import styles from './RelatedProducts.module.scss';
import Text from 'shared/ui/Text';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import Card from 'shared/ui/Card';
import Button from 'shared/ui/Button';
import { Product } from 'pages/ProductPage/stores';

type RelatedProductsProps = {
  items: Product[];
  isLoading: boolean;
};

export const RelatedProducts: React.FC<RelatedProductsProps> = ({ items, isLoading }) => {
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
    <div className={styles.productPage__related}>
      <Text className={styles.related__title} weight="bold">
        Related Items
      </Text>
      <div className={styles.related__items}>
        {isLoading
          ? [...Array(3)].map((_, index) => <Skeleton key={index} className={styles.skeletonItem} />)
          : items.map((card) => (
              <Link to={`/product/${card.id}`} key={card.id}>
                <Card
                  image={card.images[0]}
                  className={styles.related__item}
                  captionSlot={card.category.name}
                  title={card.title}
                  subtitle={card.description}
                  contentSlot={`$${card.price}`}
                  actionSlot={<Button onClick={(e) => handleAddToCart(card, e)}>Add to Cart</Button>}
                />
              </Link>
            ))}
      </div>
    </div>
  );
};
