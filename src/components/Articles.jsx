import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const newsApi = axios.create({
  baseURL: "https://nc-news-project-hvpy.onrender.com/api",
});

function Articles({ articleCategory }) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("desc");

  useEffect(() => {
    setIsLoading(true);
    const params = articleCategory ? { topic: articleCategory } : {};

    newsApi.get("/articles", { params }).then((result) => {
      setIsLoading(false);
      const fetchedArticles = articleCategory
        ? result.data
        : result.data.articles;
      setArticles(fetchedArticles);
    });
  }, [articleCategory]);

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
