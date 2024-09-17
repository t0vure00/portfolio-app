import React from "react";
import { useState } from 'react';
import './App.css';
import Header from './components/header/Header';

// TO DO: this is stand in data, will be replaced later with data from firebase
const general_data = {
  label: {
    contact_me_en: "Contact me",
    contact_me_fi: "Ota yhteyttä",
  },
  button: {
    background_en: "Background",
    background_fi: "Tausta",
    linkedin: "LinkedIn",
    frontpage_en: "Frontpage",
    frontpage_fi: "Etusivu",
    lang_choice_en: "ENFI",
    lang_choice_fi: "FIEN",
    projects_en: "Projects",
    projects_fi: "Projektit"
  },
};

const frontpage_data = {
    frontpage_title: "Portfolio"
};


function App() {
  const [lang, setLang] = useState(general_data.button.lang_choice_fi)
  const [activePage, setActivePage] = useState(0);

  function handlePageButtonClick(type){
    const types = ['frontpage', 'projects', 'background'];
    if(type!==activePage){
      setActivePage(type);
    }
  }
  
  function handleLangButtonClick(){
    if(lang===general_data.button.lang_choice_fi){
      setLang(general_data.button.lang_choice_en);
    }else {
      setLang(general_data.button.lang_choice_fi);
    }
  }

  return (
    <div className="App">
      <Header general_data={general_data} frontpage_data={ frontpage_data }
              handlePageButtonClick={ handlePageButtonClick } 
              handleLangButtonClick={ handleLangButtonClick }
              activePage={ activePage } lang={ lang }></Header>
      <div className="page"></div>
    </div>
  );
}

export default App;