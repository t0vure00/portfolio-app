import React from "react";
import styles from './InfoBlock.module.css';

export default function InfoBlock({ data_to_display }) {
  if(data_to_display===undefined){
    return (     
      <div className={ styles.info_block }>
        <div className={ styles.info_block__information } >
          <div className={ styles.info_block__place }></div>
          <div className={ styles.info_block__title }></div>
          <div className={ styles.info_block__interval }></div>
        </div>
        <div className={ styles.info_block__line }></div>
        <div className={ styles.info_block__description } ></div>
      </div>
    )
  }else{
    return (
      <div className={ styles.info_block }>
        <div className={ styles.info_block__information } >
          <div className={ styles.info_block__place }>
            { data_to_display.place }
          </div>
          <div className={ styles.info_block__title }>
            { data_to_display.title }
          </div>
          <div className={ styles.info_block__interval }>
            { data_to_display.interval }
          </div>
        </div>
        <div className={ styles.info_block__line }></div>
        <div className={ styles.info_block__description } >
          { data_to_display.description }
        </div>
      </div>
    ) 
  }
}