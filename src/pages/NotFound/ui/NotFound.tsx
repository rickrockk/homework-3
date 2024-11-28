import React from 'react';
import styles from './NotFound.module.scss';
import Text from 'shared/ui/Text';

export const NotFound = () => {
  return (
    <section className={styles.main__notFound}>
      <div className={styles.notFound__container}>
        <Text view="title">404</Text>
        <Text view="p-20">Страница не найдена</Text>
        <img src="/404.jpg" alt="Страница не найдена" />
      </div>
    </section>
  );
};
