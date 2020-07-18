import React, { useState, useEffect } from "react";

import "./navbar.styles.scss";

function NavBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    function changeNavColor() {
      window.addEventListener("scroll", function () {
        window.scrollY >= 130 ? setShow(true) : setShow(false);
      });
    }
    changeNavColor();
  }, []);

  return (
    <nav className={`navbar ${show && "navbar__black"}`}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/0/0f/Logo_Netflix.png"
        alt="netflix-logo"
        className="navbar__logo"
      />
      <img
        src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
        alt="profile"
        className="navbar__avatar"
      />
    </nav>
  );
}

export default NavBar;
