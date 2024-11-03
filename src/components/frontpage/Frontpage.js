import React from 'react';
import styles from './Frontpage.module.css';
import Header from '../header/Header';

export default function Frontpage(props){
  return (
    <div className="frontpage">
      <Header {...props}></Header>
      <div className="page_background">
        <div className={ styles.animation }>
          <div className={ styles.greeting }>
            { props.page_data.label.greeting }
          </div> 
          <div className={ styles.about_me }>
            { props.page_data.label.about_me }
          </div>
        </div>
      </div>
    </div>
  );
}