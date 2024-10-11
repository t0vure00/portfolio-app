import React from "react";
import Header from './/header/Header';

export default function Fronptage(props){
  return (
    <div className="frontpage">
      <Header {...props}></Header>
      <div className="page_background"></div>
    </div>
  );
}