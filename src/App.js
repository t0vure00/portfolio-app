import React, { useState, useEffect } from "react";
import './App.css';
import { Routes, Route } from "react-router-dom";
import { getGeneralEnTexts, getGeneralFiTexts, getFrontpageFiTexts, 
        getFrontpageEnTexts, getProjectsEnTexts, getProjectsFiTexts, 
        getBackgroundFiTexts, getBackgroundEnTexts } from './components/firebase/Firebase';
import ErrorPage404 from "./components/error_page/ErrorPage";
import Homepage from "./components/homepage/Homepage";
import Projects from "./components/projects/Projects";
import Background from "./components/background/Background";


const generalTextsFi = getGeneralFiTexts();
const generalTextsEn = getGeneralEnTexts();
const homepageTextsFi = getFrontpageFiTexts();
const homepageTextsEn = getFrontpageEnTexts();
const projectsTextsFi = getProjectsFiTexts();
const projectsTextsEn = getProjectsEnTexts();
const backgroundTextsFi = getBackgroundFiTexts();
const backgroundTextsEn = getBackgroundEnTexts();

function setProjectsInitialVisibility(){
  projectsTextsFi.projects = setProjectsVis(projectsTextsFi.projects, 0);
}

function setProjectsVis(projects, startingIndex){
  let tempProjects = JSON.parse(JSON.stringify(projects));
  let upperLimit = startingIndex + (window.innerWidth>600 ? 2 : projectsTextsFi.projects.length);
  for (let i = 0; i<tempProjects.length; i++){
    tempProjects[i].visibility = (i>=startingIndex && i<=upperLimit) ? true : false;
  }
  return tempProjects;
}


function App() {
  setProjectsInitialVisibility();
  let projectsIndex = 0;
  const [genData, setGenData] = useState(generalTextsFi);
  const [homepageData, setHomepageData] = useState(homepageTextsFi);
  const [projectsData, setProjectsData] = useState(projectsTextsFi);
  const [backgroundData, setBackgroundData] = useState(backgroundTextsFi);
  const [lang, setLang] = useState(genData.button.lang_choice_fi)
  const [projects, setProjects] = useState(projectsTextsFi.projects);
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    function handleWindowResize() {
      let tempProjects = JSON.parse(JSON.stringify(projects));
      let upperLimit = projectsIndex + (window.innerWidth>600 ? 2 : projectsTextsFi.projects.length);
      for (let i = 0; i<tempProjects.length; i++){
        tempProjects[i].visibility = (i>=projectsIndex && i<=upperLimit) ? true : false;
      }
      setProjects(tempProjects);
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [projects, projectsIndex]);

  
  function updateData(lang){
    if(lang===genData.button.lang_fi){
      setGenData(generalTextsFi);
      setHomepageData(homepageTextsFi);
      setProjectsData(projectsTextsFi);
      setBackgroundData(backgroundTextsFi);
      filterAndSetProjects(undefined, projectsTextsFi.projects);
    }else{
      setGenData(generalTextsEn);
      setHomepageData(homepageTextsEn);
      setProjectsData(projectsTextsEn);
      setBackgroundData(backgroundTextsEn);
      filterAndSetProjects(undefined, projectsTextsEn.projects);
    }
  }

  function filterAndSetProjects(searchWord=undefined, projects){
    let filteredProjects = projects;
    if(searchWord!==undefined){
      filteredProjects = projects.filter((project) => 
              project.technologies.toLowerCase().includes(searchWord.toLowerCase()));
      if(filteredProjects.length===0){
        filteredProjects[0] = {
          description: "No projects found with search word: " + searchWord,
        }
      }
    }
    setProjects(setProjectsVis(filteredProjects, projectsIndex));
  }
  
  function handleLangButtonClick(){
    const new_lang = isLangFi() ? genData.button.lang_en
            : genData.button.lang_fi;
    setLang(new_lang);
    updateData(new_lang);
  }

  function isLangFi(){
    return lang===genData.button.lang_fi;
  }

  function handleSearchButtonClick(){
    filterAndSetProjects(searchTerm, getAllProjects());
  }

  function getAllProjects(){
    return isLangFi() ? projectsTextsFi.projects
            : projectsTextsEn.projects;
  }

  function onSearchFieldChange(event){
    setSearchTerm(event.target.value);
    if(event.target.value===""){
      projectsIndex = 0;
      filterAndSetProjects(undefined, getAllProjects());
    }
  }

  function handleProjectsClick(id){
    if(projects.length < 3){
      return; 
    }

    projectsIndex = (id===0) ? (projectsIndex < 1 ? projectsIndex : -1) 
            : (projectsIndex >= projects.length ? projectsIndex : +1);
    filterAndSetProjects(undefined, projects);
  }

  let homePageData = {
    general_data: genData,
    page_data: homepageData,
    handleLangButtonClick: handleLangButtonClick,
    activePage: 0,
    lang: lang,
    titles: [genData.button.frontpage, genData.button.background, genData.button.projects]
  };

  let backgroundPageData = { ...homePageData };
  backgroundPageData.page_data = backgroundData;
  backgroundPageData.activePage = 1;

  let projectsPageData = { ...homePageData };
  projectsPageData.page_data = projectsData;
  projectsPageData.projects = projects;
  projectsPageData.activePage = 2;
  projectsPageData.onSearchFieldChange = onSearchFieldChange;
  projectsPageData.handleSearchClick = handleSearchButtonClick;
  projectsPageData.handleProjectsClick = handleProjectsClick;

  let errorPageData = { ...genData }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage { ...homePageData } />} />
        <Route path="/background" element={<Background { ...backgroundPageData }/>} />
        <Route path="/projects" element={<Projects { ...projectsPageData } />} />
        <Route path="*" element={<ErrorPage404 { ...errorPageData } />} />
      </Routes>
    </div>
  );
}

export default App;