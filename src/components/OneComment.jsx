import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const newsApi = axios.create({
  baseURL: "https://nc-news-project-hvpy.onrender.com/api",
});

function OneComment() {
  const { article_id, comment_id } = useParams();
  const [comments, setComments] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    newsApi.get(`/articles/${article_id}}`).then((result) => {
      setIsLoading(false);
      setComments(result.data);
    });
  }, [article_id]);

  const comment = comments.filter((c) => c.comment_id === Number(comment_id));

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  if (!comment) {
    return <h3>No comment found</h3>;
  }
  return (
    <>
      <div id="comment">
        <h1>Comment</h1>
        <p>Author: {comment.author}</p>
        <p>Created at: {new Date(comment.created_at).toLocaleString()}</p>
        <p>{comment.body}</p>
        <p>Votes: {comment.votes}</p>
      </div>
    </>
  );
}

export default OneComment;
