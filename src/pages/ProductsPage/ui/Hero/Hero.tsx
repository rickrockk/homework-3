import React from 'react';
import styles from './Hero.module.scss';
import Text from 'shared/ui/Text';

export const Hero = () => {
  return (
    <div className={styles.products__hero}>
      <div className={styles.hero__text}>
        <Text view="title">Products</Text>
        <Text className={styles.text__desc} view="p-20" color="secondary">
          We display products based on the latest products we have, if you want to see our old products please enter the
          name of the item
        </Text>
      </div>
    </div>
  );
};
