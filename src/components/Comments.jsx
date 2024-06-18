import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MaterialIcon from "react-google-material-icons";

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

  function handleVotes(voteType, comment_id) {
    setComments((currentComments) =>
      currentComments.map((comment) =>
        comment.comment_id === comment_id
          ? {
              ...comment,
              votes:
                voteType === "arrow_circle_up"
                  ? comment.votes + 1
                  : comment.votes - 1,
            }
          : comment
      )
    );
  }

  return (
    <>
      <h1>Comments</h1>
      <ul id="comments-list">
        {comments.map((comment) => (
          <li key={comment.comment_id}>
            <p>author: {comment.author}</p>
            <p>created at: {comment.created_at}</p>
            <p>{comment.body}</p>
            <div id="votes">
              <button
                onClick={() =>
                  handleVotes("arrow_circle_up", comment.comment_id)
                }
                className="vote-button"
                type="button"
              >
                <MaterialIcon
                  className="vote_up"
                  icon="arrow_circle_up"
                  size={36}
                />
              </button>

              <p>votes: {comment.votes}</p>
              <button
                onClick={() =>
                  handleVotes("arrow_circle_down", comment.comment_id)
                }
                className="vote-button"
                type="button"
              >
                <MaterialIcon icon="arrow_circle_down" size={36} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Comments;
