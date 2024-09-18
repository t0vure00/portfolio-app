import React from "react";
import { useState } from 'react';
import './App.css';
import Header from './components/header/Header';
import { getGenEnButtonTexts, getGenEnLabelTexts, getGenFiButtonTexts, 
        getGenFiLabelTexts, getFrontpageLabelTexts  } from './components/firebase/Firebase';

const general_data_fi = {
  label: getGenFiLabelTexts(),
  button: getGenFiButtonTexts()
};

const general_data_en = {
  label: getGenEnLabelTexts(),
  button: getGenEnButtonTexts(),
}

const frontpage_data = {
  label: getFrontpageLabelTexts()
};


function App() {
  const [data, setData] = useState([general_data_fi, frontpage_data]);
  const [lang, setLang] = useState(general_data_fi.button.lang_choice_fi)
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