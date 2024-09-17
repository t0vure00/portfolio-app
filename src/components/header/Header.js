import React from "react";
import styles from './Header.module.css';
import ContactMe from "../contact_me/ContactMe";
import PageButtons from "../page_buttons/PageButtons";
import LangButton from "../lang_button/LangButton";

export default function Header(props) {
  const { general_data, frontpage_data, handleLangButtonClick, handlePageButtonClick, 
          activePage, lang} = props;
          
  return(
    <div className={ styles.header }>
      <div className={ styles.header__title }>{ 
              frontpage_data.frontpage_title.toUpperCase() }</div>
      <div className={ styles.header__buttons }>
        <div className={ styles.header__buttons__upper }>
          <ContactMe text={ general_data.label.contact_me_en }></ContactMe>
          <LangButton lang={ lang } handleClick={ handleLangButtonClick }>
          </LangButton>
        </div>
        <PageButtons handleClick={ handlePageButtonClick } activePage={ activePage }
                lang={ lang }>
        </PageButtons>
      </div>
    </div>
  );
}