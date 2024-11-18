import React from 'react';
import styles from './GoBack.module.scss';
import Text from 'shared/ui/Text';
import { useNavigate } from 'react-router-dom';

export const GoBack = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)} className={styles.goBack__link}>
      <div className={styles.goBack__container}>
        <img src="/arrow.svg" alt="Стрелочка" />
        <Text view="p-20">Назад</Text>
      </div>
    </button>
  );
};
