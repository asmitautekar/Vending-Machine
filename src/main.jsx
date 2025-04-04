import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import GlobalStateProvider from './context/GlobalStateProvider.jsx'

createRoot(document.getElementById('root')).render(
    <GlobalStateProvider>
      <App/>
    </GlobalStateProvider>
)
