import React, { useCallback, useEffect } from 'react';
import styles from './ProductsPage.module.scss';
import 'react-loading-skeleton/dist/skeleton.css';
import { observer } from 'mobx-react-lite';
import { ProductsStore } from '../stores/ProductsStore';
import { useNavigate } from 'react-router-dom';
import { useLocalStore, useQueryParse } from 'shared/lib';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { Hero } from './Hero';
import { Filters } from './Filters';
import { Products } from './Products';

export const ProductsPage = observer(() => {
  const store = useLocalStore(useCallback(() => new ProductsStore(), []));
  const navigate = useNavigate();
  const { endOfListRef } = useInfiniteScroll({
    callback: () => store.fetchProducts(10, true),
    hasMore: store.hasMore,
    isFetching: store.isFetchingMore,
  });

  useQueryParse({
    store,
    navigate,
  });

  useEffect(() => {
    store.fetchProducts(10, false);
    store.fetchCategories();
    return () => store.destroy();
  }, [store]);

  if (store.error) return <p>{store.error}</p>;

  return (
    <section className={styles.main__products}>
      <Hero />
      <Filters store={store} />
      <Products products={store.products} isLoading={store.isLoading} isFetching={store.isFetchingMore} />
      <div ref={endOfListRef} style={{ height: '20px' }} />
    </section>
  );
});
