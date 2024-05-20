import React from "react";
import { Link } from "react-router-dom";

const DashboardHeadline = ({ title, showPath }) => {
  return (
    <div>
      <h1>{title}</h1>
      {showPath && (
        <div>
          <Link to={"/"}> Accueil</Link>
          <span>
            <i className="pi-angle-right"></i>
          </span>
          <span>{title}</span>
        </div>
      )}
    </div>
  );
};

export default DashboardHeadline;
