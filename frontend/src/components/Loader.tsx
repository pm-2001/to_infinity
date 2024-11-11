import React from "react";

const Loader = () => {
    return (
        <div className="d-flex justify-content-center">
          <div
            className="spinner-border text-warning"
            role="status"
            style={{
              width: "5rem", // Increased size
              height: "5rem", // Increased size
              borderWidth: "0.5rem", // Increased thickness
            }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
      
};

export default Loader;
