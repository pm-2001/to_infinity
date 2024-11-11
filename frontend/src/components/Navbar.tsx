import React from "react";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg fixed" style={{ background: "linear-gradient(135deg, #FFA500, #FFD700)", borderRadius: "0 0 20px 20px", padding: "0.5rem 1rem" }}>
        <div className="container-fluid">
          <a className="navbar-brand" href="#" style={{ fontFamily: 'Arial', fontSize: '20px', fontWeight: 'bold', color: 'white', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
            <img
              src="src/assets/logo.png"
              alt="Logo"
              width="30"
              height="30"
              className="d-inline-block align-text-top"
            />
            <span style={{ color: 'white', marginLeft: '10px' }}>Post2Product</span>
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
