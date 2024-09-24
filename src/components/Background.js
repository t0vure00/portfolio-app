import React from "react";
import Header from './header/Header';

export default function Background({ data }){
  return (
    <div className="Backpage">
      <Header data={ data }></Header>
      <div className="page_background"></div>
    </div>
  );
}