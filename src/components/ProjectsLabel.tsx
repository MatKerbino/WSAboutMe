import React, { useState, useEffect, useContext } from 'react';
import Project from './utils/Project';
import projectsData from './utils/projects.json';
import { HoverContext } from '../context/HoverContext';

function ProjectsLabel() {
    interface Project {
        title: string;
        description: string;
        link: string;
        placeholder: string;
        image: string; 
    }

    const [Projects, setProject] = useState<Project[]>([]);
    const { hoveredSide } = useContext(HoverContext);

    useEffect(() => {
        const updatedProjectsData = projectsData.map((project) => ({
            ...project,
            image: project.image || project.placeholder || '', // Use placeholder como fallback para image
        }));
        setProject(updatedProjectsData);
    }, []);

    return (
        <section id="projects" className="projects-section">
            <h2 className="projects-title">Projetos</h2>
            <div className={`projects-container ${hoveredSide === 'right' ? 'stacked' : ''}`}>
                {Projects.map((project, index) => (
                    <Project 
                        key={index}
                        title={project.title} 
                        description={project.description} 
                        link={project.link} 
                        placeholder={project.placeholder}
                        image={project.image} 
                    />
                ))}
            </div>
        </section>
    );
}

export default ProjectsLabel;