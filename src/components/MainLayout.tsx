import React, { useContext, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import About from './About';
import Curriculo from './Currículo';
import Games from './Games';
import Notes from './Notes';
import LandingPage from './LandingPage';
import ProjectsLabel from './ProjectsLabel';
import Contact from './Contact';
import Footer from './Footer';
import { HoverContext } from '../context/HoverContext';

function MainLayout() {
  const { leftRoute, rightRoute } = useParams<{ leftRoute: string; rightRoute: string }>();
  const { hoveredSide, setHoveredSide } = useContext(HoverContext);
  const rightContainerRef = useRef<HTMLDivElement>(null);

  const renderLeft = () => {
    switch(leftRoute) {
      case 'about':
        return <About />;
      case 'projects':
        return <ProjectsLabel />;
      case 'contact':
        return <Contact />;
      case 'landing':
      default:
        return <LandingPage />;
    }
  };

  const renderRight = () => {
    if (leftRoute === 'landing') {
      return null; // Ocultar a metade direita na landing page
    }

    switch(rightRoute) {
      case 'games':
        return <Games />;
      case 'notes':
        return <Notes />;
      case 'curriculo':
        return <Curriculo />;
      default:
        return null; // Opcional: adicionar um componente padrão
    }
  };

  // Função para resetar o estado de hover ao mudar de rota
  useEffect(() => {
    if (leftRoute === 'landing') {
      setHoveredSide(null);
    }
  }, [leftRoute, setHoveredSide]);

  return (
    <main className="main-container">
      <div 
        className={`left-half ${
          leftRoute !== 'landing' 
            ? (hoveredSide === 'left' ? 'expanded' : hoveredSide === 'right' ? 'shrunk' : '')
            : 'full-width'
        }`}
        onMouseEnter={() => {
          if (leftRoute !== 'landing') setHoveredSide('left');
        }}
        onMouseLeave={() => {
          if (leftRoute !== 'landing') setHoveredSide(null);
        }}
      >
        {renderLeft()}
      </div>
      {leftRoute !== 'landing' && (
        <div 
          ref={rightContainerRef}
          className={`right-half ${
            hoveredSide === 'right' ? 'expanded' : hoveredSide === 'left' ? 'shrunk' : ''
          }`}
          onMouseEnter={() => setHoveredSide('right')}
          onMouseLeave={() => setHoveredSide(null)}
          id='right-half'
        >
          {renderRight()}
          <Footer />
        </div>
      )}
    </main>
  );
}

export default MainLayout;
