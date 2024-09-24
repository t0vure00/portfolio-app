import React from "react";
import styles from './PageButtons.module.css';
import { Link, useLocation } from "react-router-dom";


export default function PageButtons(props){
  let { handleClick, activePageIndex, titles} = props;
  let paths = ['/', '/projects', '/background'];

  return (
    <nav className={ styles.page_buttons }>
        {
          titles.map((page, index) => { 
            if(activePageIndex===index){
              return <Link to={ paths[index] } className={ [styles.page_buttons__button, 
                      styles.page_buttons__button__active].join(" ") }
                      key={ index } onClick={ () => handleClick(index) }>
                      { page }</Link>
            }else{
              return <Link to={ paths[index] } className={ styles.page_buttons__button } key={ index } onClick={ () => 
                      handleClick(index) }>{ page }</Link> 
            }
          })
        }
    </nav>
  );
}