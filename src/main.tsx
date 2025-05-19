import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.scss'
import { App } from './App'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainPage } from './pages/MainPage/MainPage';
import { SuperHero } from './pages/Superhero/Superhero';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <StrictMode>
    <Router >
      <Routes >
        <Route path='/' element={<App />}>
          <Route index element={<MainPage />} />
          <Route path=':id' element={<SuperHero />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>,
)
