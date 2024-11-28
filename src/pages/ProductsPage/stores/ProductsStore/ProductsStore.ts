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

type CategoryApi = {
  id: number;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
};

const normalizeCategory = (cat: CategoryApi): Option => {
  return {
    key: String(cat.id),
    value: cat.name,
  };
};

export class ProductsStore implements ILocalStore {
  products: Product[] = [];
  categories: Option[] = [];
  selectedCategoryId: string = '';
  searchQuery: string = '';
  isLoading: boolean = true;
  isFetchingMore: boolean = false;
  hasMore: boolean = true;
  error: string | null = null;

  constructor() {
    makeObservable(this, {
      products: observable,
      categories: observable,
      selectedCategoryId: observable,
      searchQuery: observable,
      isLoading: observable,
      isFetchingMore: observable,
      hasMore: observable,
      error: observable,
      fetchProducts: action,
      fetchCategories: action,
      setSelectedCategoryId: action,
      setSearchQuery: action,
      initializeFromParams: action,
      selectedCategory: computed,
    });
  }

  initializeFromParams(params: { categoryID?: number; searchValue?: string }) {
    const newCategoryId = params.categoryID !== undefined ? String(params.categoryID) : '';
    const newSearchQuery = params.searchValue || '';

    const shouldFetch = this.selectedCategoryId !== newCategoryId || this.searchQuery !== newSearchQuery;

    if (shouldFetch) {
      this.selectedCategoryId = newCategoryId;
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
      const categoryFilter = this.selectedCategoryId;
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
        this.isLoading = false;
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
      const response = await axios.get<CategoryApi[]>(`${ENDPOINT.categories}`);
      runInAction(() => {
        this.categories = response.data.map(normalizeCategory);
      });
    } catch (error) {
      console.error('Ошибка при загрузке категорий: ', error);
    }
  }

  setSelectedCategoryId(id = ''): void {
    this.selectedCategoryId = id;
    void this.fetchProducts(10, false);
    this.hasMore = true;
  }

  setSearchQuery(query: string): void {
    this.searchQuery = query;
    void this.fetchProducts(10, false);
    this.hasMore = true;
  }

  get selectedCategory(): Option | undefined {
    return this.categories.find((category) => category.key === this.selectedCategoryId);
  }

  destroy(): void {
    runInAction(() => {
      this.products = [];
      this.categories = [];
      this.error = null;
    });
  }
}
