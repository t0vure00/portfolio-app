import React from "react";
import styles from './ContactMe.module.css';

export default function ContactMe({ text }){
  return(
    <div className={ styles.contact_me }>
      <div className={ styles.contact_me__text }>{ text + ":"}</div>
      <a href="https://www.linkedin.com/in/reetta-vuokila-a90950207/">
        <div className={ styles.contact_me__button }>LinkedIn</div>
      </a>
    </div>
  );
}