import React from "react";
import Header from './/header/Header';
import ProjectBlock from "./project_block/ProjectBlock";

export default function Projects({ data }){
  const texts = data.page_spec_data;
  let projects = [texts.projects[0], texts.projects[1], texts.projects[2]];

  return (
    <div className="projects">
      <Header data={ data }></Header>
      <div className="page_background">
        {
          projects.map((project, index) => {
            return (
              <ProjectBlock project={ project } index={ index } 
                      label={ texts.label }></ProjectBlock>
            );
          })
        }
      </div>
    </div>
  );
}