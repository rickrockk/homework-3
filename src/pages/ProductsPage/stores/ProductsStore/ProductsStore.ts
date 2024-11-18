import { makeObservable, observable, action, runInAction, computed } from 'mobx';
import { ILocalStore } from 'shared/lib';
import axios from 'axios';
import { ENDPOINT } from 'shared/config/api';
import { Option } from 'shared/ui/MultiDropdown';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: {
    id: number;
    name: string;
  };
  images: string[];
}

export class ProductsStore implements ILocalStore {
  products: Product[] = [];
  categories: Option[] = [];
  selectedCategoriesIds: string[] = [];
  searchQuery: string = '';
  isLoading: boolean = true;
  isFetchingMore: boolean = false;
  hasMore: boolean = true;
  error: string | null = null;

  constructor() {
    makeObservable(this, {
      products: observable,
      categories: observable,
      selectedCategoriesIds: observable.ref,
      searchQuery: observable,
      isLoading: observable,
      isFetchingMore: observable,
      hasMore: observable,
      error: observable,
      fetchProducts: action,
      fetchCategories: action,
      setSelectedCategoriesIds: action,
      setSearchQuery: action,
      initializeFromParams: action,
      categoriesIdsSet: computed,
      selectedCategories: computed,
      selectedCategoryNames: computed,
      selectedCategoryOptions: computed,
    });
  }

  initializeFromParams(params: { categoryID?: number[]; searchValue?: string }) {
    const newCategoryIds = params.categoryID
      ? Array.isArray(params.categoryID)
        ? params.categoryID.map(String)
        : [String(params.categoryID)]
      : [];
    const newSearchQuery = params.searchValue || '';

    const shouldFetch =
      this.selectedCategoriesIds.join(',') !== newCategoryIds.join(',') || this.searchQuery !== newSearchQuery;

    if (shouldFetch) {
      this.selectedCategoriesIds = newCategoryIds;
      this.searchQuery = newSearchQuery;
      this.fetchProducts(10, false);
    }
  }

  async fetchProducts(limit: number = 10, append: boolean = false): Promise<void> {
    if ((append && !this.hasMore) || this.isFetchingMore) return;

    if (append) {
      this.isFetchingMore = true;
    } else {
      this.isLoading = true;
      if (!append) {
        this.products = [];
      }
    }

    this.error = null;
    try {
      const offset = append ? this.products.length : 0;
      const categoryFilter = this.selectedCategoriesIds.join(',');
      const response = await axios.get<Product[]>(`${ENDPOINT.products}`, {
        params: {
          limit,
          offset,
          categoryId: categoryFilter || undefined,
          title: this.searchQuery || undefined,
        },
      });

      runInAction(() => {
        if (response.data.length < limit) {
          this.hasMore = false;
        }
        this.products = append ? [...this.products, ...response.data] : response.data;
      });
    } catch (error) {
      runInAction(() => {
        console.error('Ошибка: ', error);
        this.error = 'Не удалось загрузить данные';
      });
    } finally {
      runInAction(() => {
        if (append) {
          this.isFetchingMore = false;
        } else {
          this.isLoading = false;
        }
      });
    }
  }

  async fetchCategories(): Promise<void> {
    try {
      const response = await axios.get<Option[]>(`${ENDPOINT.categories}`);
      runInAction(() => {
        this.categories = response.data;
      });
    } catch (error) {
      console.error('Ошибка при загрузке категорий: ', error);
    }
  }

  setSelectedCategoriesIds(selected: string[]): void {
    this.selectedCategoriesIds = selected;
    void this.fetchProducts();
  }

  setSearchQuery(query: string): void {
    this.searchQuery = query;
    void this.fetchProducts();
  }

  get categoriesIdsSet() {
    return new Set(this.categories.map((cat) => cat.key));
  }

  get selectedCategories(): Option[] {
    return this.selectedCategoriesIds
      .map((id) => this.categories.find((category) => category.key === id))
      .filter((category): category is Option => Boolean(category));
  }

  get selectedCategoryNames() {
    return this.selectedCategories.map((cat) => cat.value);
  }

  get selectedCategoryOptions() {
    return this.selectedCategories.map((cat) => ({ key: String(cat.key), value: cat.value }));
  }
  destroy(): void {
    runInAction(() => {
      this.products = [];
      this.categories = [];
      this.error = null;
      this.searchQuery = '';
      this.selectedCategoriesIds = [];
    })
  }
}
