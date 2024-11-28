import './styles/App.scss';
import React from 'react';
import classNames from 'classnames';
import { Header } from 'widgets/Header';
import { AppRouter } from 'app/providers/router';
import { SkeletonTheme } from 'react-loading-skeleton';
import { useTheme } from 'app/providers/ThemeProvider';

function App() {
  const { theme } = useTheme();

  const appClassnames = classNames('app', {
    dark: theme === 'dark',
  });

  const skeletonThemeColors = {
    baseColor: theme === 'dark' ? '#333333' : '#FFFFFF',
    highlightColor: theme === 'dark' ? '#444444' : '#D9D9D9',
  };

  return (
    <SkeletonTheme {...skeletonThemeColors}>
      <div className={appClassnames}>
        <Header />
        <main className="main">
          <AppRouter />
        </main>
      </div>
    </SkeletonTheme>
  );
}

export default App;
