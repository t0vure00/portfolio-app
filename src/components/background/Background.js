import React from "react";
import styles from './Background.module.css';
import Header from '../header/Header';
import InfoBlock from "../info_block/InfoBlock";

function addEmptyIndexes(to_add_to){
  if(to_add_to.length<3){
    for(let i = to_add_to.length; i<3; i++){
      to_add_to[i] = undefined;
    }
  }
  return to_add_to;
}

export default function Background(props){
  const { label, education, experience } = props.page_data;
  const education_list = addEmptyIndexes(education);
  const experience_list = addEmptyIndexes(experience);
  
  return (
    <div className="background">
      <Header {...props}></Header>
      <div className="page_background">
        <div className={ styles.background__info }>
          <span className={ styles.title }>{ label.edu_title }</span>
          <div className={ styles.background__scroll }>
          {
            education_list.map((edu, index)  => {
              return (<InfoBlock key={ ('education_' + index) }
                      data_to_display={ edu } styles={ {display: "none"} }>
                      </InfoBlock>);
            })
          }
          </div>
        </div>
        <div className={ styles.background__info }>
          <span className={ styles.title }>{ label.exp_title }</span>
          <div className={ styles.background__scroll }>
          {
            experience_list.map((exp, index)  => {
              return ( <InfoBlock key={ ('experience_' + index) } 
                      data_to_display={ exp } ></InfoBlock> );
            })
          }
          </div>
        </div>
      </div>
    </div>
  );
}