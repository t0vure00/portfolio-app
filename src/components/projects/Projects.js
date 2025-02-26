import React from "react";
import styles from "./Projects.module.css";
import Header from '../header/Header';
import ProjectBlock from "../project_block/ProjectBlock";

export default function Projects(props){
  const texts = props.page_data;
  const projects = props.projects;

  return (
    <div className="projects">
      <Header {...props}></Header>
      <div className="page_background">
        <div className={ styles.carousel_arrow_prev } onClick={ () => props.handleProjectsClick(0) }></div>
        <div className={ styles.background__scroll }>
          {
            projects.map((project, index) => {
              return (
                <ProjectBlock key={ ('project_' + index) } project={ project }
                        index={ index } label={ texts.label }></ProjectBlock>
              );
            })
          }
        </div>
        <div className={ styles.carousel_arrow_next } onClick={ () => props.handleProjectsClick(1) }></div>
      </div>
    </div>
  );
}