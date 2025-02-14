import React, { useState, useRef, useEffect } from "react";
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


function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // const windowWidth = useRef(window.innerWidth);
  // console.log(windowWidth);
  let projectsIndex = 0;
  const [genData, setGenData] = useState(general_texts_fi);
  const [homepageData, setHomepageData] = useState(homepage_texts_fi);
  const [projectsData, setProjectsData] = useState(projects_texts_fi);
  const [backgroundData, setBackgroundData] = useState(background_texts_fi);
  const [lang, setLang] = useState(genData.button.lang_choice_fi)
  const [projects, setProjects] = useState(setProjectsVis(projects_texts_fi.projects));
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    function handleWindowResize() {
      console.log("Window resize triggered");
      setWindowWidth(window.innerWidth);
      projectsIndex = 0;
      setProjects(getProjects(searchTerm, projects));
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  function getProjects(search_words=undefined, projects){
    let filtered_projects = projects;
    if(search_words!==undefined){
      filtered_projects = projects.filter((project) => 
              project.technologies.toLowerCase().includes(search_words.toLowerCase()));
      if(filtered_projects.length===0){
        filtered_projects[0] = {
          description: "No projects found with search word: " + search_words,
        }
      }
    }
    filtered_projects = setProjectsVis(filtered_projects);
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
  
  function handleLangButtonClick(){
    const new_lang = isLangFinnish() ? genData.button.lang_en
            : genData.button.lang_fi;
    setLang(new_lang);
    updateData(new_lang);
  }

  function isLangFinnish(){
    return lang===genData.button.lang_fi;
  }

  function handleSearchButtonClick(){
    const projects = isLangFinnish() ? projects_texts_fi.projects 
            : projects_texts_en.projects;
    setProjects(getProjects(searchTerm, projects));
  }

  function onSearchFieldChange(event){
    setSearchTerm(event.target.value);
    if(event.target.value===""){
      projectsIndex = 0;
      const temp_projects = isLangFinnish() ? projects_texts_fi.projects 
              : projects_texts_en.projects;
      setProjects(getProjects(undefined, temp_projects));
    }
  }

  function handleProjectsClick(id){
    if(projects.length < 3){
      return; 
    }

    if(id===0){
      projectsIndex = projectsIndex < 1 ? projectsIndex : -1;
    }else {
      projectsIndex = projectsIndex >= projects.length ? projectsIndex : +1;
    }
    setProjects(setProjectsVis(projects)); 
  }

  function setProjectsVis(projects){
    const reach = window.innerWidth > 600 ? 2 : projects.length;
    let copy_projects = JSON.parse(JSON.stringify(projects));
    let upper_lim = projectsIndex + reach;
    for (let i = 0; i<copy_projects.length; i++){
      copy_projects[i].visibility = (i>=projectsIndex && i<=upper_lim) ? true : false;
    }
    return copy_projects;
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
  projectsPageData.handleSearchButtonClick = handleSearchButtonClick;
  projectsPageData.handleProjectsClick = handleProjectsClick;

  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage { ...homePageData } />} />
        <Route path="/background" element={<Background { ...backgroundPageData }/>} />
        <Route path="/projects" element={<Projects { ...projectsPageData } />} />
        <Route path="*" element={<ErrorPage404 />} />
      </Routes>
    </div>
  );
}

export default App;