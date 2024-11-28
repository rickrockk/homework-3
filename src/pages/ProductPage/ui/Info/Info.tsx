import React from 'react';
import styles from './Info.module.scss';
import Skeleton from 'react-loading-skeleton';
import Text from 'shared/ui/Text';
import Button from 'shared/ui/Button';
import { Product, ProductStore } from 'pages/ProductPage/stores';
import { Slider } from 'pages/ProductPage/ui/Info/Slider';

type InfoProps = {
  product: Product | null;
  isLoading: boolean;
  store: ProductStore;
};

export const Info: React.FC<InfoProps> = ({ product, isLoading, store }) => {
  return (
    <React.Fragment>
      {isLoading ? (
        <div className={styles.productPage__info}>
          <Skeleton className={styles.skeletonItem__img} />
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
          <Slider store={store} product={product} />
          <div className={styles.info__textBlock}>
            <Text className={styles.info__title} view="title">
              {product?.title}
            </Text>
            <Text className={styles.info__description} view="p-20" color="secondary">
              {product?.description}
            </Text>
            <Text className={styles.info__price} view="title">
              ${product?.price}
            </Text>
            <div className={styles.info__buttons}>
              <Button>Buy Now</Button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
