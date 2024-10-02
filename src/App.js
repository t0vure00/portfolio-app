import React from "react";
import { useState, useEffect, useCallback } from 'react';
import './App.css';
import {  getGeneralEnTexts, getGeneralFiTexts, getFrontpageTexts, 
      getProjectsEnTexts, getProjectsFiTexts, getBackgroundFiTexts, 
      getBackgroundEnTexts } from './components/firebase/Firebase';
import { Routes, Route } from "react-router-dom";
import ErrorPage404 from "./components/ErrorPage";
import Frontpage from "./components/Frontpage";
import Projects from "./components/Projects";
import Background from "./components/Background";


const general_texts_fi = getGeneralFiTexts();
const general_texts_en = getGeneralEnTexts();
const frontpage_texts = getFrontpageTexts();
const projects_texts_fi = getProjectsFiTexts();
const projects_texts_en = getProjectsEnTexts();
const background_texts_fi = getBackgroundFiTexts();
const background_texts_en = getBackgroundEnTexts();


const useBackForwardButton = (callback) => {
  const handleBackAndForwardButtons = useCallback(callback, [callback]);

  useEffect(() => {
    window.addEventListener('popstate', handleBackAndForwardButtons);
    return () => {
      window.removeEventListener('popstate', handleBackAndForwardButtons);
    };
  }, [handleBackAndForwardButtons]);
};


function App() {

  const handleBackAndForwardButtons = () => {
    setActivePage(getCurrentActivePage());
  };

  function getCurrentActivePage() {
    const current_page = window.location.href;
    return current_page.endsWith('background') ? 1 : 
            current_page.endsWith('projects') ? 2 : 0;
  }

  function updateData(lang){
    if(lang===genData.button.lang_fi){
      setGenData(general_texts_fi);
      setFrontpageData(frontpage_texts);
      setProjectsData(projects_texts_fi);
      setBackgroundData(background_texts_fi);
    }else{
      setGenData(general_texts_en);
      setFrontpageData(frontpage_texts);
      setProjectsData(projects_texts_en);
      setBackgroundData(background_texts_en);
    }
  }

  function handlePageButtonClick(type){
    if(type!==activePage){
      setActivePage(type);
    }
  }
  
  function handleLangButtonClick(){
    const new_lang = (lang===genData.button.lang_fi) ? genData.button.lang_en
            : genData.button.lang_fi;
    setLang(new_lang);
    updateData(new_lang);
  }

  useBackForwardButton(handleBackAndForwardButtons);

  const [genData, setGenData] = useState(general_texts_fi);
  const [frontpageData, setFrontpageData] = useState(frontpage_texts);
  const [projectsData, setProjectsData] = useState(projects_texts_fi);
  const [backgroundData, setBackgroundData] = useState(background_texts_fi);
  const [lang, setLang] = useState(genData.button.lang_choice_fi)
  const [activePage, setActivePage] = useState(getCurrentActivePage());

  let dataForFrontPage = {
    general_data: genData,
    page_spec_data: frontpageData,
    handlePageButtonClick: handlePageButtonClick,
    handleLangButtonClick: handleLangButtonClick,
    activePage: activePage,
    lang: lang,
    titles: [genData.button.frontpage, genData.button.background, genData.button.projects]
  };

  let dataForProjectsPage = { ...dataForFrontPage };
  dataForProjectsPage.page_spec_data = projectsData;

  let dataForBackgroundPage = { ...dataForFrontPage };
  dataForBackgroundPage.page_spec_data = backgroundData;

  return (
    <div>
      <Routes>
        <Route path="/" element={<Frontpage data={ dataForFrontPage } />} />
        <Route path="/background" element={<Background data={ dataForBackgroundPage }/>} />
        <Route path="/projects" element={<Projects data={ dataForProjectsPage } />} />
        <Route path="*" element={<ErrorPage404 />} />
      </Routes>
    </div>
  );
}

export default App;