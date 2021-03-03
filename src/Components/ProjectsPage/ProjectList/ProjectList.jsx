import React, { useEffect, useContext } from 'react';
import ProjectsContext from '../../../Context/projects/projectsContext';
import ProjectCard from './ProjectCard';

export default function ProjectList() {
  const projectContext = useContext(ProjectsContext);
  useEffect(() => {
    projectContext.getProjectsListFromApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {projectContext.projects.map((project) => {
        return <ProjectCard project={project} key={project.project_id} />;
      })}
    </>
  );
}
