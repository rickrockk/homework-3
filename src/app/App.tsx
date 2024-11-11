import './styles/App.scss';
import { Header } from 'widgets/Header';
import { AppRouter } from 'app/providers/router';
import { SkeletonTheme } from 'react-loading-skeleton';

function App() {
  return (
    <div className="app">
      <SkeletonTheme baseColor="#FFFFFF" highlightColor="#D9D9D9">
        <Header />
        <main className="main">
          <AppRouter />
        </main>
      </SkeletonTheme>
    </div>
  );
}

export default App;
