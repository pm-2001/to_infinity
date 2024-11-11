import React from "react";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar fixed bg-primary">
        <div className="container-fluid" >
          <a className="navbar-brand" href="#" style={{ fontFamily: 'Arial', fontSize: '18px' }}>
            {/* <img
              src="/docs/5.3/assets/brand/bootstrap-logo.svg"
              alt="Logo"
              width="30"
              height="24"
              className="d-inline-block align-text-top"
            /> */}
            Post2Product
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
