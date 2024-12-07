import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>404 - Not Found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
      <button onClick={handleClick}>Go Back</button>
    </div>
  );

  function handleClick() {
    navigate("/");
  }
}

export default NotFound;
