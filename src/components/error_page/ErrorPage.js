import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./ErrorPage.module.css";

export default function ErrorPage404(props) {
  return (
    <div className={ styles.error_page }>
      <h1>
        {props.label.error_nothing_here}
        <br />
        {props.label.error_go_back} 
      </h1>
      <Link to="/" className={ styles.frontpage_button }>{props.button.frontpage}</Link>
    </div>
  );
}