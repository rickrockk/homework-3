import React from 'react';
import styles from './ProductsPage.module.scss';
import Text from 'shared/ui/Text';
import Input from 'shared/ui/Input';
import Button from 'shared/ui/Button';
import MultiDropdown, { Option } from 'shared/ui/MultiDropdown';
import Card from 'shared/ui/Card';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useCallback, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { ProductsStore } from '../stores/ProductsStore';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from '../stores/ProductsStore/ProductsStore';
import { useLocalStore, useQueryParse } from 'shared/lib';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

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

  const getTitle = useCallback((selectedCategories: Option[]) => {
    if (selectedCategories.length === 0) {
      return 'Выберите категории';
    }

    return selectedCategories.map((cat) => cat.value).join(', ');
  }, []);

  const handleSearchInput = useCallback((input: string) => {
    store.setSearchQuery(input);
  }, [store]);

  const handleCategoryChange = useCallback(
    (newSelectedCategories: Option[]) => {
      const selectedIds = newSelectedCategories.map((option) => String(option.key));
      store.setSelectedCategoriesIds(selectedIds);
    },
    [store],
  );

  if (store.error) return <p>{store.error}</p>;

  return (
    <section className={styles.main__products}>
      <div className={styles.products__hero}>
        <div className={styles.hero__text}>
          <Text view="title">Products</Text>
          <Text view="p-20" color="secondary">
            We display products based on the latest products we have, if you want to see our old products please enter
            the name of the item
          </Text>
        </div>
      </div>
      <div className={styles.products__catalog}>
        <div className={styles.catalog__tools}>
          <Input
            className={styles.catalog__search}
            placeholder="Search product"
            value={store.searchQuery}
            afterSlot={<Button>Find now</Button>}
            onChange={handleSearchInput}
          />
          <MultiDropdown
            className={styles.catalog__filter}
            options={store.selectedCategoryOptions}
            onChange={handleCategoryChange}
            value={store.selectedCategoryOptions.filter((opt) => store.selectedCategoriesIds.includes(opt.key))}
            getTitle={getTitle}
          />
        </div>
        <div className={styles.catalog__block}>
          <div className={styles.catalog__stats}>
            <Text className={styles.stats__title} view="title">
              Total Product
            </Text>
            <Text view="p-20" color="accent" weight="bold">
              {store.products.length}
            </Text>
          </div>
          <div className={styles.catalog__wrapper}>
            {store.isLoading ? (
              <div className={styles.skeletonContainer}>
                {[...Array(10)].map((_, index) => (
                  <Skeleton key={index} width={348} height={612} className={styles.skeletonItem} />
                ))}
              </div>
            ) : (
              store.products.map((card: Product) => (
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
              ))
            )}
          </div>
        </div>
        <div ref={endOfListRef} style={{ height: '20px' }} />
      </div>
    </section>
  );
});
