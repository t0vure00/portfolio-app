import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function ErrorPage404() {
  let location = useLocation();
  console.log(location);
  return (
    <div className="error_page">
      <h1>
        Resource not found at {location.pathname}
        <br />
        To go back to frontpage press: 
        <nav>
          <Link to="/">Frontpage</Link>
        </nav>
      </h1>
    </div>
  );
}