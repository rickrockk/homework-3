import styles from "./ProductsPage.module.scss"
import Text from "shared/ui/Text";
import Input from "shared/ui/Input";
import Button from "shared/ui/Button";
import MultiDropdown from "shared/ui/MultiDropdown";
import Card from "shared/ui/Card";
import {useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const options = [
    { key: 'msk', value: 'Москва' },
    { key: 'spb', value: 'Санкт-Петербург' },
    { key: 'ekb', value: 'Екатеринбург' },
];

const defaultGetTitle = (elements) =>
    elements.map((el) => el.key).join();

export function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<null | string>(null);

    useEffect(() => {
        axios.get('https://api.escuelajs.co/api/v1/products?limit=10&offset=0')
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Ошибка: ', error);
                setError('Не удалось загрузить данные');
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>{error}</p>;
    return (
        <section className={styles.main__products}>
            <div className={styles.products__hero}>
                <div className={styles.hero__text}>
                    <Text view="title">
                        Products
                    </Text>
                    <Text view="p-20" color="secondary">
                        We display products based on the latest products we have, if you want
                        to see our old products please enter the name of the item
                    </Text>
                </div>
            </div>
            <div className={styles.products__catalog}>
                <div className={styles.catalog__tools}>
                    <Input className={styles.catalog__search} placeholder="Search product" afterSlot={<Button>Find now</Button>}/>
                    <MultiDropdown
                        className={styles.catalog__filter}
                        value={[]}
                        options={options}
                        getTitle={defaultGetTitle}
                    />
                </div>
                <div className={styles.catalog__block}>
                    <div className={styles.catalog__stats}>
                        <Text className={styles.stats__title} view="title">
                            Total Product
                        </Text>
                        <Text view="p-20" color="accent" weight="bold">
                            {products.length}
                        </Text>
                    </div>
                    <div className={styles.catalog__wrapper}>
                        {products.map(card =>
                            <Link to={`/product/${card.id}`} key={card.id}>
                                <Card image={card.images[0]}
                                      captionSlot={card.category.name}
                                      title={card.title}
                                      subtitle={card.description}
                                      contentSlot={`$${card.price}`}
                                      actionSlot={<Button>Add to Cart</Button>}
                                />
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}