import React from "react";
import styles from './PageButtons.module.css';

export default function PageButtons(props){
  let { handleClick, activePageIndex, titles} = props;

  return (
    <div className={ styles.page_buttons }>
        {
          titles.map((page, index) => { 
            if(activePageIndex===index){
              return <div className={ [styles.page_buttons__button, 
                      styles.page_buttons__button__active].join(" ") }
                      key={ index } onClick={ () => handleClick(index) }>
                      { page }</div>
            }else{
              return <div className={ styles.page_buttons__button } key={ index } onClick={ () => 
                      handleClick(index) }>{page}</div> 
            }
          })
        }
    </div>
  );
}