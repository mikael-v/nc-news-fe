import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const newsApi = axios.create({
  baseURL: "https://nc-news-project-hvpy.onrender.com/api",
});

function Comments() {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [commentBody, setCommentBody] = useState("");
  const [author, setAuthor] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    newsApi.get("/users").then((result) => {
      setUsers(result.data);
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    newsApi.get(`/articles/${article_id}/comments`).then((result) => {
      setIsLoading(false);
      setComments(result.data[0]);
    });
  }, [article_id]);

  if (isLoading === true) {
    return <h3>Loading Page...</h3>;
  }

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
          setComments((currentComments) => {
            return [data.comment, ...currentComments];
          });
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
      <div id="comments-bar">
        <h1>Comments</h1>
      </div>
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
      <ul id="comments-list">
        {comments.map((comment) => (
          <li key={comment.comment_id}>
            <p>author: {comment.author}</p>
            <p>created at: {new Date(comment.created_at).toLocaleString()}</p>
            <p>{comment.body}</p>
            <p>Votes: {comment.votes}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Comments;
