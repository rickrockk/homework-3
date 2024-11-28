import React, { useCallback } from 'react';
import styles from './GoBack.module.scss';
import Text from 'shared/ui/Text';
import { useNavigate } from 'react-router-dom';

export const GoBack = () => {
  const navigate = useNavigate();
  const handleClick = useCallback(() => navigate(-1), [navigate]);

  return (
    <button onClick={handleClick} className={styles.goBack__link}>
      <div className={styles.goBack__container}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            className={styles.goBack__arrow}
            d="M20.1201 26.56L11.4268 17.8667C10.4001 16.84 10.4001 15.16 11.4268 14.1333L20.1201 5.44"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <Text view="p-20">Назад</Text>
      </div>
    </button>
  );
};
