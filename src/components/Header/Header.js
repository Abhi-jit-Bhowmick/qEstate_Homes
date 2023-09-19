import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

function Header({ onPage }) {
  const nevigate = useNavigate();
  return (
    <div>
      <div className="header">
        <div className="logo" onClick={() => nevigate("/")}>QEstate</div>
        {onPage === "home" ? (
          <div className="nav-link" onClick={() => nevigate('/listings')}>
            <span>Explore</span>
          </div>
        ) : onPage === "explore" ? (
          <div className="nav-link" onClick={() => nevigate('/')}>
            <span>Featured Listings</span>
          </div>
        ) : (
          <div className="nav-list">
            <div className="nav-link" onClick={()=> nevigate("/")}>Featured</div>
            <div className="nav-link" onClick={()=> nevigate("/listings")}>Explore</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
