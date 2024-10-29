import React from "react";
import styles from './ProjectBlock.module.css';

export default function ProjectBlock({ project, index, label }){
  if(project===undefined || project.description.match("No projects found")){
    return (
      <div key={ index } className={ styles.project_block }>
        <div className={ styles.project_block__project_img__no_zoom }>
          <img alt="Not available"></img>
        </div>
        <div className={ styles.project_block__tech_stack }>
          <div className={ styles.project_block__title } >
            { (project!==undefined && project.description.match("No projects found")) ? project.description : "" }
          </div>
        </div>
        <div className={ [styles.project_block__description, 
                styles.project_block__scroll].join(" ")  }>
          <div className={ styles.project_block__title }></div>
        </div>
      </div>
    );
  }
  return (
    <div key={ index } className={ styles.project_block }>
      <div className={ styles.project_block__project_img }>
        <img src={ project.link } alt="Not available"></img>
      </div>
      <div className={ styles.project_block__tech_stack }>
        <div className={ styles.project_block__title }>
          { label.technologies_title }
        </div>
        { project.technologies }
      </div>
      <div className={ [styles.project_block__description, 
              styles.project_block__scroll].join(" ")  }>
        <div className={ styles.project_block__title }>
          { label.description_title }
        </div>
        { project.description }
      </div>
    </div>
  );
}