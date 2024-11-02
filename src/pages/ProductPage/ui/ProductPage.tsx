import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Text from "shared/ui/Text";
import arrow from "../../../../public/arrow.svg"
import Card from "shared/ui/Card";
import Button from "shared/ui/Button";
import styles from './ProductPage.module.scss'
import {GoBack} from "./GoBack";

export function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState<null | string>(null);
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<null | string>(null);
    const [errorRelated, setErrorRelated] = useState<null | string>(null);

    useEffect(() => {
        axios.get(`https://api.escuelajs.co/api/v1/products/${id}`)
            .then(response => {
                setProduct(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Ошибка: ', error);
                setError('Не удалось загрузить данные');
                setLoading(false);
            });
    }, [id]);

    useEffect(() => {
        if (product) {
            axios.get(`https://api.escuelajs.co/api/v1/products?limit=3&offset=0&categoryId=${product.category.id}`)
                .then(response => {
                    const filteredData = response.data.filter(item => item.id !== product.id);
                    setRelated(filteredData);
                })
                .catch(error => {
                    console.error('Ошибка: ', error);
                    setErrorRelated('Не удалось загрузить данные');
                });
        }
    }, [product]);

    if (loading) return (
        <section className={styles.main__productPage}>
            <div className={styles.productPage__container}>
                <GoBack/>
                <p>Загрузка...</p>
            </div>
        </section>
    );
    if (error) return (
        <section className={styles.main__productPage}>
            <div className={styles.productPage__container}>
                <GoBack/>
                <p>{error}</p>
            </div>
        </section>
    );

    console.log(product)

    return (
        <section className={styles.main__productPage}>
            <div className={styles.productPage__container}>
                <GoBack/>
                <div className={styles.productPage__info}>
                    <img src={product.images[0]} alt={product.title} className={styles.productPage__img} />
                    <div className={styles.info__textBlock}>
                        <Text className={styles.info__title} view="title">{product.title}</Text>
                        <Text className={styles.info__description} view="p-20" color="secondary">{product.description}</Text>
                        <Text className={styles.info__price}view="title">${product.price}</Text>
                        <div className={styles.info__buttons}>
                            <Button>Buy Now</Button>
                        </div>
                    </div>
                </div>
                <div className={styles.productPage__related}>
                    <Text className={styles.related__title} view="title">Related Items</Text>
                    <div className={styles.related__items}>
                        {
                            errorRelated
                                ?
                            errorRelated
                                :
                            related.map(card =>
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