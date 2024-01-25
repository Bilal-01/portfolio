import React, { ReactNode } from 'react';

interface ProjectCardProps {
 children: ReactNode;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ children }) => {
 return <div className="project-card">{children}</div>;
};

export default ProjectCard;
