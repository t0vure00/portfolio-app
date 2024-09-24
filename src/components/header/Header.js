import React from "react";
import styles from './Header.module.css';
import ContactMe from "../contact_me/ContactMe";
import PageButtons from "../page_buttons/PageButtons";
import LangButton from "../lang_button/LangButton";

export default function Header({ data }) {
  const { general_data, page_spec_data, handleLangButtonClick, handlePageButtonClick, 
          activePage, lang, titles} = data;

  // console.log(page_spec_data);
          
  return(
    <div className={ styles.header }>
      <div className={ styles.header__title }>{ 
              page_spec_data.label.title.toUpperCase() }</div>
      <div className={ styles.header__buttons }>
        <div className={ styles.header__buttons__upper }>
          <ContactMe text={ general_data.label.contact_me }></ContactMe>
          <LangButton lang={ lang } handleClick={ handleLangButtonClick }>
          </LangButton>
        </div>
        <PageButtons handleClick={ handlePageButtonClick } 
                activePageIndex={ activePage } titles={ titles }>
        </PageButtons>
      </div>
    </div>
  );
}