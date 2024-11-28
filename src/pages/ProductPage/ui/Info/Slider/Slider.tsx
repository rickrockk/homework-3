import React, { useCallback, useEffect, useState } from 'react';
import { Product, ProductStore } from 'pages/ProductPage/stores';
import styles from './Slider.module.scss';

type SliderProps = {
  store: ProductStore;
  product: Product | null;
};

export const Slider: React.FC<SliderProps> = ({ product, store }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [imageError, setImageError] = useState<boolean>(false);

  useEffect(() => {
    if (product?.images) {
      product.images.forEach((image) => {
        const img = new Image();
        img.src = image;
      });
    }
  }, [product]);

  const handlePrev = useCallback(() => {
    if (product) {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? product.images.length - 1 : prevIndex - 1));
    }
  }, [product]);

  const handleNext = useCallback(() => {
    if (product) {
      setCurrentIndex((prevIndex) => (prevIndex === product.images.length - 1 ? 0 : prevIndex + 1));
    }
  }, [product]);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  const currentSrc = imageError ? '/product.jpg' : product?.images?.[currentIndex] || store.currentImage;

  return (
    <div className={styles.slider}>
      {!imageError && (
        <button className={styles.slider__button} onClick={handlePrev}>
          <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19.043 25.6126L10.9561 17.5258C10.0011 16.5708 10.0011 15.008 10.9561 14.0529L19.043 5.96613"
              stroke="white"
              stroke-width="3"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      )}
      <img src={currentSrc} alt={product?.title} onError={handleImageError} className={styles.productPage__img} />
      {!imageError && (
        <button className={styles.slider__button} onClick={handleNext}>
          <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11.957 25.6126L20.0439 17.5258C20.9989 16.5708 20.9989 15.008 20.0439 14.0529L11.957 5.96613"
              stroke="white"
              stroke-width="3"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
};
