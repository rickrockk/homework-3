import {makeObservable, observable, action, runInAction} from 'mobx';
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

class ProductStore {
    product: Product | null = null;
    related: Product[] = [];
    isLoading: boolean = true;
    isLoadingRelated: boolean = true;
    error: string | null = null;
    errorRelated: string | null = null;
    currentImage: string = '/product.jpg';

    constructor() {
        makeObservable(this, {
            product: observable,
            related: observable,
            isLoading: observable,
            isLoadingRelated: observable,
            error: observable,
            errorRelated: observable,
            currentImage: observable,
            fetchProduct: action,
            fetchRelatedProducts: action,
            setCurrentImage: action,
            resetErrors: action
        });
    }

    async fetchProduct(id: string) {
        this.isLoading = true;
        this.error = null;
        try {
            const response = await axios.get<Product>(`https://api.escuelajs.co/api/v1/products/${id}`);
            runInAction(() => {
                this.product = response.data;
                this.currentImage = response.data.images[0] || '/product.jpg';
                this.isLoading = false;
            });
            this.fetchRelatedProducts(response.data.category.id, response.data.id);
        } catch (error) {
            runInAction(() => {
                this.error = 'Не удалось загрузить данные';
                this.isLoading = false;
                console.error('Ошибка при загрузке продукта:', error);
            });
        }
    }

    async fetchRelatedProducts(categoryId: number, productId: number) {
        this.isLoadingRelated = true;
        this.errorRelated = null;
        try {
            const relatedResponse = await axios.get<Product[]>(
                `https://api.escuelajs.co/api/v1/products?limit=3&offset=0&categoryId=${categoryId}`
            );
            runInAction(() => {
                this.related = relatedResponse.data.filter(item => item.id !== productId);
                this.isLoadingRelated = false;
            });
        } catch (error) {
            runInAction(() => {
                this.errorRelated = 'Не удалось загрузить связанные товары';
                this.isLoadingRelated = false;
            });
            console.error('Ошибка при загрузке товаров:', error);
        }
    }

    setCurrentImage(image: string) {
        this.currentImage = image;
    }

    resetErrors() {
        this.error = null;
        this.errorRelated = null;
    }
}

export const productStore = new ProductStore();
