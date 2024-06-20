import React, { useState } from "react";
import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://nc-news-project-hvpy.onrender.com/api",
});

function PostComments({ article_id, users, addComment }) {
  const [commentBody, setCommentBody] = useState("");
  const [author, setAuthor] = useState("");
  const [isShown, setIsShown] = useState(false);

  function postComment(event) {
    event.preventDefault();
    const isAuthorValid = users.some((user) => user.username === author);
    if (isAuthorValid) {
      newsApi
        .post(`/articles/${article_id}/comments`, {
          body: commentBody,
          username: author,
        })
        .then(({ data }) => {
          setCommentBody("");
          setAuthor("");
          setIsShown(false);
          addComment(data.comment);
        });
    } else {
      alert("Invalid User!");
    }
  }

  function toggleShow() {
    setIsShown(!isShown);
  }

  return (
    <>
      <button id="post-button" type="button" onClick={toggleShow}>
        {isShown ? "Hide Comment Form" : "Post Comment"}
      </button>
      {isShown && (
        <form id="comment-form" onSubmit={postComment}>
          <div id="username">
            <label htmlFor="username">Username: </label>
            <input
              value={author}
              required
              type="text"
              name="username"
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <label htmlFor="textbox">Comment:</label>
          <textarea
            value={commentBody}
            name="textbox"
            id="textbox"
            required
            onChange={(e) => setCommentBody(e.target.value)}
          />
          <button type="submit" id="submit-comment">
            Post
          </button>
        </form>
      )}
    </>
  );
}

export default PostComments;
