import React from 'react';
import socialData from './SocialMedia.json'; 
import * as FaIcons from 'react-icons/fa';

function SocialMedia() {
    return (
        <div className="social-media-container">
            <h3 className="social-media-title">Redes Sociais</h3>
            <div className="social-media-icons">
                {socialData.map((social, index) => {
                    const IconComponent = FaIcons[social.icon as keyof typeof FaIcons];
                    return (
                        <a 
                            key={index} 
                            href={social.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="social-container"
                            aria-label={social.name}
                        >
                            <IconComponent className="social-icon"/>
                            <span className="social-name">{social.name}</span>
                        </a>
                    );
                })}
            </div>
        </div>
    );
}

export default SocialMedia;
