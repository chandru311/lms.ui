import React from "react";
import "../../index.css";
import { Spinner } from "reactstrap";

const Loader = () => {
  return (
    <div className="loader-background">
      <div className="loader">
        <Spinner className="ms-2" color="primary" />
      </div>
    </div>
  );
};

export default Loader;
