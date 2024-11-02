import './styles/App.scss';
import {Header} from "widgets/Header";
import {AppRouter} from "app/providers/router";


function App() {

  return (
    <div className="app">
        <Header/>
        <main className="main">
            <AppRouter/>
        </main>
    </div>
  )
}

export default App
