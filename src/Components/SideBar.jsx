import React from "react";
import "../Styles/SideBar.scss";

const SideBar = ({ activeTab, onTabChange }) => {
  return (
    <div className="sidebar">
      <div className="logo-container">
        <img
          src="/Spotify_Primary_Logo_RGB_White.png"
          alt=""
          className="logo-icon"
        />

        <span className="logo-text">Spotify</span>
      </div>

      <nav className="sidebar-nav">
        <a
          href="#"
          className={`nav-link ${activeTab === "forYou" ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            onTabChange("forYou");
          }}
        >
          For You
        </a>
        <a
          href="#"
          className={`nav-link ${activeTab === "topTracks" ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            onTabChange("topTracks");
          }}
        >
          Top Tracks
        </a>
        <a
          href="#"
          className={`nav-link ${activeTab === "favorites" ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            onTabChange("favorites");
          }}
        >
          Favourites
        </a>
        <a
          href="#"
          className={`nav-link ${
            activeTab === "recentlyPlayed" ? "active" : ""
          }`}
          onClick={(e) => {
            e.preventDefault();
            onTabChange("recentlyPlayed");
          }}
        >
          Recently Played
        </a>
      </nav>
      <div className="sidebar-bottom">
        <img src="/profile.png" alt="Bottom Logo" className="bottom-logo" />
      </div>
    </div>
  );
};

export default SideBar;
