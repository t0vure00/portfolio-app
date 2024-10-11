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
  const [genData, setGenData] = useState(general_texts_fi);
  const [frontpageData, setFrontpageData] = useState(frontpage_texts);
  const [projectsData, setProjectsData] = useState(projects_texts_fi);
  const [backgroundData, setBackgroundData] = useState(background_texts_fi);
  const [lang, setLang] = useState(genData.button.lang_choice_fi)
  const [activePage, setActivePage] = useState(getCurrentActivePage());
  const [projects, setProjects] = useState(projects_texts_fi.projects.slice(0, 3));
  const [searchTerm, setSearchTerm] = useState("");

  const handleBackAndForwardButtons = () => {
    setActivePage(getCurrentActivePage());
  };

  function getCurrentActivePage() {
    const current_page = window.location.href;
    return current_page.endsWith('background') ? 1 : 
            current_page.endsWith('projects') ? 2 : 0;
  }

  function getProjects(filter_words=undefined, projects){
    let filtered_projects = [];
    
    if(filter_words!==undefined){
      filtered_projects = projects.filter((project) => 
              project.technologies.toLowerCase().includes(filter_words.toLowerCase())); 
    }
    else {
      filtered_projects = projects.slice(0, 3);
    }
    return filtered_projects;
  }

  function updateData(lang){
    if(lang===genData.button.lang_fi){
      setGenData(general_texts_fi);
      setFrontpageData(frontpage_texts);
      setProjectsData(projects_texts_fi);
      setBackgroundData(background_texts_fi);
      setProjects(getProjects(undefined, projects_texts_fi.projects));
    }else{
      setGenData(general_texts_en);
      setFrontpageData(frontpage_texts);
      setProjectsData(projects_texts_en);
      setBackgroundData(background_texts_en);
      setProjects(getProjects(undefined, projects_texts_en.projects));
    }
  }

  function handlePageButtonClick(type){
    if(type!==activePage){
      setActivePage(type);
    }
  }
  
  function handleLangButtonClick(){
    const new_lang = isLanguageFinnish() ? genData.button.lang_en
            : genData.button.lang_fi;
    setLang(new_lang);
    updateData(new_lang);
  }

  function isLanguageFinnish(){
    return lang===genData.button.lang_fi;
  }

  function handleSearchButtonClick(){
    const projects = isLanguageFinnish() ? projects_texts_fi.projects : projects_texts_en.projects;
    setProjects(getProjects(searchTerm, projects));
  }

  function onSearchFieldChange(event){
    setSearchTerm(event.target.value);
    if(event.target.value===""){
      const projects = isLanguageFinnish() ? projects_texts_fi.projects : projects_texts_en.projects;
      setProjects(getProjects(undefined, projects));
    }
  }

  useBackForwardButton(handleBackAndForwardButtons);

  let dataForFrontPage = {
    general_data: genData,
    page_spec_data: frontpageData,
    handlePageButtonClick: handlePageButtonClick,
    handleLangButtonClick: handleLangButtonClick,
    activePage: activePage,
    lang: lang,
    titles: [genData.button.frontpage, genData.button.background, genData.button.projects]
  };

  let dataForBackgroundPage = { ...dataForFrontPage };
  dataForBackgroundPage.page_spec_data = backgroundData;

  let dataForProjectsPage = { ...dataForFrontPage };
  dataForProjectsPage.page_spec_data = projectsData;
  dataForProjectsPage.projects = projects;
  dataForProjectsPage.onSearchFieldChange = onSearchFieldChange;
  dataForProjectsPage.handleSearchButtonClick = handleSearchButtonClick;

  return (
    <div>
      <Routes>
        <Route path="/" element={<Frontpage { ...dataForFrontPage } />} />
        <Route path="/background" element={<Background { ...dataForBackgroundPage }/>} />
        <Route path="/projects" element={<Projects { ...dataForProjectsPage } />} />
        <Route path="*" element={<ErrorPage404 />} />
      </Routes>
    </div>
  );
}

export default App;