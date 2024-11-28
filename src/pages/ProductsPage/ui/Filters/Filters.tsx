import React, { useCallback, useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import styles from './Filters.module.scss';
import Input from 'shared/ui/Input';
import Button from 'shared/ui/Button';
import Dropdown from 'shared/ui/MultiDropdown/Dropdown/Dropdown';
import { ProductsStore } from 'pages/ProductsPage/stores/ProductsStore';
import { Option } from 'shared/ui/MultiDropdown';

type FiltersProps = {
  store: ProductsStore;
};

export const Filters: React.FC<FiltersProps> = ({ store }) => {
  const [localSearchQuery, setLocalSearchQuery] = useState(store.searchQuery);

  const debouncedHandleSearchInput = useDebouncedCallback((input: string) => {
    store.setSearchQuery(input);
  }, 500);

  const handleSearchInput = useCallback(
    (input: string) => {
      setLocalSearchQuery(input);
      debouncedHandleSearchInput(input);
    },
    [debouncedHandleSearchInput],
  );

  useEffect(() => {
    setLocalSearchQuery(store.searchQuery);
  }, [store.searchQuery]);

  const handleCategoryChange = useCallback(
    (newSelectedCategory: Option | null) => {
      const selectedId = newSelectedCategory ? String(newSelectedCategory.key) : '';
      store.setSelectedCategoryId(selectedId);
    },
    [store],
  );

  return (
    <div className={styles.catalog__tools}>
      <Input
        className={styles.catalog__search}
        placeholder="Search product"
        value={localSearchQuery}
        afterSlot={<Button>Find now</Button>}
        onChange={handleSearchInput}
      />
      <Dropdown
        className={styles.catalog__filter}
        options={store.categories}
        onChange={handleCategoryChange}
        value={store.selectedCategory}
        getTitle={(selectedCategory) => selectedCategory?.value || 'Выберите категорию'}
      />
    </div>
  );
};
