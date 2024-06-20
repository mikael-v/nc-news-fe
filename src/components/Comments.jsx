import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostComment from "./PostComment.jsx";

const newsApi = axios.create({
  baseURL: "https://nc-news-project-hvpy.onrender.com/api",
});

function Comments() {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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

  function addComment(comment) {
    setComments((currentComments) => {
      return [comment, ...currentComments];
    });
  }

  return (
    <>
      <div id="comments-bar">
        <h1>Comments</h1>
      </div>
      <PostComment
        article_id={article_id}
        users={users}
        addComment={addComment}
      />
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
