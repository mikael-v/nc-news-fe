import React from "react";
import { useNavigate } from "react-router-dom";

function Header({ setArticleCategory }) {
  const navigate = useNavigate();

  const handleClick = (event) => {
    const topic = event.target.value;
    setArticleCategory(topic);
    navigate(`/articles?topic=${topic}`);
  };

  return (
    <div id="header">
      <h1 id="title">NC News</h1>
      <nav id="header-nav" onClick={handleClick}>
        <button value={""} className="nav-button" type="button">
          Home
        </button>
        <button value={"coding"} className="nav-button" type="button">
          Coding
        </button>
        <button value={"football"} className="nav-button" type="button">
          Football
        </button>
        <button value={"cooking"} className="nav-button" type="button">
          Cooking
        </button>
      </nav>
    </div>
  );
}

export default Header;
