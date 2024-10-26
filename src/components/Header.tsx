import { useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { HoverContext } from '../context/HoverContext';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  useContext(HoverContext);

  // Extrai os segmentos atuais da URL
  const pathParts = location.pathname.split('/');
  const currentRight = pathParts[4] || 'games';

  const handleNavigation = (left: string) => {
    navigate(`/left/${left}/right/${currentRight}`);
  };

  return (
    <header className="header">
      <nav>
        <ul className="header-menu">
          <li className="left-button-header">
            <button onClick={() => handleNavigation('landing')} className="header-link">
              Matheus Willian
            </button>
          </li>
          <li>
            <button onClick={() => handleNavigation('about')} className="header-link">Sobre</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('projects')} className="header-link">Projetos</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('contact')} className="header-link">Contato</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
