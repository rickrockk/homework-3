import React, { useCallback, useEffect } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { useLocalStore } from 'shared/lib';
import { ProductStore } from 'pages/ProductPage/stores';
import { NavigationContainer } from './NavigationContainer';
import { Info } from './Info';
import { RelatedProducts } from './RelatedProducts';

export const ProductPage = observer(() => {
  const { id } = useParams();
  const store = useLocalStore(useCallback(() => new ProductStore(), []));

  useEffect(() => {
    if (id) {
      store.fetchProduct(id);
      store.resetErrors();
    }
    return () => store.destroy();
  }, [id, store]);

  if (store.error) {
    return (
      <NavigationContainer>
        <p>{store.error}</p>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Info product={store.product} isLoading={store.isLoading} store={store} />
      <RelatedProducts items={store.related} isLoading={store.isLoading} />
    </NavigationContainer>
  );
});
