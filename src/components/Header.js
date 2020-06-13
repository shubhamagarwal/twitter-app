import React from "react";
import PropTypes from "prop-types";

const Header = (props) => {
  const { handleNotAuthenticated } = props;

  const handleSignInClick = () => {
    window.open("http://localhost:4000/auth/twitter", "_self");
  };

  const handleLogoutClick = () => {
    window.open("http://localhost:4000/auth/logout", "_self");
    handleNotAuthenticated();
  };
  
  const { authenticated } = props;
  return (
      <>
        <header>
          <div className="row">
            <img src="https://joinassembly.com/assets/img/logo.svg" alt="assembly-logo" className="assembly-logo" />
            <ul className="main-nav nav-tabs">
                  <li>
                    <a href="#home">HOME</a>
                  </li>
                  {authenticated ? (
                      <li><a href="# " onClick={handleLogoutClick}>Logout</a></li>
                    ) : (
                      <li><a href="# " onClick={handleSignInClick}>Login</a></li>
                    )
                  }
                  
                </ul>
          </div>
        </header>
      </>
    );
  }

  Header.prototype = {
    handleNotAuthenticated: PropTypes.func
  }

  export default Header;

