import axios from "axios";
import React, { useEffect, useState } from "react";

const newsApi = axios.create({
  baseURL: "https://nc-news-project-hvpy.onrender.com/api",
});

function Articles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    newsApi.get("/articles").then((result) => {
      setIsLoading(false);
      setArticles(result.data.articles);
    });
  }, []);

  if (isLoading) {
    return <h3>Loading Page...</h3>;
  }

  return (
    <>
      <h1>All Articles</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.article_id}>
            <h2>{article.title}</h2>
            <h3>{article.author}</h3>
            <img src={`${article.article_img_url}`} alt="article cover image" />
            <p>Topic: {article.topic}</p>
            
          </li>
        ))}
      </ul>
    </>
  );
}

export default Articles;
