import React from "react";
import { useState } from 'react';
import './App.css';
import Header from './components/header/Header';

// TO DO: this is stand in data, will be replaced later with data from firebase
const general_data_fi = {
  label: {
    contact_me: "Ota yhteyttä",
  },
  button: {
    background: "Tausta",
    linkedin: "LinkedIn",
    frontpage: "Etusivu",
    lang_choice_en: "ENFI",
    lang_choice_fi: "FIEN",
    projects: "Projektit"
  }
};

const general_data_en = {
  label: {
    contact_me: "Contact me",
  },
  button: {
    background: "Background",
    linkedin: "LinkedIn",
    frontpage: "Frontpage",
    lang_choice_en: "ENFI",
    lang_choice_fi: "FIEN",
    projects: "Projects",
  },
}

const frontpage_data = {
    frontpage_title: "Portfolio"
};


function App() {
  const [lang, setLang] = useState(general_data_fi.button.lang_choice_fi)
  const [data, setData] = useState([general_data_fi, frontpage_data]);
  const [activePage, setActivePage] = useState(0);

  function handlePageButtonClick(type){
    if(type!==activePage){
      setActivePage(type);
    }
  }
  
  function handleLangButtonClick(){
    if(lang===data[0].button.lang_choice_fi){
      setLang(data[0].button.lang_choice_en);
      setData([general_data_en, frontpage_data]);
    }else {
      setLang(data[0].button.lang_choice_fi);
      setData([general_data_fi, frontpage_data]);
    }
  }

  let titles = [data[0].button.frontpage, data[0].button.projects, data[0].button.background];

  return (
    <div className="PortfolioApp">
      <Header general_data={data[0]} frontpage_data={ data[1] }
            handlePageButtonClick={ handlePageButtonClick } 
            handleLangButtonClick={ handleLangButtonClick }
            activePage={ activePage } lang={ lang } titles={ titles }>
      </Header>
      <div className="page_background"></div>
    </div>
  );
}

export default App;