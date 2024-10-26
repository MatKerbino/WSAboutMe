import React from 'react';
import SocialMedia from './utils/SocialMedia';

function LandingPage() {
    return (
        <div className="landing-container">
            <div className="landing-info">
                <h1 className="landing-title">Olá, me chamo Matheus!</h1>
                <img src="path/to/your/image.jpg" alt="Foto do Matheus☼" className="landing-image"/>
            </div>
             <div className="landing-description">
              <p>Estudante de engenharia de software na Universidade do Estado do Pará (UEPA)</p>
            </div>
              <SocialMedia/>
        </div>
    );
}

export default LandingPage;
