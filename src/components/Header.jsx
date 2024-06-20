import React from "react";

function Header({ setArticleCategory }) {
  const handleClick = (event) => {
    setArticleCategory(event.target.value);
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
