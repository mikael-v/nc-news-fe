import axios from "axios";
import React, { useEffect, useState } from "react";

const newsApi = axios.create({
  baseURL: "https://nc-news-project-hvpy.onrender.com/api",
});

function DeleteComment({ comment }) {
  const [isShown, setIsShown] = useState(false);
  const [author, setAuthor] = useState("");

  function removeComment(event) {
    const validAuthor = comment.author;

    if (validAuthor === author) {
      newsApi.delete(`/comments/${comment.comment_id}`).then(() => {
        setAuthor("");
        setIsShown(false);
        removeComment(comment.comment_id);
      });
    } else {
      alert("Invalid User!");
      setAuthor("");
      setIsShown(false);
    }
  }

  function toggleShow() {
    setIsShown(!isShown);
  }

  return (
    <>
      <button id="delete-button" type="button" onClick={toggleShow}>
        {isShown ? "Go Back" : "Delete"}
      </button>
      {isShown && (
        <form id="delete-form" onSubmit={removeComment}>
          <label htmlFor="userfield">Please Enter Username: </label>
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            type="text"
            name="userfield"
            id="userfield"
          />
        </form>
      )}
    </>
  );
}

export default DeleteComment;
