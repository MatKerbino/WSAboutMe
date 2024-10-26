import React from 'react';

interface ProjectProps {
    title: string;
    description: string;
    link: string;
    placeholder: string;
    image: string; // Nova propriedade para a imagem
}

function Project({ title, description, link, placeholder, image }: ProjectProps) {
    return (
        <div className="project-container" onClick={() => window.open(link, "_blank")}>
            <div className="project-info" style={{ flex: 1 }}>
                <h1 className="project-title">{title}</h1>
                <p className="project-description">{description}</p>
                <a href={link} target="_blank" rel="noopener noreferrer" className="project-link">{placeholder}</a>
            </div>
            <div className="project-image" style={{ flex: 1 }}>
                <img src={image} alt={title} className="image" />
            </div>
        </div>
    );
}

export default Project;
