import React from "react";
import styles from './InfoBlock.module.css';

export default function InfoBlock({ data_to_display }) {
  if(data_to_display===undefined){
    return (     
      <div className={ styles.info_block }>
        <div className={ styles.information } >
          <div className={ styles.place }></div>
          <div className={ styles.title }></div>
          <div className={ styles.interval }></div>
        </div>
        <div className={ styles.line }></div>
        <div className={ styles.description } ></div>
      </div>
    )
  }else{
    return (
      <div className={ styles.info_block }>
        <div className={ styles.information } >
          <div className={ styles.place }>
            { data_to_display.place }
          </div>
          <div className={ styles.title }>
            { data_to_display.title }
          </div>
          <div className={ styles.interval }>
            { data_to_display.interval }
          </div>
        </div>
        <div className={ styles.line }></div>
        <div className={ styles.description } >
          { data_to_display.description }
        </div>
      </div>
    ) 
  }
}