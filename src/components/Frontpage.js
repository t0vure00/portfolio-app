import React from "react";
import Header from './/header/Header';

export default function Frontpage(props){
  return (
    <div className="frontpage">
      <Header {...props}></Header>
      <div className="page_background">
        <div className="animation">
          <div className="greeting">
            {props.page_data.label.greeting}
          </div> 
          <div className="about_me">
            {props.page_data.label.about_me}
          </div>
        </div>
      </div>
    </div>
  );
}