import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Comments from "./Comments";
import MaterialIcon from "react-google-material-icons";

const newsApi = axios.create({
  baseURL: "https://nc-news-project-hvpy.onrender.com/api",
});

function OneArticle() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    newsApi
      .get(`/articles/${article_id}`)
      .then((result) => {
        setIsLoading(false);
        setArticle(result.data.article);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.response.data.msg);
      });
  }, [article_id]);

  if (isLoading) {
    return (
      <>
        <h3>Loading Page...</h3>
      </>
    );
  }

  function handleVotes(voteType, article_id) {
    let voteChange = 0;
    if (voteType === "arrow_circle_up") {
      voteChange = 1;
    } else if (voteType === "arrow_circle_down") {
      voteChange = -1;
    }

    const newVotes = (article.votes += voteChange);

    setArticle((currArticle) => ({
      ...currArticle,
      votes: newVotes,
    }));

    newsApi
      .patch(`/articles/${article_id}`, { inc_votes: voteChange })
      .then(() => {
        setArticle(article);
      });
  }

  function handleClick() {
    navigate("/articles");
  }

  return (
    <>
      {error ? (
        <>
          <h2>{error}</h2>
          <button type="button" onClick={handleClick}>
            Go Back
          </button>
        </>
      ) : (
        <>
          <h1>{article.title}</h1>
          <h2>{article.author}</h2>
          <p>Created At: {new Date(article.created_at).toLocaleString()}</p>
          <img src={`${article.article_img_url}`} alt="article cover" />
          <p>{article.body}</p>
          <p>Topic: {article.topic}</p>
          <div id="votes">
            <button
              onClick={() => handleVotes("arrow_circle_up", article.article_id)}
              className="vote-button"
              type="button"
            >
              <MaterialIcon
                className="vote_up"
                icon="arrow_circle_up"
                size={36}
              />
            </button>
            <p>Votes: {article.votes}</p>
            <button
              onClick={() =>
                handleVotes("arrow_circle_down", article.article_id)
              }
              className="vote-button"
              type="button"
            >
              <MaterialIcon icon="arrow_circle_down" size={36} />
            </button>
          </div>
          <Comments />
        </>
      )}
    </>
  );
}

export default OneArticle;
