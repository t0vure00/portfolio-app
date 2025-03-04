import React from "react";
import styles from './Header.module.css';
import ContactMe from "../contact_me/ContactMe";
import PageButtons from "../page_buttons/PageButtons";
import LangButton from "../lang_button/LangButton";

export default function Header(props) {
  const { general_data, page_data, handleLangButtonClick, activePage, 
          lang, titles, onSearchFieldChange, handleSearchClick} = props;

  return (activePage===2) ?
    (
      <div className={ styles.header }>
        <div className={ styles.header__title }>{ 
                page_data.label.title.toUpperCase() }</div>
        <div className={ styles.header__buttons }>
          <div className={ styles.header__buttons__upper }>
            <ContactMe text={ general_data.label.contact_me }></ContactMe>
            <LangButton lang={ lang } handleClick={ handleLangButtonClick }>
            </LangButton>
          </div>
            <div className={ styles.buttons }>
              <div className={ styles.search_block_container }>
                <div className={ styles.search_button } onClick={ handleSearchClick }>
                  { page_data.button.search }
                </div>
                <input type="text" name="search" placeholder={ page_data.label.search }
                        onChange={onSearchFieldChange}/>
              </div>
              <PageButtons activePageIndex={ activePage } titles={ titles }>
              </PageButtons>
            </div>
        </div>
      </div>
    )
  :(
    <div className={ styles.header }>
      <div className={ styles.header__title }>{ 
              page_data.label.title.toUpperCase() }</div>
      <div className={ styles.header__buttons }>
        <div className={ styles.header__buttons__upper }>
          <ContactMe text={ general_data.label.contact_me }></ContactMe>
          <LangButton lang={ lang } handleClick={ handleLangButtonClick }>
          </LangButton>
        </div>
        <PageButtons activePageIndex={ activePage } titles={ titles }>
        </PageButtons>
      </div>
    </div>
  );
}