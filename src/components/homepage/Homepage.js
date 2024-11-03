import React from 'react';
import styles from './Homepage.module.css';
import Header from '../header/Header';

export default function Frontpage(props){
  return (
    <div className="homepage">
      <Header {...props}></Header>
      <div className="page_background">
        <div className={ styles.homepage__animation }>
          <div className={ styles.homepage__greeting }>
            { props.page_data.label.greeting }
          </div> 
          <div className={ styles.homepage__about_me }>
            { props.page_data.label.about_me }
          </div>
        </div>
      </div>
    </div>
  );
}