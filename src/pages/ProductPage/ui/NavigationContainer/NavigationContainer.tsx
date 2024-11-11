import { GoBack } from './GoBack';
import styles from './NavigationContainer.module.scss';
import { ReactNode } from 'react';

interface NavigationContainerProps {
  children: ReactNode;
}

export function NavigationContainer({ children }: NavigationContainerProps) {
  return (
    <section className={styles.main__productPage}>
      <GoBack />
      {children}
    </section>
  );
}
