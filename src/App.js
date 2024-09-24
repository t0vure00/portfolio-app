import React from "react";
import { useState, useEffect, useCallback } from 'react';
import './App.css';
import {  getGenEnTexts, getGenFiTexts, getFrontpageLabelTexts, 
        getProEnTexts, getProFiTexts } from './components/firebase/Firebase';
import { Routes, Route } from "react-router-dom";
import ErrorPage404 from "./components/ErrorPage";
import Fronptage from "./components/Frontpage";
import Projects from "./components/Projects";
import Background from "./components/Background";


const general_data_fi = getGenFiTexts();
const general_data_en = getGenEnTexts();
const frontpage_data = getFrontpageLabelTexts();
const projects_data_fi = getProFiTexts();
const projects_data_en = getProEnTexts();


const useBackForwardButton = (callback) => {
  const handleBackAndForwardButton = useCallback(callback, [callback]);

  useEffect(() => {
    window.addEventListener('popstate', handleBackAndForwardButton);
    return () => {
      window.removeEventListener('popstate', handleBackAndForwardButton);
    };
  }, [handleBackAndForwardButton]);
};


function App() {
  const [genData, setGenData] = useState(general_data_fi);
  const [pageData, setPageData] = useState(frontpage_data);
  const [lang, setLang] = useState(genData.button.lang_choice_fi)
  const [activePage, setActivePage] = useState(0);

  useEffect(() => {
    updateData(activePage, lang);
  }, [activePage, lang]);

  const handleBackAndForwardButton = () => {
    const current_page = window.location.href;
    if(current_page.endsWith('/')){
      setActivePage(0);
    }else if (current_page.endsWith('projects')){
      setActivePage(1);
    }else if (current_page.endsWith('background')){
      setActivePage(2);
    }
  };

  function handlePageButtonClick(type){
    if(type!==activePage){
      setActivePage(type);
    }
  }
  
  function handleLangButtonClick(){
    if(lang===genData.button.lang_choice_fi){
      setLang(genData.button.lang_choice_en);
    }else {
      setLang(genData.button.lang_choice_fi);
    }
  }

  function updateData(activePage, lang){
    if(lang==='FIEN'){
      setGenData(general_data_fi);
      if(activePage===0){
        setPageData(frontpage_data);
      }else if(activePage===1){
        setPageData(projects_data_fi);
      }else if(activePage===2){
        setPageData(frontpage_data);
      }
    }else{
      setGenData(general_data_en);
      if(activePage===0){
        setPageData(frontpage_data);
      }else if(activePage===1){
        setPageData(projects_data_en);
      }else if(activePage===2){
        setPageData(frontpage_data);
      }
    }
  }

  useBackForwardButton(handleBackAndForwardButton);

  let titles = [genData.button.frontpage, genData.button.projects, genData.button.background];

  let dataForPage = {
    general_data: genData,
    page_spec_data: pageData,
    handlePageButtonClick: handlePageButtonClick,
    handleLangButtonClick: handleLangButtonClick,
    activePage: activePage,
    lang: lang,
    titles: titles
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<Fronptage data={ dataForPage} />} />
        <Route path="/projects" element={<Projects data={ dataForPage } />} />
        <Route path="/background" element={<Background data={ dataForPage }/>} />
        <Route path="*" element={<ErrorPage404 />} />
      </Routes>
    </div>
  );
}

export default App;