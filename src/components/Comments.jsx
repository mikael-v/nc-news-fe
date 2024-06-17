import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const newsApi = axios.create({
  baseURL: "https://nc-news-project-hvpy.onrender.com/api",
});

function Comments() {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);
  useEffect(() => {
    newsApi.get(`/articles/${article_id}/comments`).then((result) => {
      setComments(result.data[0]);
    });
  }, [article_id]);

  {
  }

  return (
    <>
      <h1>Comments</h1>
      <ul>
        {comments.map((comment) => (
          <li key={comment.comment_id}>
            <p>author: {comment.author}</p>
            <p>created at: {comment.created_at}</p>
            <p>{comment.body}</p>
            <p>votes: {comment.votes}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Comments;
