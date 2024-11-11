import {makeObservable, observable, action, runInAction, computed} from 'mobx';
import axios from 'axios';

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

interface Category {
    id: number;
    name: string;
}

class ProductsStore {
    products: Product[] = [];
    categories: Category[] = [];
    selectedCategories: number[] = [];
    searchQuery: string = "";
    isLoading: boolean = false;
    isFetchingMore: boolean = false;
    hasMore: boolean = true;
    error: string | null = null;

    constructor() {
        makeObservable(this, {
            products: observable,
            categories: observable,
            selectedCategories: observable,
            searchQuery: observable,
            isLoading: observable,
            isFetchingMore: observable,
            hasMore: observable,
            error: observable,
            fetchProducts: action,
            fetchCategories: action,
            setSelectedCategories: action,
            setSearchQuery: action,
            initializeFromParams: action,
            filteredProducts: computed,
        });
    }

    initializeFromParams(params: { categoryID?: number[]; searchValue?: string }) {
        if (params.categoryID) {
            this.selectedCategories = Array.isArray(params.categoryID)
                ? params.categoryID.map(Number)
                : [Number(params.categoryID)];
        }
        if (params.searchValue) {
            this.searchQuery = params.searchValue;
        }
    }

    async fetchProducts(limit: number = 10, append: boolean = false): Promise<void> {
        if ((append && !this.hasMore) || this.isFetchingMore) return;
        if (append) {
            this.isFetchingMore = true;
        } else {
            this.isLoading = true;
        }

        this.error = null;
        try {
            const offset = append ? this.products.length : 0;
            const response = await axios.get<Product[]>(
                `https://api.escuelajs.co/api/v1/products?limit=${limit}&offset=${offset}`
            );

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
            const response = await axios.get<Category[]>(`https://api.escuelajs.co/api/v1/categories?limit=5`);
            runInAction(() => {
                this.categories = response.data;
            });
        } catch (error) {
            console.error('Ошибка при загрузке категорий: ', error);
        }
    }

    setSelectedCategories(selected: number[]): void {
        this.selectedCategories = selected;
    }

    setSearchQuery(query: string): void {
        this.searchQuery = query;
    }

    get filteredProducts(): Product[] {
        let filtered = this.products;

        if (this.selectedCategories.length > 0) {
            filtered = filtered.filter(product =>
                this.selectedCategories.includes(product.category.id)
            );
        }

        if (this.searchQuery) {
            filtered = filtered.filter(product =>
                product.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        }

        return filtered.slice().sort((a: Product, b: Product) => a.category.id - b.category.id);
    }
}

export const productsStore = new ProductsStore();

