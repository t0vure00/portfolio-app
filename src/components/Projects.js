import React from "react";
import Header from './/header/Header';

export default function Projects({ data }){
  return (
    <div className="projects">
      <Header data={ data }></Header>
      <div className="page_background"></div>
    </div>
  );
}