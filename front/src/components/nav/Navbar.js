import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import { FormattedMessage } from "react-intl";
import { LOCALES } from "../../i18n/locales";

export const Navbar = ({ setLanguage }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <FormattedMessage id="smart" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <div className="navbar-nav-links">
              <Link className="nav-link active" aria-current="page" to="/homes">
                <FormattedMessage id="spaces" />
              </Link>
            </div>
            <div className="navbar-nav-controls">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FormattedMessage id="language"/>
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="#" onClick={() => setLanguage(LOCALES.SPANISH)}>
                      Español
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#" onClick={() => setLanguage(LOCALES.ENGLISH)}>
                      English
                    </a>
                  </li>
                </ul>
              </li>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
