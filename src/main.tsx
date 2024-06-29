import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { SocketProvider } from "./context/SocketContext.tsx";
import { CodeBlockProvider } from "./context/CodeBlockContext.tsx";


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <CodeBlockProvider>
            <SocketProvider>
                <App/>
            </SocketProvider>
        </CodeBlockProvider>
    </React.StrictMode>,
)
