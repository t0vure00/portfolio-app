import React, { useState, useEffect, useCallback } from "react";
import './App.css';
import { Routes, Route } from "react-router-dom";
import { getGeneralEnTexts, getGeneralFiTexts, getFrontpageFiTexts, 
        getFrontpageEnTexts, getProjectsEnTexts, getProjectsFiTexts, 
        getBackgroundFiTexts, getBackgroundEnTexts } from './components/firebase/Firebase';
import ErrorPage404 from "./components/ErrorPage";
import Homepage from "./components/homepage/Homepage";
import Projects from "./components/projects/Projects";
import Background from "./components/background/Background";


const general_texts_fi = getGeneralFiTexts();
const general_texts_en = getGeneralEnTexts();
const homepage_texts_fi = getFrontpageFiTexts();
const homepage_texts_en = getFrontpageEnTexts();
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
  const [homepageData, setHomepageData] = useState(homepage_texts_fi);
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
      if(filtered_projects.length===0){
        filtered_projects[0] = {
          description: "No projects found with search word: " + filter_words,
        }
      }
    }
    else {
      filtered_projects = projects.slice(0, 3);
    }
    return filtered_projects;
  }

  function updateData(lang){
    if(lang===genData.button.lang_fi){
      setGenData(general_texts_fi);
      setHomepageData(homepage_texts_fi);
      setProjectsData(projects_texts_fi);
      setBackgroundData(background_texts_fi);
      setProjects(getProjects(undefined, projects_texts_fi.projects));
    }else{
      setGenData(general_texts_en);
      setHomepageData(homepage_texts_en);
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

  let dataForHomePage = {
    general_data: genData,
    page_data: homepageData,
    handlePageButtonClick: handlePageButtonClick,
    handleLangButtonClick: handleLangButtonClick,
    activePage: activePage,
    lang: lang,
    titles: [genData.button.frontpage, genData.button.background, genData.button.projects]
  };

  let dataForBackgroundPage = { ...dataForHomePage };
  dataForBackgroundPage.page_data = backgroundData;

  let dataForProjectsPage = { ...dataForHomePage };
  dataForProjectsPage.page_data = projectsData;
  dataForProjectsPage.projects = projects;
  dataForProjectsPage.onSearchFieldChange = onSearchFieldChange;
  dataForProjectsPage.handleSearchButtonClick = handleSearchButtonClick;

  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage { ...dataForHomePage } />} />
        <Route path="/background" element={<Background { ...dataForBackgroundPage }/>} />
        <Route path="/projects" element={<Projects { ...dataForProjectsPage } />} />
        <Route path="*" element={<ErrorPage404 />} />
      </Routes>
    </div>
  );
}

export default App;