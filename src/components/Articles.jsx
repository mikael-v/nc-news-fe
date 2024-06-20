import axios from "axios";
import React, { useEffect, useState } from "react";

const newsApi = axios.create({
  baseURL: "https://nc-news-project-hvpy.onrender.com/api",
});

function Articles({ articleCategory }) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (articleCategory === "") {
      newsApi.get("/articles").then((result) => {
        setIsLoading(false);
        setArticles(result.data.articles);
      });
    } else {
      newsApi.get(`/articles?topic=${articleCategory}`).then((result) => {
        setIsLoading(false);
        setArticles(result.data.articles);
      });
    }
  }, [articleCategory]);

  console.log(articles);

  if (isLoading === true) {
    return <h3>Loading Page...</h3>;
  }

  return (
    <>
      <h1>Articles</h1>
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
