import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div>
      <h1>Page Not Found</h1>
      <p>
        {" "}
        <Link to="/">Home Page</Link>
      </p>
    </div>
  );
};

export default PageNotFound;
