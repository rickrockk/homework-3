import React from 'react';
import styles from './AboutUs.module.scss';
import Text from 'shared/ui/Text';
import { Link } from 'react-router-dom';

export const AboutUs = () => {
  return (
    <section className={styles.main__aboutUs}>
      <div className={styles.aboutUs__hero}>
        <img className={styles.hero__img} src="/about.jpg" alt="О нас" />
        <div className="hero__text">
          <Text view="title">Проект выполнен в рамках курса "Начинающий React-разработчик" от компании KTS.</Text>
          <Text className={styles.text__additional} view="p-20" weight="medium">
            Вот этим молодым человечком. Его зовут Кирилл, он хороший.
          </Text>
          <Text view="p-20" weight="medium">
            Связаться с ним можно через:
          </Text>
          <ul className={styles.socials}>
            <li className={styles.socials__item}>
              <Link className={styles.social__link} to="https://t.me/kireaal" target="_blank">
                <img className={styles.logo} src="/tg.svg" /> Телега
              </Link>
            </li>
            <li className={styles.socials__item}>
              <Link className={styles.social__link} to="https://vk.com/kirealkorolev" target="_blank">
                <img className={styles.logo} src="/vk.svg" /> ВК
              </Link>
            </li>
            <li className={styles.socials__item}>
              <Link className={styles.social__link} to="mailto:mrkillraider@yandex.ru" target="_blank">
                <img className={styles.logo} src="/email.svg" /> По почте
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
