import React, {useCallback} from 'react';
import styles from './ProductPage.module.scss';
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Text from 'shared/ui/Text';
import Card from 'shared/ui/Card';
import Button from 'shared/ui/Button';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { NavigationContainer } from './NavigationContainer';
import {useLocalStore} from "shared/lib";
import {ProductStore} from "pages/ProductPage/stores";

export const ProductPage = observer(() => {
  const { id } = useParams();
  const store = useLocalStore(useCallback(() => new ProductStore(), []));

  useEffect(() => {
    if (id) {
      store.fetchProduct(id);
      store.resetErrors();
    }
    return () => store.destroy();
  }, [id]);

  const handleImageError = () => {
    store.setCurrentImage('/product.jpg');
  };

  if (store.error) {
    return (
      <NavigationContainer>
        <p>{store.error}</p>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      {store.isLoading ? (
        <div className={styles.productPage__info}>
          <Skeleton width={600} height={600} />
          <div className={styles.info__textBlock}>
            <Skeleton className={styles.info__title} width={300} height={80} />
            <Skeleton className={styles.info__description} width={500} height={100} />
            <Skeleton className={styles.info__price} width={100} height={50} />
            <div className={styles.info__buttons}>
              <Skeleton width={100} height={40} />
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.productPage__info}>
          <img
            src={store.currentImage}
            alt={store.product?.title}
            onError={handleImageError}
            className={styles.productPage__img}
          />
          <div className={styles.info__textBlock}>
            <Text className={styles.info__title} view="title">
              {store.product?.title}
            </Text>
            <Text className={styles.info__description} view="p-20" color="secondary">
              {store.product?.description}
            </Text>
            <Text className={styles.info__price} view="title">
              ${store.product?.price}
            </Text>
            <div className={styles.info__buttons}>
              <Button>Buy Now</Button>
            </div>
          </div>
        </div>
      )}
      <div className={styles.productPage__related}>
        <Text className={styles.related__title} view="title">
          Related Items
        </Text>
        <div className={styles.related__items}>
          {store.isLoadingRelated
            ? [...Array(3)].map((_, index) => <Skeleton key={index} width={348} height={400} />)
            : store.related.map((card) => (
                <Link to={`/product/${card.id}`} key={card.id}>
                  <Card
                    image={card.images[0]}
                    captionSlot={card.category.name}
                    title={card.title}
                    subtitle={card.description}
                    contentSlot={`$${card.price}`}
                    actionSlot={<Button>Add to Cart</Button>}
                  />
                </Link>
              ))}
        </div>
      </div>
    </NavigationContainer>
  );
});
