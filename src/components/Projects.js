import React from "react";
import Header from './/header/Header';

export default function Projects({ data }){
    return (
      <div className="Projects">
        <Header data={ data }></Header>
        <div className="page_background"></div>
      </div>
    );
  }