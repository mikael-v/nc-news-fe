import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const newsApi = axios.create({
  baseURL: "https://nc-news-project-hvpy.onrender.com/api",
});

function OneArticle() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  useEffect(() => {
    newsApi.get(`/articles/${article_id}`).then((result) => {
      setArticle(result.data.article);
    });
  }, [article_id]);

  return (
    <>
      <h1>{article.title}</h1>
      <h2>{article.author}</h2>
      <img src={`${article.article_img_url}`} alt="article cover" />
      <p>{article.body}</p>
      <p>{article.topic}</p>
    </>
  );
}

export default OneArticle;
