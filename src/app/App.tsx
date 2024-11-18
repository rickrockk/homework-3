import './styles/App.scss';
import React from 'react';
import { Header } from 'widgets/Header';
import { AppRouter } from 'app/providers/router';
import { SkeletonTheme } from 'react-loading-skeleton';

function App() {
  return (
    <SkeletonTheme baseColor="#FFFFFF" highlightColor="#D9D9D9">
      <div className="app">
        <Header />
        <main className="main">
          <AppRouter />
        </main>
      </div>
    </SkeletonTheme>
  );
}

export default App;
