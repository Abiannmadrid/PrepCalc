import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Landing from './Landing.jsx'
import App from './App.jsx'   // your calculator
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/calc" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)


