import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Articles from "./components/Articles.jsx";
import Header from "./components/Header.jsx";
import OneArticle from "./components/OneArticle.jsx";
import Comments from "./components/Comments.jsx";
import NotFound from "./components/NotFound.jsx";

function App() {
  const [articleCategory, setArticleCategory] = useState("");

  return (
    <BrowserRouter>
      <Header
        setArticleCategory={setArticleCategory}
        articleCategory={articleCategory}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Articles
              setArticleCategory={setArticleCategory}
              articleCategory={articleCategory}
            />
          }
        />

        <Route
          path="/articles"
          element={
            <Articles
              setArticleCategory={setArticleCategory}
              articleCategory={articleCategory}
            />
          }
        />
        <Route exact path="/articles/:article_id" element={<OneArticle />} />
        <Route path="/articles/:article_id/comments" element={<Comments />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
