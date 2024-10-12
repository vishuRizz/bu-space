import { StrictMode } from 'react'
import React from "react"
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
