import React from "react";
import Header from './/header/Header';
import ProjectBlock from "./project_block/ProjectBlock";

export default function Projects(props){
  const texts = props.page_data;
  const projects = props.projects;

  return (
    <div className="projects">
      <Header {...props}></Header>
      <div className="page_background">
        {
          projects.map((project, index) => {
            return (
              <ProjectBlock key={ ('project_' + index) }project={ project } index={ index } 
                      label={ texts.label }></ProjectBlock>
            );
          })
        }
      </div>
    </div>
  );
}