import {StrictMode} from 'react'
import 'shared/config/configureMobX/configureMobX';
import {BrowserRouter} from "react-router-dom";
import {createRoot} from 'react-dom/client'
import App from 'app/App.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </StrictMode>
)
