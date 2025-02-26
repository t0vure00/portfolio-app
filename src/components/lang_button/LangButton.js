import React from 'react';
import styles from './LangButton.module.css';

export default function LangButton({ lang, handleClick }) {
  let chosen_lang= lang.slice(0,2);
  let other_lang  = lang.slice(2,4);
  if((chosen_lang!=='FI' && chosen_lang!=='EN') || (other_lang!=='FI' && other_lang!=='EN')){
    chosen_lang = 'FI';
    other_lang = 'EN';
  }
  
  return (
    <div className={ styles.lang_button__dropdown }>
      <span>{ chosen_lang }</span>
      <button className={ styles.lang_button__dropbtn }
              onClick={ handleClick }>{ other_lang }</button>
    </div>
  );
}