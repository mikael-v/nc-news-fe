import axios from "axios";
import React, { useEffect, useState } from "react";

const newsApi = axios.create({
  baseURL: "https://nc-news-project-hvpy.onrender.com/api",
});

function Articles() {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    newsApi.get("/articles").then((result) => {
      console.log(result.data.articles, " <<result data");
      setArticles(result.data.articles);
    });
  }, []);

  return (
    <>
      <h1>All Articles</h1>
      <ul id="all-articles">
        {articles.map((article) => (
          <li key={article.article_id}>
            <h2>{article.title}</h2>
            <h3>{article.author}</h3>
            <img src={`${article.article_img_url}`} alt="article cover image" />
            <p>{article.topic}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Articles;
