import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import MainLayout from './components/MainLayout';
import { HoverProvider } from './context/HoverContext';
import './App.css';

function App() {
  return (
    <Router>
      <HoverProvider>
        <div className="App">
          <Header />
          <Routes>
            {/* Rota padrão redireciona para um layout inicial */}
            <Route path="/" element={<Navigate to="/left/landing/right/games" />} />
            
            {/* Rota principal com segmentos para esquerda e direita */}
            <Route path="/left/:leftRoute/right/:rightRoute" element={<MainLayout />} />
            
            {/* Rota para páginas não encontradas */}
            <Route path="*" element={<h1>404 - Página Não Encontrada</h1>} />
          </Routes>
        </div>
      </HoverProvider>
    </Router>
  );
}

export default App;
