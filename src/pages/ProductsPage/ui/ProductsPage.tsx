import styles from './ProductsPage.module.scss';
import Text from 'shared/ui/Text';
import Input from 'shared/ui/Input';
import Button from 'shared/ui/Button';
import MultiDropdown, {Option} from 'shared/ui/MultiDropdown';
import Card from 'shared/ui/Card';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import qs from 'qs';
import {useCallback, useEffect, useRef} from 'react';
import {observer} from 'mobx-react-lite';
import {productsStore} from '../stores/ProductsStore';
import {Link, useNavigate} from 'react-router-dom';
import {Product} from "../stores/ProductsStore/ProductsStore";

export const ProductsPage = observer(() => {
    const navigate = useNavigate()
    const endOfListRef = useRef(null);

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1), {ignoreQueryPrefix: true});
            productsStore.initializeFromParams(params);
        }

        productsStore.fetchProducts(10, true);
        productsStore.fetchCategories();
    }, [])

    useEffect(() => {
        const queryString = qs.stringify({
                categoryID: productsStore.selectedCategories,
                searchValue: productsStore.searchQuery,
            },
            {
                arrayFormat: 'repeat',
                encode: false,
            }
        );
        navigate(`?${queryString}`)
    }, [productsStore.selectedCategories, productsStore.searchQuery, navigate])


    useEffect(() => {
        if (!productsStore.hasMore || productsStore.isFetchingMore) return;
        if (observer.current) observer.current.disconnect();
        const callback = function (entries) {
            if (entries[0].isIntersecting) {
                productsStore.fetchProducts(10, true);
            }
        };
        observer.current = new IntersectionObserver(callback, {threshold: 1.0});

        if (endOfListRef.current) {
            observer.current.observe(endOfListRef.current);
        }
    }, [productsStore.hasMore, productsStore.isFetchingMore]);


    const getTitle = useCallback(() => {
        if (productsStore.selectedCategories.length === 0) {
            return 'Выберите категории';
        }

        const selectedCategoryNames = productsStore.selectedCategories
            .map(id => productsStore.categories.find(cat => cat.id === id))
            .filter(Boolean)
            .map(cat => cat.name);

        return selectedCategoryNames.join(', ');
    }, []);

    const getSelectedCategoryOptions = useCallback(() => {
        return productsStore.selectedCategories
            .map((id) => productsStore.categories.find((cat) => cat.id === id))
            .filter(Boolean)
            .map((cat) => ({key: String(cat.id), value: cat.name}));
    }, []);

    const handleSearchInput = useCallback((input: string) => {
        productsStore.setSearchQuery(input);
    }, []);

    const handleCategoryChange = useCallback(
        (newSelectedCategories: Option[]) => {
            const selectedIds = newSelectedCategories.map((option) => Number(option.key));
            productsStore.setSelectedCategories(selectedIds);
        },
        []
    );

    if (productsStore.error) return <p>{productsStore.error}</p>;

    return (
        <section className={styles.main__products}>
            <div className={styles.products__hero}>
                <div className={styles.hero__text}>
                    <Text view="title">Products</Text>
                    <Text view="p-20" color="secondary">
                        We display products based on the latest products we have, if you want to see our old products
                        please enter
                        the name of the item
                    </Text>
                </div>
            </div>
            <div className={styles.products__catalog}>
                <div className={styles.catalog__tools}>
                    <Input
                        className={styles.catalog__search}
                        placeholder="Search product"
                        value={productsStore.searchQuery}
                        afterSlot={<Button>Find now</Button>}
                        onChange={handleSearchInput}
                    />
                    <MultiDropdown
                        className={styles.catalog__filter}
                        options={productsStore.categories.map((cat) => ({key: String(cat.id), value: cat.name}))}
                        onChange={handleCategoryChange}
                        value={getSelectedCategoryOptions()}
                        getTitle={getTitle}
                    />
                </div>
                <div className={styles.catalog__block}>
                    <div className={styles.catalog__stats}>
                        <Text className={styles.stats__title} view="title">
                            Total Product
                        </Text>
                        <Text view="p-20" color="accent" weight="bold">
                            {productsStore.filteredProducts.length}
                        </Text>
                    </div>
                    <div className={styles.catalog__wrapper}>
                        {productsStore.isLoading ? (
                            <div className={styles.skeletonContainer}>
                                {[...Array(10)].map((_, index) => (
                                    <Skeleton key={index} width={348} height={612} className={styles.skeletonItem}/>
                                ))}
                            </div>
                        ) : (
                            productsStore.filteredProducts.map((card: Product) => (
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
                <div ref={endOfListRef} style={{height: '20px'}}/>
            </div>
        </section>
    );
});
