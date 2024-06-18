import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comments from "./Comments";

const newsApi = axios.create({
  baseURL: "https://nc-news-project-hvpy.onrender.com/api",
});

function OneArticle() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    newsApi.get(`/articles/${article_id}`).then((result) => {
      setIsLoading(false);
      setArticle(result.data.article);
    });
  }, [article_id]);

  if (isLoading) {
    return <h3>Loading Page...</h3>;
  }

  return (
    <>
      <h1>{article.title}</h1>
      <h2>{article.author}</h2>
      <img src={`${article.article_img_url}`} alt="article cover" />
      <p>{article.body}</p>
      <p>Topic: {article.topic}</p>
      <Comments />
    </>
  );
}

export default OneArticle;
