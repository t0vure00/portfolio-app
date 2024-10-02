import React from "react";
import Header from './/header/Header';

export default function Fronptage({ data }){
  return (
    <div className="frontpage">
      <Header data={ data }></Header>
      <div className="page_background"></div>
    </div>
  );
}