import { useNavigate, useLocation } from 'react-router-dom';

function Footer() {
    const navigate = useNavigate();
    const location = useLocation();

    // Extrai os segmentos atuais da URL
    const pathParts = location.pathname.split('/');
    const leftRoute = pathParts[2] || 'landing';

    // Função para atualizar o conteúdo da direita
    const handleRightClick = (right: string) => {
        navigate(`/left/${leftRoute}/right/${right}`);
    };

    return (
        <div className="container-footer">
            <nav>
                <ul>
                    <button onClick={() => handleRightClick('curriculo')} className="footer-link">Currículo</button>
                    <button onClick={() => handleRightClick('games')} className="footer-link">Games</button>
                    <button onClick={() => handleRightClick('notes')} className="footer-link">Notes</button>
                </ul>
            </nav>
        </div>
    );
}

export default Footer;
