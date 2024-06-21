import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";

const newsApi = axios.create({
  baseURL: "https://nc-news-project-hvpy.onrender.com/api",
});

function Articles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("desc");
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const topic = searchParams.get("topic");
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    const params = topic ? { topic } : {};

    newsApi
      .get("/articles", { params })
      .then((result) => {
        setIsLoading(false);
        const fetchedArticles = topic ? result.data : result.data.articles;
        setArticles(fetchedArticles);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.response.data.msg);
      });
  }, [topic]);

  function sortArticles(articles) {
    return articles.sort((a, b) => {
      if (order === "desc") {
        return a[sortBy] < b[sortBy] ? 1 : -1;
      } else {
        return a[sortBy] > b[sortBy] ? 1 : -1;
      }
    });
  }

  function toggleOrder() {
    setOrder((prevOrder) => (prevOrder === "desc" ? "asc" : "desc"));
  }

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const sortedArticles = sortArticles([...articles]);

  if (isLoading === true) {
    return <h3>Loading Page...</h3>;
  }

  if (error) {
    return (
      <div>
        <h2>{error}</h2>
        <p>Sorry, the page you are looking for does not exist.</p>
        <button onClick={handleClick}>Go Back</button>
      </div>
    );
  }

  function handleClick() {
    navigate("/");
  }

  if (error) {
    return (
      <>
        <h2>{error}</h2>
      </>
    );
  }

  return (
    <>
      <h1>Articles</h1>
      <div>
        <label htmlFor="sort">Sort by: </label>
        <select
          name="sort"
          id="sort"
          value={sortBy}
          onChange={handleSortChange}
        >
          <option value="default">SORT BY</option>
          <option value="created_at">Date</option>
          <option value="votes">Votes</option>
          <option value="comment_count">Comment Count</option>
        </select>
      </div>
      <button id="order-button" type="button" onClick={toggleOrder}>
        {order === "desc" ? "DESC" : "ASC"}
      </button>
      <ul>
        {sortedArticles.map((article) => (
          <Link to={`/articles/${article.article_id}`} key={article.article_id}>
            <li key={article.article_id}>
              <h2>{article.title}</h2>
              <h3>{article.author}</h3>
              <p>Created At: {new Date(article.created_at).toLocaleString()}</p>

              <img
                src={`${article.article_img_url}`}
                alt="article cover image"
              />
              <p>Topic: {article.topic}</p>
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
}

export default Articles;
